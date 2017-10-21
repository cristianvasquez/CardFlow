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

    const username = config.defaultContext;

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
