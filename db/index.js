module.exports = require('mongoose').connect(process.env.MONGODB_URI || 'mongodb://localhost/todo_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
