const config = require('../../config/config.js');
const User = require('../models/user');


function userPayload(user) {

    if (!user){
        user = {
            username: config.defaultContext,
            token: "59eb5c821d26b63b0e672ca4"
        }
    }

    if (!user.stats) {
        user.stats = {
            calendar: [
                {
                    date: '2017-05-13',
                    wordcount: 120
                }, {
                    date: '2017-05-11',
                    wordcount: 514
                }, {
                    date: '2017-05-09',
                    wordcount: 912
                }
            ]
        };
    }

    return user;
}

export function getUser(req, res) {

    const username = req.user.username;

    if (!username) {
        return res.status(422).send({
            error:'Provide username'
        });
    }

    console.log("Get user. " + username);
    // Search for a user with a given username
    User.findOne({username:username}, function(err, user){
            if (err) { return next(err); }
            res.send(userPayload(user));
        }
    );
}

export function selectUser(req, res, next) {
    const username = config.defaultContext;

    // Search for a user with a given username
    User.findOne({username:username}, function(err, existingUser){

        if (err) { return next(err); }

        if (!existingUser) {
            // If a user doesn't exist - create and save user record
            const user = new User({
                username: username,
            });

            console.log("user.save " + user);
            user.save(function(err, user){
                if (err) { return next(err); }
                console.log("User successfully created! " + username);
            });

        }

        res.send(userPayload(existingUser))
    });
}

export function updateWordcount(req, res) {
    const today = req.body;
    User.findOne({username:req.user.username}, function(err, user){
	if (err) { return next(err); }

	var calendar = [];

	if (user.stats) {
	    calendar = [...user.stats.calendar];
	}

	if (calendar.length && calendar[calendar.length - 1].date == today.date) {
	    /* If the last date in user's calendar is today - update it */
	    calendar[calendar.length - 1] = today;
	    console.log("Update day.");
	} else {
	    /* Otherwise add it */
	    calendar.push(today);
	    console.log("Push day.");
	}
	/* calendar.push(today);*/

	user.stats = {
	    calendar:calendar
	};

	user.save(function(err, usr){
	    if (err) {
	    	return next(err);
	    }
	    console.log("Updated user " + JSON.stringify(usr, null, 4));
	    var updatedToday = usr.stats.calendar[usr.stats.calendar.length - 1]
	    res.send({
		    message: "Wordcount updated! " + updatedToday.wordcount
	    }); 
	});

    });
}
