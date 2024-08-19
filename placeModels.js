// models/placeModel.js

let AVAILABLE_PLACES = [
    {
      id: 'p1',
      title: 'Forest Waterfall',
      image: {
        src: 'forestWaterfallImg',
        alt: 'A tranquil forest with a cascading waterfall amidst greenery.',
      },
      lat: 44.5588,
      lon: -80.344,
    },
    // Add all the other places here
  ];
  
  // Function to add a new place
  const addPlace = (newPlace) => {
    AVAILABLE_PLACES.push(newPlace);
  };
  
  module.exports = {
    AVAILABLE_PLACES,
    addPlace,
  };
  