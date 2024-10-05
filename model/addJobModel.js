const mongoose = require('mongoose');

const jobApplicationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  adress: {
    type: String,
    required: true,
    trim: true,
  },
  experience: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced', 'fluent'],
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: function(v) {
        return /.+\@.+\..+/.test(v); // Simple regex for email validation
      },
      message: props => `${props.value} is not a valid email!`
    },
  },
  phone: {
    type: String,
    required: true,
  },
  file: {
    type: String, 
    required: true,
  },
  offer:{
    type : mongoose.Schema.ObjectId,
    ref :"Job",
    required:[true ,  "invalid format Id"]
    },
  
}, {
  timestamps: true, 
});

const JobModdel = mongoose.model('JobApp', jobApplicationSchema);

module.exports = JobModdel;
