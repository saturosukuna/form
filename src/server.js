 
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/mydatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const DataSchema = new mongoose.Schema({
    name: String,
    email: String,
});

const Data = mongoose.model('Data', DataSchema);

// Route to handle form submission
app.post('/submit', async (req, res) => {
    const { name, email } = req.body;

    try {
        const newData = new Data({ name, email });
        await newData.save();
        res.json({ message: 'Data saved successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to save data' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
