const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  societeName: {
    type: String,
    required: true,
    unique:true,
  },
  offer: {
    type: String,
    required: true,
},
  offerInscription: {
    type: String,
    required: true,
  },
  file: {
    type: String,
    
  },
  city: {
    type: String,
    required: true,
  },
  creationDate: {
    type: Date,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  contractType: {
    type: String,
    enum: ['CDI', 'CDD', 'Freelance', 'Stage'],
    required: true,
  },
  jobType: {
    type: String,
    enum: ['Temps plein', 'Temps partiel', 'Remote'],
    required: true,
  },
  experienceLevel: {
    type: String,
    enum: ['Junior', 'Intermédiaire', 'Senior'],
    required: true,
  },
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
