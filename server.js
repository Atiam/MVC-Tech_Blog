// DEPENDENCIES___________________
const express = require('express');
const path = require('path');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// REQUIRE FOR CONTROLLERS AND DATABASE CONNECTION _________________
const routes = require('./controllers');
const sequelize = require('./config/connection');



// APP/PORT _________________________
const app = express();
const PORT = process.env.PORT || 3001;

// HANDLEBARS SETUP BOILERPLATE ___________
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});
app.engine('handlebars', hbs.engine); 
app.set('view engine', 'handlebars');

//SESSION _______________________

const sess = {
  secret: 'process.env.DB_SECRET,',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};
app.use(session(sess));

// MIDDLEWARES_________________________________  
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// ROUTES ________________________________________________
app.use(routes);

//START SERVER_______________________________________
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});