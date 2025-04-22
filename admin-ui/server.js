require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const path = require('path');
const moment = require('moment');

// Initialize Express
const app = express();
const PORT = process.env.PORT || 3000;

// Configure middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Configure session
app.use(session({
  secret: process.env.SESSION_SECRET || 'auto-news-secret',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI || 'mongodb://localhost:27017/autoNewsDB',
    collectionName: 'sessions'
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 // 1 day
  }
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/autoNewsDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB', err));

// Define User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// Define News Schema
const newsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  headline: { type: String, required: true },
  content: { type: String, required: true },
  country: { type: String, required: true },
  category: { type: String, required: true },
  source: String,
  isHeadline: { type: Boolean, default: false },
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Create Models
const User = mongoose.model('User', userSchema);
const News = mongoose.model('News', newsSchema);

// Configure Passport
passport.use(new LocalStrategy(
  async (username, password, done) => {
    try {
      const user = await User.findOne({ username });
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

// Middleware to check if user is authenticated
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

// Create an admin user if none exists
async function createAdminUser() {
  try {
    const adminExists = await User.findOne({ username: 'admin' });
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await User.create({
        username: 'admin',
        password: hashedPassword
      });
      console.log('Admin user created');
    }
  } catch (err) {
    console.error('Error creating admin user', err);
  }
}

// Routes
app.get('/', (req, res) => {
  res.redirect('/dashboard');
});

app.get('/login', (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect('/dashboard');
  }
  res.render('login', { error: req.query.error });
});

app.post('/login', passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/login?error=Invalid credentials'
}));

app.get('/logout', (req, res) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/login');
  });
});

app.get('/dashboard', isAuthenticated, async (req, res) => {
  try {
    const news = await News.find().sort({ createdAt: -1 });
    res.render('dashboard', { 
      user: req.user,
      news,
      moment
    });
  } catch (err) {
    console.error('Error fetching news', err);
    res.status(500).send('Server error');
  }
});

app.get('/add-news', isAuthenticated, (req, res) => {
  res.render('add-news', { user: req.user });
});

app.post('/add-news', isAuthenticated, async (req, res) => {
  try {
    console.log('Form data received:', req.body);
    const { title, headline, content, country, category, source, isHeadline } = req.body;
    
    const newNews = await News.create({
      title,
      headline: headline || title.substring(0, 100), // Use headline or truncated title
      content,
      country,
      category,
      source,
      isHeadline: isHeadline === 'on',
      active: true
    });
    
    console.log('News created:', newNews);
    res.redirect('/dashboard');
  } catch (err) {
    console.error('Error adding news:', err);
    res.status(500).send('Server error: ' + err.message);
  }
});

app.get('/edit-news/:id', isAuthenticated, async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) {
      return res.status(404).send('News not found');
    }
    res.render('edit-news', { user: req.user, news });
  } catch (err) {
    console.error('Error fetching news', err);
    res.status(500).send('Server error');
  }
});

app.post('/edit-news/:id', isAuthenticated, async (req, res) => {
  try {
    const { title, headline, content, country, category, source, isHeadline, active } = req.body;
    await News.findByIdAndUpdate(req.params.id, {
      title,
      headline: headline || title.substring(0, 100),
      content,
      country,
      category,
      source,
      isHeadline: isHeadline === 'on',
      active: active === 'on',
      updatedAt: Date.now()
    });
    res.redirect('/dashboard');
  } catch (err) {
    console.error('Error updating news:', err);
    res.status(500).send('Server error: ' + err.message);
  }
});

app.post('/delete-news/:id', isAuthenticated, async (req, res) => {
  try {
    await News.findByIdAndDelete(req.params.id);
    res.redirect('/dashboard');
  } catch (err) {
    console.error('Error deleting news', err);
    res.status(500).send('Server error');
  }
});

// API endpoints for the Alexa Skill
app.get('/api/news', async (req, res) => {
  try {
    const { country, category, limit = 5 } = req.query;
    
    let query = { active: true };
    if (country) query.country = country;
    if (category) query.category = category;
    
    const news = await News.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit));
    
    res.json({ success: true, data: news });
  } catch (err) {
    console.error('Error fetching news API', err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// API endpoint for getting top headlines
app.get('/api/headlines', async (req, res) => {
  try {
    const { country, limit = 10 } = req.query;
    
    let query = { active: true };
    
    // If country provided, get country-specific headlines first, then global
    if (country) {
      query.country = country;
      
      // First try to get headlines marked as top headlines for the country
      let countryHeadlines = await News.find({ 
        ...query, 
        isHeadline: true 
      })
      .sort({ createdAt: -1 })
      .limit(parseInt(limit));
      
      // If not enough country headlines, add some global headlines
      if (countryHeadlines.length < parseInt(limit)) {
        const globalHeadlines = await News.find({ 
          active: true, 
          country: 'Global',
          isHeadline: true 
        })
        .sort({ createdAt: -1 })
        .limit(parseInt(limit) - countryHeadlines.length);
        
        countryHeadlines = [...countryHeadlines, ...globalHeadlines];
      }
      
      // If still not enough, add regular news from country
      if (countryHeadlines.length < parseInt(limit)) {
        const regularNews = await News.find(query)
          .sort({ createdAt: -1 })
          .limit(parseInt(limit) - countryHeadlines.length);
        
        countryHeadlines = [...countryHeadlines, ...regularNews];
      }
      
      return res.json({ 
        success: true, 
        data: countryHeadlines.slice(0, parseInt(limit)) 
      });
    }
    
    // If no country specified, get global headlines
    const globalHeadlines = await News.find({ 
      active: true, 
      isHeadline: true 
    })
    .sort({ createdAt: -1 })
    .limit(parseInt(limit));
    
    res.json({ success: true, data: globalHeadlines });
  } catch (err) {
    console.error('Error fetching headlines API', err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// API endpoint for getting news detail by ID
app.get('/api/news/:id', async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    
    if (!news) {
      return res.status(404).json({ success: false, error: 'News not found' });
    }
    
    res.json({ success: true, data: news });
  } catch (err) {
    console.error('Error fetching news detail API', err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// Start server
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await createAdminUser();
}); 