var mongoose = require('mongoose');

var todoSchema = mongoose.Schema({
    todo: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "Active" // Active, Completed
    },
    created_by: String,
    updated_by: String,
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

todoSchema.pre('save', function (next) {
    const todo = this;
    if (!todo.isModified || !todo.isNew) { // don't rehash if it's an old book
        todo.updated_at = new Date();
        next();
    } else {
        next();
    }
})

// Export Todo model
module.exports = mongoose.model('todos', todoSchema)
