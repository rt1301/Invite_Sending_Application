var seedDB                  = require("./seeds.js");
seedDB();
var express 				= require('express'),
    app 					= express(),
    expressSanitizer        = require('express-sanitizer'),
    body 				    = require('body-parser'),
    flash		            = require("connect-flash"),
	mongoose 				= require("mongoose"),
	passport				= require('passport'),
	LocalStrategy			= require('passport-local'),
    passportLocalMongoose 	= require('passport-local-mongoose'),
    Event                   = require("./models/event.js"),
    User 					= require("./models/user.js");
    const MongoClient = require('mongodb').MongoClient;
    let db;
var username;
var font,color;
var accept,id;
    app.use(expressSanitizer());
    mongoose.set('useNewUrlParser', true);
    mongoose.set('useUnifiedTopology', true);
    mongoose.connect("mongodb://localhost/delta-task3-hm",{ useNewUrlParser: true, useUnifiedTopology: true, });
    app.use(flash());
    // PASSPORT CONFIG
    app.use(require('express-session')({
        secret: "This is a secret message",
        resave: false,
        saveUninitialized: false,
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(function(req, res, next)
    {
        res.locals.error = req.flash("error");
        res.locals.success = req.flash("success");
        res.locals.currentUser = req.user;
        next();
     });
    passport.use(new LocalStrategy(User.authenticate()));
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());
    app.use(express.static(__dirname + "/public"));
    app.use(body.urlencoded({extended : true}));
    app.set("view engine","ejs");

    MongoClient.connect("mongodb://localhost/delta-task3", (err, database) => {
        if(err) {
          return console.log(err);
        }
        db = database;
        // Starting the server
        app.listen(3000,function()
        {
            console.log("Server is running");
        });
      });
// Root Route, redirect to login page
app.get("/",function(req, res)
{
    res.redirect("/invites/"+username+"/dashboard");
});
// INDEX Route
app.get("/invites/:id",isLoggedIn,function(req, res)
{
    req.params.id = username;
    User.find({username:req.params.id},function(err, users)
    {
        if(err)
        {
            console.log(err);
        }
        else
        {
            Event.find({},function(err,allEvents)
            {
                if(err)
                {
                    console.log(err);
                }
                else
                {
                    res.render("index.ejs",{event:allEvents,currentUser:req.user,id:username,font:font,color:color});
                }
            });
        }
    })
});
// NEW route
app.get("/invites/:id/new",isLoggedIn,function(req, res)
{
    req.params.id = username;
    User.find({},function(err,users){
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.render("new",{currentUser:req.user, userArray:users,id:req.params.id});
        }
    });
});
// CREATE route
app.post("/invites/:id",function(req, res)
{
    req.body.user.body = req.sanitize(req.body.user.body);
    req.params.id = username;
    Event.create(req.body.user,function(err,newInvite)
    {
        User.findOne({username:req.body.user.to},function(err,foundUser)
        {
            if(err)
            {
                console.log(err);
            }
            else
            {
                foundUser.events.push(newInvite);
                foundUser.save(function(err,data)
                {
                    if(err)
                    {
                        console.log(err);
                    }
                    else
                    {
                        req.flash("success","Invite Created");
                        res.redirect("/invites/"+username);
                    }
                });
            }
        });
    });
});
// Accept and Reject options
app.get("/invites/:id/events",isLoggedIn,function(req, res){
    req.params.id = username;
    Event.find({accept:true,to:username},function(err, events){
        if(err)
        {
            console.log(err)
        }
        else
        {
            res.render("events",{id:username,events:events,currentUser:req.user});
        }
    })
    
});
// Notification page
app.get("/invites/:id/notification",function(req, res){
    req.params.id = username;
    User.find({username:username},function(err, users){
        if(err)
        {
            console.log(err);
        }
        else
        {
            Event.find({},function(err, allEvents){
                if(err)
                {
                    console.log(err);
                }
                else
                {
                    res.render("notification",{id:username,currentUser:req.user,events:allEvents});
                }
            });
        }
    })
});
// DashBoard route
app.get("/invites/:id/dashboard",isLoggedIn,function(req, res){
    req.params.id = username;
    res.render("dashboard",{id:username,currentUser:req.user});
});
// Accept and reject options
app.post("/invites/:id/events",isLoggedIn,function(req,res){
    req.params.id = username;
    var date = new Date();
    var arr = Object.entries(req.body);
    id = arr[2][0];
    accept = arr[2][1];
    var food = req.body.food;
    var people = req.body.people;
    console.log("POST Request is sent");
    if(accept!=='reject')
    {
        Event.findById(id,function(err,events){
            if(err)
            {
                console.log(err);
            }
            else
            {
                if(events.dtime)
                {
                    console.log("Exists");
                    if(events.dtime>date)
                {
                    if(accept === "Accept")
                    {
                    events.accept = true;
                    events.food = food;
                    events.people = people;
                    }
                    else
                    {
                    events.accept = false;
                    }
                    events.save(function(err,updatedEvent)
                    {
                            if(err)
                            {
                                console.log(err);
                            }
                            else
                            {
                                if(updatedEvent.accept)
                                {
                                    req.flash("success","Invite accepted");
                                    res.redirect("/invites/"+username+"/events");
                                }
                                else
                                {
                                    updatedEvent.deleteOne({_id:id},function(err,el){
                                        if(err)
                                        {
                                            console.log(err);
                                        }
                                    });
                                    req.flash("Invite Deleted");
                                    res.redirect("/invites/"+username);
                                }
                            }
                    });
                }
                else
                {
                    events.deleteOne({_id:id},function(err,el)
                    {
                        if(err)
                        {
                            console.log(err);
                        }
                    });
                    res.redirect("/invites/"+username); 
                }

                }
                else
                {
                    if(accept === "Accept")
                    {
                    events.accept = true;
                    events.food = food;
                    events.people = people;
                    }
                    else
                    {
                    events.accept = false;
                    }
                    events.save(function(err,updatedEvent)
                    {
                            if(err)
                            {
                                console.log(err);
                            }
                            else
                            {
                                if(updatedEvent.accept)
                                {
                                    req.flash("success","Invite Accepted");
                                    res.redirect("/invites/"+username+"/events");
                                }
                                else
                                {
                                    updatedEvent.deleteOne({_id:id},function(err,el){
                                        if(err)
                                        {
                                            console.log(err);
                                        }
                                    });
                                    res.redirect("/invites/"+username);
                                }
                            }
                    });
                }
               
            }
        }); 
    }
   
   
});
// ================
// AUTH ROUTES
// ================
// show registration form
app.get("/register",function(req, res)
{
	res.render("register",{currentUser:req.user,id:username});
});
// handle sign up logic
app.post("/register",function(req,res)
{
	var newUser = new User({username: req.body.username});
    User.register(newUser,req.body.password,function(err, user)
    {
		if(err)
			{
				req.flash("error",err.message);
				return res.render("register",{currentUser:req.user,id:username});
			}
         passport.authenticate("local")(req, res, function()
        {
           req.flash("success","Registration completed");
           res.redirect("/login");
        });
	});
});

// show login form
app.get("/login",function(req, res){
    res.render("login",{currentUser:req.user,id:username});
});
// handle login logic
app.post("/login",passport.authenticate("local",
{
failureRedirect: "/login",
}),function(req, res)
{
    username = req.body.username;
    req.flash("success","You are logged in as " + username);
    res.redirect("/invites/"+req.body.username+"/dashboard");
    console.log(req.body.username);
});
// LOGOUT 
app.get("/logout",function(req, res)
{
    req.logout();
    req.flash("success","You are successfully logged out");
	res.redirect("/login");
});
// Logged in middleware
function isLoggedIn(req, res, next)
{
	if(req.isAuthenticated())
		{
			return next();
        }
	res.redirect("/login");	
		
}


