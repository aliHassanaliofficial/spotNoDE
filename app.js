const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const searchCSV = require('./controller/natega'); // Assuming natega.js contains the searchCSV function
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/natega', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'natega.html'));
});

// Handle form submission
app.post('/submit', async (req, res) => {
    const numberToSearch = req.body.number;
    const csvFile = path.join(__dirname, 'public', 'natega.csv');

    try {
        const results = await searchCSV(numberToSearch, csvFile);
        if (results.length > 0) {
            res.json(results);
        } else {
            res.json({ message: 'Number not found in the CSV file.' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error processing request' });
    }
});

// Handle 404 errors
app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'public', 'pages', '404.html'));
});

// Global error handler (optional)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(port, () => {
    console.log(`Server is running on port: http://localhost:${port}`);
});

module.exports = app;
