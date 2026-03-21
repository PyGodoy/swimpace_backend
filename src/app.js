const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const activityRoutes = require('./routes/activityRoutes');
const profileRoutes = require('./routes/profileRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/activity', activityRoutes);
app.use('/api/profile', profileRoutes);

app.get('/', (req,res) => {

    res.json({message: "Api funcionando"});
});

module.exports = app;
