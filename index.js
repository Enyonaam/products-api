const express = require('express');
const dotenv = require('dotenv');
const db = require('./config/db');
const todoRoutes = require('./routes/todoRoutes');

dotenv.config();

const app = express();

app.use(express.json());

app.use('/todos', todoRoutes);

// Home route
app.get('/', (req, res) => {
    res.json({
        message: 'Todo API is running'
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
    try {
        await db.query('SELECT 1');

        console.log('MySQL connected successfully');
        console.log(`Server running on port ${PORT}`);

    } catch (error) {
        console.error('MySQL connection failed:', error.message);
    }
});