const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const fs = require('fs');

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/teachers/mHaggag-centers', (req, res) => {
    const filePath = path.join(__dirname, 'public', 'MHaggag-centers.pdf');
    
    console.log(`Attempting to send file: ${filePath}`);

    if (!fs.existsSync(filePath)) {
        console.error(`File not found: ${filePath}`);
        return res.status(404).send('File not found');
    }

    // Send the PDF file
    res.sendFile(filePath, (err) => {
        if (err) {
            console.error(`Error sending file: ${err}`);
            return res.status(500).send('Failed to load PDF document');
        } else {
            console.log(`File sent successfully: ${filePath}`);
        }
    });
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
