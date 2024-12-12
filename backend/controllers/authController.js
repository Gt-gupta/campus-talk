const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {createUser, findUserByEmail} = require('../models/User');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;
// const JWT_SECRET = "GG_VT";

// user signUp
exports.signUp = async (req, res) => {
    const { email, username, password } = req.body;

    // Validate input
    if (!email || !username || !password) {
        return res.status(400).json({ message: "Missing required fields" });
    }
    console.log("Hello");

    try {
        console.log("Processing signup...");

        // Check if user already exists
        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: "User already exists!" });
        }
        const hashPassword = await bcrypt.hash(password,10);
        console.log(hashPassword);

        // Create new user
        await createUser(email, username, hashPassword);

        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        console.error("Error during signup:", err);
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
};



// user log in
exports.login = async(req , res) => {
    const {email , password} = req.body;
    console.log("inside login");
    try{
        const user = await findUserByEmail(email);
        if(!user) return res.status(400).json({message:'Invalid Email!'});

        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch) return res.status(400).json({message:'Invalid Email or Password!'});

        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({message:'User logged in successfully', token});
    } catch(err){
        res.status(500).json({message:'Internal Server Error' , error});
    }
};