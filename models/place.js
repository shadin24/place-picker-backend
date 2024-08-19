// models/placeModel.js

const mongoose = require('mongoose');

// Define the schema for the Place
const placeSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true // Ensure each place has a unique ID
  },
  title: {
    type: String,
    required: true
  },
  image: {
    src: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      required: true
    }
  },
  lat: {
    type: Number,
    required: true
  },
  lon: {
    type: Number,
    required: true
  }
});

// Create the model using the schema
const Place = mongoose.model('Place', placeSchema);

module.exports = Place;
