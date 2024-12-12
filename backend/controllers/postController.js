const db = require('../db');  // Import your database connection
const upload = require('../middlewares/multerconfig'); // Import multer config

// Controller for creating a post
exports.createPost = async (req, res) => {
    const {description } = req.body;
    const userId = req.userId;
    const imagePath = `/uploads/${req.file.filename}`;  // Save the path to the DB
    console.log(description);
    const countQuery = 'SELECT COUNT(*) AS postCount FROM posts';
    try {
        // Insert the post into the database
        const [rows] = await db.execute(countQuery);
        const postCount = rows[0].postCount;
        const newId = postCount+1;
        const [result] = await db.execute(
            'INSERT INTO posts (userId , id, description, image_path) VALUES (?, ?, ?, ?)',
            [userId,newId, description, imagePath]
        );
        // Send a response with post details
        res.status(201).json({ message: 'Post created successfully', postId: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating post' });
    }
};

exports.createPoll = async (req,res) => {
    const {description , options} = req.body;
    const userId = req.userId;
    console.log(description);
    console.log(options);
    const opt = ["TALK-NULL","TALK-NULL","TALK-NULL","TALK-NULL"];
    for(let i =0;i<options.length;i++){
        opt[i] = options[i];
    }
    const countQuery = 'SELECT COUNT(*) AS pollCount FROM polls';
    try{
        const [rows] = await db.execute(countQuery);
        const pollCount = rows[0].pollCount;
        const newId = pollCount+1;
        const [result] = await db.execute(
            'INSERT INTO polls (userId , id, description, opt1 , opt2 , opt3 , opt4) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [userId,newId, description, opt[0] , opt[1] , opt[2] , opt[3]]
        );
        res.status(201).json({ message: 'Poll created successfully', pollId: result.insertId });    
    }catch(err){
        console.error(error);
        res.status(500).json({ message: 'Error creating poll' });
    }
};

exports.createFriend = async (req, res) => {
    const { id } = req.body;
    const userId = req.userId;

    // SQL queries
    const checkQuery = 'SELECT COUNT(*) AS check1 FROM friends WHERE id1 = ? AND id2 = ?';
    const insertQuery = 'INSERT INTO friends (id1, id2) VALUES (?, ?)';

    try {
        // Check if the friendship already exists
        const [rows] = await db.execute(checkQuery, [userId, id]);
        const isFriend = rows[0].check1 === 1;

        if (isFriend) {
            return res.status(400).json({ message: 'Friendship already exists' });
        }

        // Insert the friendship
        await db.execute(insertQuery, [userId, id]);
        res.status(201).json({ message: 'Friend added' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error adding friend' });
    }
};
