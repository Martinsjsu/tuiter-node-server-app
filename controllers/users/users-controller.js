import people from './users.js'
let users = people // import the array of users. Include the extension

// use express instance app to declare HTTP GET
// request pattern /api/users to call a function
const UserController = (app) => {
    app.get('/api/users', findUsers)
    app.get('/api/users/:uid', findUserById);  // map path pattern to handler function
    app.post('/api/users', createUser);  // map URL pattern to handler function
    app.delete('/api/users/:uid', deleteUser); // map URL pattern to handler function
    app.put('/api/users/:uid', updateUser);
}

// function invoked if URL matches pattern
// extract new user from BODY in request
// add an _id property with unique timestamp
// append new user to users array
// respond with new user to client
const createUser = (req, res) => {
    const newUser = req.body;
    newUser._id = (new Date()).getTime() + '';
    users.push(newUser);
    res.json(newUser);
}


// function called if URL matches pattern
// get uid from request parameter map
// find user in users array whose _id
// matches userId retrieved from params
// respond to client with user found
const findUserById = (req, res) => {
    const userId = req.params.uid;
    const user = users
        .find(u => u._id === userId);
    res.json(user);
}

// function runs when /api/users requested
// responds with JSON array of users
const findUsers = (req, res) => {
    const type = req.query.type
    if(type) {
        const usersOfType = users
            .filter(u => u.type === type)
        res.json(usersOfType)
        return
    }
    res.json(users)
}

// get user ID from path parameter uid
// filter out the user
// whose ID is the ID of the user we want to remove
// respond with success code
const deleteUser = (req, res) => {
    const userId = req.params['uid'];
    users = users.filter(usr =>
        usr._id !== userId);
    res.sendStatus(200);
}

const updateUser = (req, res) => {
    const userId = req.params['uid'];
    const updates = req.body;
    users = users.map((usr) =>
        usr._id === userId ?
            {...usr, ...updates} :
            usr
    );
    res.sendStatus(200);
}



export default UserController // exports so app.js can import