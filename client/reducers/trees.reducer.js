/* import { FETCH_POSTS, FETCH_POST } from '../actions/index';*/

let INITIAL_STATE = [];

export default function(state=INITIAL_STATE, action) {
    switch(action.type) {
	case 'LIST_TREES':
        let trees = action.payload;

        return trees;
	case 'DELETE_TREE':
        let deletedTree = action.payload;
        trees = state;
        console.log(JSON.stringify(trees));
	    trees = trees.filter((t)=>{
		return t.slug !== deletedTree.slug;
	    });
	    return [...trees];	    

	default:
	    return state;
    }
}
