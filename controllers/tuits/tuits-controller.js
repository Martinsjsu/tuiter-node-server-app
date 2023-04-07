import * as tuitsDao from './tuits-dao.js'

// retrieve data from HTTP body
// add _id field as a time stamp
// initialize likes counter
// initialize liked flag
// append new tuit to tuits array
// respond with new tuit
// next chapter will store in database instead
const createTuit = async (req, res) => {
    const newTuit = req.body;
    newTuit.likes = 0;
    newTuit.liked = false;
    const insertedTuit = await tuitsDao
        .createTuit(newTuit);
    res.json(insertedTuit);
}

// now it's asynchronous function
// retrieve tuits from database
const findTuits  = async (req, res) => {
    const tuits = await tuitsDao.findTuits()
    res.json(tuits)
}

// get ID of tuit to update from path
// get updates from HTTP body
// find index of tuit to update
// in the tuits array
// update the element in tuits array
// merging/updating old tuit with updates
// respond with success
// next chapter will remove from database instead
const updateTuit = async (req, res) => {
    const tuitdIdToUpdate = req.params.tid;
    const updates = req.body;
    const status = await tuitsDao
        .updateTuit(tuitdIdToUpdate,
            updates);
    res.json(status);
}

const deleteTuit = async (req, res) => {
    const tuitdIdToDelete = req.params.tid;
    const status = await tuitsDao
        .deleteTuit(tuitdIdToDelete);
    res.json(status);
}

export default (app) => {
    app.post('/api/tuits', createTuit);
    app.get('/api/tuits', findTuits);
    app.put('/api/tuits/:tid', updateTuit);
    app.delete('/api/tuits/:tid', deleteTuit);
}
