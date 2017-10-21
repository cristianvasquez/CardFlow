import Express from 'express';
import bodyParser from 'body-parser'; // Parse requests, turn them into json
import mongoose from 'mongoose'; // ORM between mongo and node.
import cors from 'cors'; // Cors allows requests from different domains
import path from 'path'; // manipulate filepaths
/* Routes */
import profilesRoutes from './routes/profiles.routes.js';
import treesRoutes from './routes/trees.routes.js';
/* Controllers */
import * as treeControllers from './controllers/tree.controllers';

// Connect to db.
mongoose.Promise = global.Promise;
var MONGO_DB_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/cardflow';
console.log("Connecting to the db at " + MONGO_DB_URL);
mongoose.connect(MONGO_DB_URL, (error) => {
    if (error) {
	console.error('Please make sure Mongodb is installed and running!'); 
	throw error;
    }
});

/* Setup server */
const server = new Express();
server.use(bodyParser.json({type: '*/*'})); 
server.use(cors());
server.set('view engine', 'ejs');
/* server.use(morgan('combined'));*/

/* API */
server.use('/api/v1', profilesRoutes);
server.use('/api/v1', treesRoutes);

/* Serve static files */
server.use('/media',
	   Express.static(path.resolve(__dirname, '../client/media')));
server.use('/downloads',
	   Express.static(path.resolve(__dirname, '../desktop/packages')));
server.get('/bundle.js',(req,res) => {
    res.sendFile(path.resolve(__dirname, '../client/dist/bundle.js'));
});

/* Static pages */
server.use('/static',
	   Express.static(path.resolve(__dirname, './static')));

/* Cache */
var mcache = require('memory-cache');
var cache = (duration) => {
    return (req, res, next) => {
	let key = '__express__' + req.originalUrl || req.url
	let cachedBody = mcache.get(key)
	if (cachedBody) {
	    res.send(cachedBody)
	    return
	} else {
	    res.sendResponse = res.send
	    res.send = (body) => {
			mcache.put(key, body, duration * 1000);
				res.sendResponse(body)
			}
	    next()
	}
    }
}

/* Export */
server.get('/tree/:slug.md',treeControllers.exportTree);

/* Send the rest of the requests to be handled by the react router */
server.use((req, res) =>
    res.sendFile(path.resolve(__dirname, '../client/index.html')));

// start server
const port = process.env.PORT || 3000;
server.listen(port, (error) => {
    if (!error) {
		console.log(`Server is running on port ${port}!`);
    } else {
		console.error('Could not start server!');
    }
});

export default server;
