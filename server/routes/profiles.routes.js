import {Router} from 'express';

const router = new Router();

const profilesControllers = require('../controllers/profiles.controllers.js');

// Make every request go through the passport profilesentication check:
router.route('/auth-test').get(function(req, res){
    console.log("req " + JSON.stringify(req.user));
    res.send({ message:'Successfully accessed protected API!'});
});

/* Take a request from a url and send a response. */
// router.route('/auth/join').post(profilesControllers.selectUser);
router.route('/auth/selectUser').post(profilesControllers.selectUser);
router.route('/auth/profile').get(profilesControllers.getUser);
router.route('/update-wordcount').post(profilesControllers.updateWordcount);

export default router;

