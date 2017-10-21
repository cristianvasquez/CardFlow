import removeMd from 'remove-markdown';
import cuid from 'cuid';
import slug from 'slug';
import {cardsToColumns, getCard} from '../../client/utils/cards';
const config = require('../../config/config.js');

const Tree = require('../models/tree');

const context = config.defaultContext;

export function getTree (req, res, next) {
    var slug = req.params.slug;
    console.log("Get tree " + slug);
    /* Find a tree by id, and send it as a response */
    Tree.findOne({slug:slug}, function(err, tree){
	if (err) { return next(err); }
		/* console.log("tree " + tree);*/
		return res.send(tree);
    });
}


function forEachChild(root, fun) {
    root.children.map((c)=>{
	fun(c, root);
	if (c.children) {
	    forEachChild(c, fun);
	}
    });
}

export function exportTree (req, res, next) {
    var slug = req.params.slug;

    /* Find a tree by id, and send it as a response */
    Tree.findOne({slug:slug}, function(err, tree){
	if (err || !tree) { return res.status(404).end(); }
	console.log("Exporting tree " + tree.slug);
	
	var markdown = "";

	if (req.query.column) {
	    var columns = cardsToColumns(tree.cards);
	    var columnNumber = parseInt(req.query.column)-1;
	    console.log("Exporting column " + columnNumber);
	    if (columns[columnNumber]) {
		columns[columnNumber].cardGroups.map((cardGroup)=>{
		    cardGroup.cards.map((card)=>{
			markdown += card.content + "\n\n";
		    });
		});
	    }
	} else if (req.query.subtree) {
	    console.log("Exporting card's children " + tree.activeCard);
	    var card = getCard(tree.activeCard, tree.cards);
	    markdown += card.content + "\n\n";
	    forEachChild(card, (c)=>{
		markdown += c.content + "\n\n";
	    });
	} else {
	    console.log("Exporting the whole tree");
	    forEachChild(tree.cards, (c)=>{
		markdown += c.content + "\n\n";
	    });
	}

	res.setHeader('content-type', 'text/plain');
	return res.end(markdown);
    });
}


/* Delete a tree  */
export function deleteTree(req, res) {
    if (!req.params) { res.status(500).end(); }

    var slug = req.params.slug;
    console.log("Deleting tree.");
    Tree.findOne({ slug: slug }).exec((err, tree) => {

	if (err) { res.status(500).send(err); }
	console.log("Deleted tree " + tree.slug);
	tree.remove(() => {
	    res.status(200).end();
	});
    });
}

export function listTrees (req, res, next) {
    Tree.find({author:context}).sort('-updatedAt').then((allTrees)=>{
	console.log('all trees' + JSON.stringify(allTrees));
	return res.send(allTrees);
    });
}

export function createTree (req, res, next) {
    /* Getting the tree from the POST request sent to me by react */
    var tree = req.body;
    console.log("Creating tree. Received from react: " + tree.name);
    if (!tree.name) {
	/* If I haven't set a name - set it to the first line */
	var firstCard = tree.cards.children[0];
	var firstLine = firstCard.content.split('\n')[0];
	tree.name = removeMd(firstLine);
	if (!tree.name) {
	    tree.name = "Empty";
	}
    }
    /* Create slug - just slugify name */
    tree.slug = slug(tree.name)+"-"+cuid.slug();
    tree.author = context;
    tree = new Tree(tree);

    console.log("Creating new tree: " + tree.name);
    tree.save((err,tree)=>{
	if (err) { return next(err); }
	console.log("New tree created.");
	return res.send(tree);
    });
}


export function updateTree (req, res, next) {
    /* Getting the tree from the POST request sent to me by react */
    var tree = req.body;
    console.log("Updating tree. " + tree.slug);
    var options =  { upsert: true, new: true, setDefaultsOnInsert: true };
    /* Find a tree by id and create it if it doesn't exist */
    Tree.findOne({slug:tree.slug}, (err, t) => {

	if (err) { return next(err); }
	/* If tree does exist - update it. */
	console.log("Updating tree. Received from react: " + JSON.stringify(tree));
	tree.updatedAt = new Date();
	Tree.findOneAndUpdate({slug:tree.slug}, tree, (err, t) => {
	    if (err) { return next(err); }
	    /* console.log("Updated tree! " + JSON.stringify(t));*/
	    return res.send(tree);
	});
    });
}


