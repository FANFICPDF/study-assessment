const mongoose = require('mongoose');
const URI = require('./URIS/MONG_URI');

const MONGO_URI = URI;

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'studyassessment',
  })
  .then(() => console.log('Connected to Mongo DB.'))
  .catch((err) => console.log(err));

const Schema = mongoose.Schema;

const tasksSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  completed: Boolean,
});

const Task = mongoose.model('task', tasksSchema);

module.exports = Task;
