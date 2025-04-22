// Local testing utility for Alexa skill
require('dotenv').config(); // Load environment variables from .env file
const { handler } = require('./index');

// Sample Alexa launch request
const launchRequest = {
  "version": "1.0",
  "session": {
    "new": true,
    "sessionId": "amzn1.echo-api.session.test",
    "application": {
      "applicationId": "amzn1.ask.skill.test"
    },
    "attributes": {},
    "user": {
      "userId": "amzn1.ask.account.test"
    }
  },
  "context": {
    "System": {
      "application": {
        "applicationId": "amzn1.ask.skill.test"
      },
      "user": {
        "userId": "amzn1.ask.account.test"
      },
      "device": {
        "deviceId": "amzn1.ask.device.test",
        "supportedInterfaces": {}
      }
    }
  },
  "request": {
    "type": "LaunchRequest",
    "requestId": "amzn1.echo-api.request.test",
    "timestamp": new Date().toISOString(),
    "locale": "en-US"
  }
};

// Sample intent request - country specified
const intentRequestWithCountry = {
  "version": "1.0",
  "session": {
    "new": false,
    "sessionId": "amzn1.echo-api.session.test",
    "application": {
      "applicationId": "amzn1.ask.skill.test"
    },
    "attributes": {
      "state": "ASKING_COUNTRY",
      "conversationHistory": []
    },
    "user": {
      "userId": "amzn1.ask.account.test"
    }
  },
  "context": {
    "System": {
      "application": {
        "applicationId": "amzn1.ask.skill.test"
      },
      "user": {
        "userId": "amzn1.ask.account.test"
      },
      "device": {
        "deviceId": "amzn1.ask.device.test",
        "supportedInterfaces": {}
      }
    }
  },
  "request": {
    "type": "IntentRequest",
    "requestId": "amzn1.echo-api.request.test",
    "timestamp": new Date().toISOString(),
    "locale": "en-US",
    "intent": {
      "name": "GetNewsIntent",
      "confirmationStatus": "NONE",
      "slots": {
        "country": {
          "name": "country",
          "value": "Germany",
          "confirmationStatus": "NONE",
          "source": "USER"
        }
      }
    }
  }
};

// Run the tests
async function runTests() {
  console.log('Testing Launch Request...');
  console.log('This will use OpenAI to generate a welcome message...');
  const launchResponse = await handler(launchRequest);
  console.log('Launch Response:', JSON.stringify(launchResponse, null, 2));
  
  console.log('\nTesting Intent Request with Country...');
  console.log('This will use OpenAI to search for auto news from Germany...');
  const intentResponse = await handler(intentRequestWithCountry);
  console.log('Intent Response:', JSON.stringify(intentResponse, null, 2));
}

// Check if required environment variables are set
if (!process.env.OPENAI_API_KEY) {
  console.error('ERROR: OPENAI_API_KEY environment variable is required');
  process.exit(1);
}

console.log('Starting tests...');
console.log('Note: These tests use OpenAI to search for real-time news, which may take some time.');
console.log('OpenAI API key found. Running tests...\n');

runTests().catch(err => {
  console.error('Test Error:', err);
}); 