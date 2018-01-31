// app/routes.js

//Requiring our User model
var db = require("../modelsSQL");


    

module.exports = function(app, passport) {

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function(req, res) {
        res.render('index.ejs'); // load the index.ejs file
    });


    // =====================================
    // SEARCH ==============================
    // =====================================
    app.get('/search', function(req, res) {
        res.render('search.ejs'); // load search.ejs file
    });

    //finds required data values
    app.put('/search', function(req, res) {
        db.User.findAll({
            where: {
              Job: req/*somthing goes here*/,
            }
          }).then(function(dbUser){
              console.log(dbUser);
            res.render('search.ejs', { stuff: dbUser.dataValues });
            });
        
    });
    

    // =====================================
    // account ==============================
    // =====================================
    app.get('/account', function(req, res) {
        res.render('account.ejs'); // load account.ejs file
    });

    // =====================================
    // accountEdit ==============================
    // =====================================
    app.get('/accountEdit', function(req, res) {
        res.render('accountEdit.ejs'); // load account.ejs file

    });

    app.get("/accountEdit", function(req, res) {
        // findAll returns all entries for a table when used with no options
        db.User.findAll({}).then(function(dbUser) {
          // We have access to the users as an argument inside of the callback function
          res.json(dbUSer);
        });
      });

    app.post('/accountEdit', function(req, res) {
        
        db.User.update({
            Email: req.user.local.email,
            User: req.body.Username,
            Job: req.body.Jobs,
            About: req.body.Aboutme},
            {where: {
                Email: req.user.local.email
            }
        }).then(function(dbUser){
            res.json(dbUser);
        });
    });
    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('login.ejs', { message: req.flash('loginMessage') }); 
    });

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/account', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isLoggedIn, function(req, res) {
        //finds the user and pumps data to the profile
        db.User.findOne({
            where: {
              Email: req.user.local.email
            }
          }).then(function(dbUser){
            res.render('profile.ejs', { stuff: dbUser.dataValues });
            });
        
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    // =====================================
    // New user ==============================
    // =====================================
    app.post('/account', function(req, res) {
        
        db.User.create({
            Email: req.user.local.email,
            User: req.body.Username,
            Job: req.body.Jobs,
            About: null
        }).then(function(dbUser){
            res.json(dbUser);
        });
    });


};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
