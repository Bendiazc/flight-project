require('dotenv').config();
const express = require('express');
const flightsRouter = require('./v1/routes/flightsRoutes');

const app = express();
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});

app.get('/', (req, res) => {    
    res.send('OK');
});

app.use(express.json());
app.use('/flights', flightsRouter);

app.use((err, req, res, _next) => {
    console.error(err);
    res.status(500).json({ code: 500, errors: 'could not connect to db' });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
