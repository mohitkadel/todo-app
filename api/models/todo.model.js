var mongoose = require('mongoose');

var todoSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    order: Number,
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
        // this.order = await todoSchema.getNextOrder();
        next();
    }
});

// Export Todo model
module.exports = mongoose.model('todos', todoSchema)
