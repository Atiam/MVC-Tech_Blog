
const PORT = process.env.PORT || 3001;
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const hbs = exphbs.create({});

// app.engine('handlebars', hbs.engine); 
const app = express();
// const handlebars = require('handlebars');


// // HANDLEBARS HELPERS _______________________
// handlebars.registerHelper('format_date', (date) => {
//     return date.toLocaleDateString();
// });
// // HANDLEBARS SETUP BOILERPLATE ___________
// app.set('view engine', 'handlebars');

//SESSION _______________________

const sess = {
    secret: 'Super secret secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 60 * 60 * 1000,
        httpOnly: true,
        secure: false,
        sameSite: 'strict'
    },
    store: new SequelizeStore(
        {
            db: sequelize
        }
    )
};

app.use(session(sess));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

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