var mongoose = require('mongoose');
const bcrypt = require('bcrypt');
// Setup schema

var userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024,
        trim: true
    },
    name: String,
    status: {
        type: Boolean,
        default: true // 1: Active, 0: InActive
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});


userSchema.pre('save', function(next) {
    const user = this;
    if (!user.isModified || !user.isNew) { // don't rehash if it's an old user
        user.updated_at = new Date();
        next();
    } else {
        bcrypt.hash(user.password, 10, function(err, hash) {
            if (err) {
                console.log('Error hashing password for user', user.name);
                next(err);
            } else {
                user.password = hash;
                next();
            }
        });
    }
})

// Export Task model
module.exports = mongoose.model('user', userSchema);