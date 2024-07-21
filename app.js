const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


// Handle 404 errors
app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'public', 'pages', '404.html')); // Make sure you have a 404.html file in the public/pages directory
});

// Global error handler (optional)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;
