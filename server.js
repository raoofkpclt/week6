const express = require('express');
const app = express();
const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');
const path = require('path');
const connectDb = require('./db/connectDb');

// View engine configuration
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Middleware configuration
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static folder configuration
app.use(express.static('public'));

// Router middleware
app.use('/user', userRoutes);
app.use('/admin', adminRoutes);

// Connect DB
connectDb();

// Server port generation
const PORT = process.env.PORT || 3020;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} successfully`);
});

// Add this line to log the parsed body
app.use((req, res, next) => {
    console.log('Parsed body:', req.body);
    next();
});
