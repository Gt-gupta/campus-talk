const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./api/authRoutes');
const userRoutes = require('./api/userRoutes');
const postRoutes = require('./api/postRoutes');
const getRoutes = require('./api/getRoutes');
const deleteRoutes = require('./api/deleteRoutes');
const path = require("path");
const multer = require('multer');
const fs = require('fs');
const uploadDir = 'uploads/';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}


const app = express();
app.use(bodyParser.json());
const cors = require('cors');

require('dotenv').config();

// Enable CORS
app.use(cors({
    origin: 'http://localhost:3000', // React app URL during development
    credentials: true, // Include cookies if necessary
}));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Routes
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/post',postRoutes);
app.use('/get',getRoutes);
app.use('/delete',deleteRoutes);




// Start server
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
