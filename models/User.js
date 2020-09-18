const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    username: {
        type: String,
        required: 'Username is required!', 
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: 'Email is required!',
        unique: true, 
        match: [/.+@.+\..+/]
    }, 
    // needs to reference the thought model
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'Thought'
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
})

const User = model('User', UserSchema);

module.exports = User;