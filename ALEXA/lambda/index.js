// This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
const Alexa = require('ask-sdk-core');
const { Configuration, OpenAIApi } = require('openai');
const axios = require('axios');

// OpenAI Configuration - using environment variables for security
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Admin panel API URL - set as environment variable
const ADMIN_API_URL = process.env.ADMIN_API_URL || 'http://localhost:3000/api';

// Session attributes
const SESSION_KEYS = {
  STATE: 'state',
  COUNTRY: 'country',
  NEWS_HEADLINES: 'newsHeadlines', 
  SELECTED_NEWS_INDEX: 'selectedNewsIndex',
  CONVERSATION_HISTORY: 'conversationHistory'
};

// Conversation states
const STATES = {
  STARTED: 'STARTED',
  ASKING_COUNTRY: 'ASKING_COUNTRY',
  FETCHING_NEWS: 'FETCHING_NEWS',
  DELIVERING_HEADLINES: 'DELIVERING_HEADLINES',
  ASKING_FOR_DETAIL: 'ASKING_FOR_DETAIL',
  DELIVERING_DETAIL: 'DELIVERING_DETAIL'
};

// Function to use OpenAI to ask for country and process response
const askOpenAI = async (prompt, conversationHistory = []) => {
  try {
    // Add system message and user prompt to the conversation history
    const messages = [
      { role: 'system', content: 'You are an automotive news assistant helping users get news from specific countries. Be concise and focus only on automotive industry information.' },
      ...conversationHistory,
      { role: 'user', content: prompt }
    ];

    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: messages,
      max_tokens: 200,
      temperature: 0.7,
    });

    return {
      content: response.data.choices[0].message.content,
      role: 'assistant'
    };
  } catch (error) {
    console.error('Error calling OpenAI:', error);
    return {
      content: "I'm having trouble processing your request. Please try again.",
      role: 'assistant'
    };
  }
};

// Function to fetch headlines from the admin panel API
const fetchHeadlinesFromAdmin = async (country) => {
  try {
    console.log(`Attempting to fetch headlines from admin API for country: ${country}`);
    console.log(`Using API URL: ${ADMIN_API_URL}/headlines`);
    
    const response = await axios.get(`${ADMIN_API_URL}/headlines`, {
      params: {
        country: country,
        limit: 10
      },
      timeout: 5000 // 5 second timeout
    });
    
    if (response.data.success && response.data.data.length > 0) {
      console.log(`Successfully retrieved ${response.data.data.length} headlines from admin API`);
      return response.data.data;
    } else {
      console.log(`No headlines found in admin API for country: ${country}`);
      return null;
    }
  } catch (error) {
    console.error('Error fetching headlines from admin API:', error.message);
    if (error.code === 'ECONNREFUSED' || error.code === 'ETIMEDOUT') {
      console.error('Connection to admin API failed - check ADMIN_API_URL and ensure the admin panel is running');
    }
    if (error.response) {
      console.error('Admin API response status:', error.response.status);
    }
    return null;
  }
};

// Function to fetch specific news detail from admin panel API
const fetchNewsDetailFromAdmin = async (newsId) => {
  try {
    const response = await axios.get(`${ADMIN_API_URL}/news/${newsId}`);
    
    if (response.data.success && response.data.data) {
      return response.data.data;
    }
    return null;
  } catch (error) {
    console.error('Error fetching news detail from admin API:', error);
    return null;
  }
};

// Function to use OpenAI to search for real-time automotive news as a backup
const searchNewsWithOpenAI = async (country) => {
  try {
    const currentDate = new Date().toISOString().split('T')[0];
    
    const prompt = `Search the web for the latest automotive industry news from ${country} as of ${currentDate}. 
    Focus on recent developments within the last week, new car launches, market trends, significant business news, 
    electric vehicle developments, and policy changes affecting the auto industry in ${country}.
    Provide 3-5 key headlines and summarize each in 1-2 sentences. Include the source and date for each news item.
    Format the response clearly with numbered points and brief summaries that would be easy to listen to.`;
    
    const response = await openai.createChatCompletion({
      model: 'gpt-4',  // Using GPT-4 for better real-time information
      messages: [
        { 
          role: 'system', 
          content: 'You are a specialized automotive industry news researcher with access to the latest information. Your role is to provide accurate, recent, and relevant automotive news from specific countries. Include only factual information from reliable sources.' 
        },
        { role: 'user', content: prompt }
      ],
      max_tokens: 500,
      temperature: 0.2,
    });

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error searching news with OpenAI:', error);
    return null;
  }
};

// Format headlines from admin panel into speech text
const formatHeadlinesForSpeech = (headlines, country) => {
  if (!headlines || headlines.length === 0) {
    return null;
  }
  
  let speechText = `Here are the top ${headlines.length} automotive headlines from ${country}. `;
  
  headlines.forEach((item, index) => {
    speechText += `Headline ${index + 1}: ${item.headline || item.title}. `;
  });
  
  speechText += "You can ask for more details about any headline by saying 'tell me more about headline 3' or similar.";
  
  return speechText;
};

// Format news articles from admin panel into speech text
const formatAdminNewsForSpeech = (newsItems, country) => {
  if (!newsItems || newsItems.length === 0) {
    return null;
  }
  
  let speechText = `Here are the top automotive news stories from ${country}. `;
  
  newsItems.forEach((item, index) => {
    speechText += `${index + 1}. ${item.title}. ${item.content} `;
    if (item.source) {
      speechText += `Source: ${item.source}. `;
    }
  });
  
  return speechText;
};

// Format news articles into speech text from OpenAI response
const formatNewsForSpeech = (newsText, country) => {
  if (!newsText) {
    return `I couldn't find any automotive news from ${country}. Please try again later.`;
  }
  
  return `Here are the top automotive news stories from ${country}. ${newsText}`;
};

// Helper to get/set session attributes
const getSessionAttributes = (handlerInput) => {
  return handlerInput.attributesManager.getSessionAttributes();
};

const setSessionAttributes = (handlerInput, attributes) => {
  handlerInput.attributesManager.setSessionAttributes(attributes);
};

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
  },
  async handle(handlerInput) {
    const sessionAttributes = getSessionAttributes(handlerInput);
    
    // Initialize conversation
    sessionAttributes[SESSION_KEYS.STATE] = STATES.ASKING_COUNTRY;
    sessionAttributes[SESSION_KEYS.CONVERSATION_HISTORY] = [];
    
    // Use OpenAI to generate the welcome and ask for country
    const aiResponse = await askOpenAI("Ask the user which country's automotive news they would like to hear. Be concise.");
    
    // Save AI response to conversation history
    sessionAttributes[SESSION_KEYS.CONVERSATION_HISTORY].push(aiResponse);
    setSessionAttributes(handlerInput, sessionAttributes);
    
    return handlerInput.responseBuilder
      .speak(aiResponse.content)
      .reprompt("Which country's automotive news would you like to hear?")
      .withSimpleCard('Auto Industry News', aiResponse.content)
      .getResponse();
  }
};

// This handles news detail requests
const GetNewsDetailIntentHandler = {
  canHandle(handlerInput) {
    const sessionAttributes = getSessionAttributes(handlerInput);
    const state = sessionAttributes[SESSION_KEYS.STATE];
    
    return (
      (Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
       Alexa.getIntentName(handlerInput.requestEnvelope) === 'GetNewsDetailIntent') ||
      (state === STATES.DELIVERING_HEADLINES || 
       state === STATES.ASKING_FOR_DETAIL)
    );
  },
  async handle(handlerInput) {
    try {
      const sessionAttributes = getSessionAttributes(handlerInput);
      const headlines = sessionAttributes[SESSION_KEYS.NEWS_HEADLINES];
      
      let headlineNumber = 0;
      
      // Try to extract headline number from intent slot
      if (Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest') {
        headlineNumber = Alexa.getSlotValue(handlerInput.requestEnvelope, 'headlineNumber');
        
        if (!headlineNumber) {
          // Try to extract number using OpenAI
          const userInput = handlerInput.requestEnvelope.request?.intent?.slots?.['catchAll']?.value || '';
          
          if (userInput) {
            const aiResponse = await askOpenAI(
              `Extract the headline number from this request: "${userInput}". Just respond with the number only, or 0 if no number is found.`,
              sessionAttributes[SESSION_KEYS.CONVERSATION_HISTORY] || []
            );
            
            const extractedNumber = parseInt(aiResponse.content.match(/\d+/)?.[0] || '0');
            headlineNumber = extractedNumber;
          }
        }
      }
      
      // Convert to 0-based index
      const headlineIndex = parseInt(headlineNumber) - 1;
      
      if (isNaN(headlineIndex) || headlineIndex < 0 || !headlines || headlineIndex >= headlines.length) {
        return handlerInput.responseBuilder
          .speak("I didn't understand which headline you wanted more details about. Please specify a headline number between 1 and " + headlines.length)
          .reprompt("Which headline would you like to hear more about?")
          .withSimpleCard('Auto News Headlines', "Please specify a headline number")
          .getResponse();
      }
      
      const selectedHeadline = headlines[headlineIndex];
      
      // Set state to delivering detail
      sessionAttributes[SESSION_KEYS.STATE] = STATES.DELIVERING_DETAIL;
      sessionAttributes[SESSION_KEYS.SELECTED_NEWS_INDEX] = headlineIndex;
      setSessionAttributes(handlerInput, sessionAttributes);
      
      const speechText = `Headline ${headlineNumber}: ${selectedHeadline.title}. ${selectedHeadline.content}`;
      
      return handlerInput.responseBuilder
        .speak(speechText)
        .withSimpleCard(`Auto News: ${selectedHeadline.title}`, speechText)
        .getResponse();
    } catch (error) {
      console.error('Error in GetNewsDetailIntentHandler:', error);
      const speechText = 'Sorry, I had trouble getting the news details. Please try again later.';
      
      return handlerInput.responseBuilder
        .speak(speechText)
        .getResponse();
    }
  }
};

// Update the existing GetNewsIntentHandler
const GetNewsIntentHandler = {
  canHandle(handlerInput) {
    return (Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && Alexa.getIntentName(handlerInput.requestEnvelope) === 'GetNewsIntent')
      || (Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent');
  },
  async handle(handlerInput) {
    try {
      const sessionAttributes = getSessionAttributes(handlerInput);
      const state = sessionAttributes[SESSION_KEYS.STATE] || STATES.STARTED;
      
      // Extract user input
      let userInput = '';
      if (Alexa.getIntentName(handlerInput.requestEnvelope) === 'GetNewsIntent') {
        // Get from slot
        userInput = Alexa.getSlotValue(handlerInput.requestEnvelope, 'country') || 
                  Alexa.getSlotValue(handlerInput.requestEnvelope, 'catchAll') || '';
      } else {
        // Get from raw input for fallback intent
        userInput = handlerInput.requestEnvelope.request?.intent?.slots?.['catchAll']?.value || 
                    handlerInput.requestEnvelope.request?.intent?.slots?.country?.value || '';
      }
      
      // Save user input to conversation history
      if (userInput) {
        const conversationHistory = sessionAttributes[SESSION_KEYS.CONVERSATION_HISTORY] || [];
        conversationHistory.push({ role: 'user', content: userInput });
        sessionAttributes[SESSION_KEYS.CONVERSATION_HISTORY] = conversationHistory;
      }
      
      // If user is trying to get detail about a headline, pass to detail handler
      if (state === STATES.DELIVERING_HEADLINES && 
          (userInput.toLowerCase().includes('headline') || userInput.match(/\d+/))) {
        const detailHandler = GetNewsDetailIntentHandler.handle(handlerInput);
        if (detailHandler) return detailHandler;
      }
      
      let speechText = '';
      
      if (state === STATES.ASKING_COUNTRY || !sessionAttributes[SESSION_KEYS.COUNTRY]) {
        // Use OpenAI to determine country from user input
        const aiResponse = await askOpenAI(
          `Identify the country the user is asking about: "${userInput}". If a valid country is mentioned, just respond with the country name. If no valid country is identified, ask which country they want news from.`,
          sessionAttributes[SESSION_KEYS.CONVERSATION_HISTORY] || []
        );
        
        // Check if a country was identified 
        if (aiResponse.content.toLowerCase().includes('which country') || 
            aiResponse.content.toLowerCase().includes('no valid country') ||
            aiResponse.content.toLowerCase().includes('please specify')) {
          // No country identified, keep asking
          sessionAttributes[SESSION_KEYS.STATE] = STATES.ASKING_COUNTRY;
          sessionAttributes[SESSION_KEYS.CONVERSATION_HISTORY].push(aiResponse);
          setSessionAttributes(handlerInput, sessionAttributes);
          
          return handlerInput.responseBuilder
            .speak(aiResponse.content)
            .reprompt("Which country would you like automotive news from?")
            .withSimpleCard('Auto Industry News', aiResponse.content)
            .getResponse();
        } else {
          // Country identified, save it and move to fetching news
          sessionAttributes[SESSION_KEYS.COUNTRY] = aiResponse.content;
          sessionAttributes[SESSION_KEYS.STATE] = STATES.FETCHING_NEWS;
          sessionAttributes[SESSION_KEYS.CONVERSATION_HISTORY].push(aiResponse);
          setSessionAttributes(handlerInput, sessionAttributes);
          
          // Continue to fetch news
        }
      }
      
      // Fetch headlines - first try admin panel API
      const country = sessionAttributes[SESSION_KEYS.COUNTRY];
      const headlines = await fetchHeadlinesFromAdmin(country);
      
      if (headlines) {
        // Save headlines to session for later reference
        sessionAttributes[SESSION_KEYS.NEWS_HEADLINES] = headlines;
        sessionAttributes[SESSION_KEYS.STATE] = STATES.DELIVERING_HEADLINES;
        setSessionAttributes(handlerInput, sessionAttributes);
        
        // Format headlines for speech
        speechText = formatHeadlinesForSpeech(headlines, country);
      }
      
      // If no headlines from admin panel, fallback to OpenAI
      if (!speechText) {
        const openAINews = await searchNewsWithOpenAI(country);
        speechText = formatNewsForSpeech(openAINews, country);
        
        // Update state
        sessionAttributes[SESSION_KEYS.STATE] = STATES.DELIVERING_NEWS;
        setSessionAttributes(handlerInput, sessionAttributes);
      }
      
      return handlerInput.responseBuilder
        .speak(speechText)
        .reprompt("You can ask for details about a specific headline by saying its number.")
        .withSimpleCard(`Auto News from ${country}`, speechText)
        .getResponse();
    } catch (error) {
      console.error('Error in GetNewsIntentHandler:', error);
      const speechText = 'Sorry, I had trouble getting the automotive news. Please try again later.';
      
      return handlerInput.responseBuilder
        .speak(speechText)
        .getResponse();
    }
  }
};

// Keep original intent for backward compatibility
const GetLatestNewsIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && Alexa.getIntentName(handlerInput.requestEnvelope) === 'GetLatestNewsIntent';
  },
  async handle(handlerInput) {
    try {
      // Try to get global news from admin panel first
      const adminNews = await fetchNewsFromAdmin('Global');
      
      let speechText;
      if (adminNews) {
        speechText = formatAdminNewsForSpeech(adminNews, "around the world");
      } else {
        // Fallback to OpenAI
        const newsResponse = await searchNewsWithOpenAI("global");
        if (newsResponse) {
          speechText = formatNewsForSpeech(newsResponse, "around the world");
        } else {
          speechText = "Sorry, I couldn't find any global automotive news right now. Please try again later.";
        }
      }
      
      return handlerInput.responseBuilder
        .speak(speechText)
        .withSimpleCard('Global Auto Industry News', speechText)
        .getResponse();
    } catch (error) {
      console.error('Error in GetLatestNewsIntentHandler:', error);
      const speechText = 'Sorry, I had trouble getting the latest automotive news. Please try again later.';
      
      return handlerInput.responseBuilder
        .speak(speechText)
        .getResponse();
    }
  }
};

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const speechText = 'You can ask me for the latest automotive industry news or get news from a specific country. For example, try saying: get automotive news from Germany.';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard('Help', speechText)
      .getResponse();
  }
};

const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
        || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    const speechText = 'Thanks for using Auto Industry News. Goodbye!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('Auto Industry News', speechText)
      .getResponse();
  }
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    const speechText = 'Sorry, I couldn\'t understand the command. Please try again.';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .getResponse();
  }
};

// The SkillBuilder acts as the entry point for your skill, routing all request and response
// payloads to the handlers above.
exports.handler = Alexa.SkillBuilderStandard.create()
  .addRequestHandlers(
    LaunchRequestHandler,
    GetNewsIntentHandler,
    GetNewsDetailIntentHandler,
    GetLatestNewsIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler
  )
  .addErrorHandlers(ErrorHandler)
  .withApiClient(new Alexa.DefaultApiClient())
  .lambda(); 