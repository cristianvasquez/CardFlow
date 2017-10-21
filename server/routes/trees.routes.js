import {Router} from 'express';
import * as treeControllers from '../controllers/tree.controllers';

const router = new Router();

router.route('/trees').get(treeControllers.listTrees);
router.route('/trees').post(treeControllers.createTree);
router.route('/tree/:slug').get(treeControllers.getTree);
router.route('/tree/:slug').post(treeControllers.updateTree);
router.route('/tree/:slug').delete(treeControllers.deleteTree);


export default router;
