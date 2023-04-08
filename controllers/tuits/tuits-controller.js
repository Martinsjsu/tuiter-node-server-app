import posts from "./tuits.js";
let tuits = posts;

// retrieve data from HTTP body
// add _id field as a time stamp
// initialize likes counter
// initialize liked flag
// append new tuit to tuits array
// respond with new tuit
// next chapter will store in database instead
const createTuit = (req, res) => {
    const newTuit = req.body;
    newTuit._id = (new Date()).getTime()+'';
    newTuit.image = "nasa.jpg";
    newTuit.topic = "General";
    newTuit.time = "1h";
    newTuit.username = "NASA"
    newTuit.likes = 0;
    newTuit.liked = false;
    tuits.push(newTuit);
    res.json(newTuit);
}

const findTuits  = (req, res) => {
    const type = req.query.type
    if(type) {
        const tuitsOfType = tuits
            .filter(t => t.type === type)
        res.json(tuitsOfType)
        return
    }
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
const updateTuit = (req, res) => {
    const tuitdIdToUpdate = req.params.tid;
    const updates = req.body;
    const tuitIndex = tuits.findIndex(
        (t) => t._id === tuitdIdToUpdate)
    tuits[tuitIndex] =
        {...tuits[tuitIndex], ...updates};
    res.sendStatus(200);
}

const deleteTuit = (req, res) => {
    const tuitdIdToDelete = req.params.tid;
    tuits = tuits.filter((t) =>
        t._id !== tuitdIdToDelete);
    res.sendStatus(200);
}

export default (app) => {
    app.post('/api/tuits', createTuit);
    app.get('/api/tuits', findTuits);
    app.put('/api/tuits/:tid', updateTuit);
    app.delete('/api/tuits/:tid', deleteTuit);
}
