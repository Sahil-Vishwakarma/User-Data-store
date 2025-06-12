const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://sahil0000002:uY2PK2f6Rw3TmJgV@cluster0.6a0mryq.mongodb.net/Users').then(() => {
    console.log('Database connected successfully');
}).catch(err => {
    console.error('Database connection error:', err);
});

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    image: String,
})

module.exports = mongoose.model('User', userSchema);

