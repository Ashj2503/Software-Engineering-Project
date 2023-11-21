const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();

app.use(bodyParser.json());

mongoose.connect('mongodb+srv://ashishjyoti2503:<Ashish2503>@cluster0.wcxzvpg.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

const User = mongoose.model('User', new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
}));

const Portfolio = mongoose.model('Portfolio', new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    symbol: String,
    quantity: Number,
}));

const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.sendStatus(401);

    jwt.verify(token, 'B9476B8E32A928D713C1E0F228924E123CDB473F55BEC07056EE6076F953256D', (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

app.post('/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = new User({
            username: req.body.username,
            password: hashedPassword,
        });
        await user.save();
        res.status(201).send('User registered successfully');
    } catch (error) {
        res.status(500).send('Error registering user');
    }
});

app.post('/login', async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(404).send('User not found');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(401).send('Invalid password');

    const token = jwt.sign({ id: user._id, username: user.username }, 'your_secret_key');
    res.json({ token });
});

app.get('/portfolio', authenticateToken, async (req, res) => {
    try {
        const portfolio = await Portfolio.find({ userId: req.user.id });
        res.json(portfolio);
    } catch (error) {
        res.status(500).send('Error fetching portfolio');
    }
});

app.post('/portfolio', authenticateToken, async (req, res) => {
    try {
        const portfolioItem = new Portfolio({
            userId: req.user.id,
            symbol: req.body.symbol,
            quantity: req.body.quantity,
        });
        await portfolioItem.save();
        res.status(201).send('Item added to portfolio');
    } catch (error) {
        res.status(500).send('Error adding item to portfolio');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
