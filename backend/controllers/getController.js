const db = require('../db');  // Import your database connection

exports.getPosts = async (req, res) => {
    const userId = req.userId;
    try {
        // Fetch posts excluding the current user's posts
        const query = 'SELECT * FROM posts';
        const [rows] = await db.execute(query, [userId]);
        // Send the retrieved posts as a response
        res.status(200).json({
            success: true,
            message: "Posts retrieved successfully",
            data: rows
        });
        
        
    } catch (err) {
        console.error('Error fetching posts:', err);
        
        // Send an error response
        res.status(500).json({
            success: false,
            message: 'Failed to fetch posts',
            error: err.message
        });
    }
};

exports.getFriends = async (req , res) => {
    const userId = req.userId;
    try {
        // Fetch posts excluding the current user's posts
        console.log("inside getFreinds");
        const query = `SELECT * FROM friends where id1=${userId}`;
        const [rows] = await db.execute(query);
        // Send the retrieved posts as a response
        res.status(200).json({
            success: true,
            message: "Friends retrieved successfully",
            data: rows
        });
        
        
    } catch (err) {
        console.error('Error fetching friends:', err);
        
        // Send an error response
        res.status(500).json({
            success: false,
            message: 'Failed to fetch friends',
            error: err.message
        });
    }
};
