

const Place = require('../models/place');

// Haversine formula to calculate distance between two lat/lon points
const getDistance = (lat1, lon1, lat2, lon2) => {
  const toRad = (value) => (value * Math.PI) / 180;
  const R = 6371; 

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; 
};


const getAllPlaces = async (req, res) => {
  try {
    const places = await Place.find(); 
    res.json(places);
  } catch (error) {
    res.status(500).json({ message: error.message }); 
  }
};


const getPlaceById = async (req, res) => {
  try {
    const placeId = req.params.id;
    const place = await Place.findById(placeId); 

    if (place) {
      res.json(place);
    } else {
      res.status(404).send('Place not found');
    }
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handle errors
  }
};


const createPlace = async (req, res) => {
  try {
    const newPlace = new Place(req.body); // Create a new Place instance with the request body
    await newPlace.save(); // Save the new place to the database
    res.status(201).json(newPlace); // Respond with the created place and status code 201 (Created)
  } catch (error) {
    res.status(400).json({ message: error.message }); // Respond with an error message if something goes wrong
  }
};

// Sort places by proximity to a given lat/lon
const getPlacesSortedByProximity = async (req, res) => {
  const { lat, lon } = req.query;
  console.log("hi hello");

  if (!lat || !lon) {
    return res.status(400).send('Latitude and longitude are required');
  }

  const latitude = parseFloat(lat);
  const longitude = parseFloat(lon);

  try {
    // Fetch all places from the database
    const places = await Place.find();

    // Calculate distance for each place and sort by distance
    const sortedPlaces = places.map((place) => {
      const distance = getDistance(latitude, longitude, place.lat, place.lon);
      return {
        ...place.toObject(), // Convert mongoose document to plain JavaScript object
        distance
      };
    }).sort((a, b) => a.distance - b.distance);

    console.log(sortedPlaces);

    res.json(sortedPlaces);
  } catch (error) {
    res.status(500).json({ message: error.message }); 
  }
};

module.exports = {
  getAllPlaces,
  getPlaceById,
  createPlace,
  getPlacesSortedByProximity,
};



// // controllers/placeController.js
// const Place = require('../models/place');

// const { AVAILABLE_PLACES, addPlace } = require('../placeModels');

// // Haversine formula to calculate distance between two lat/lon points
// const getDistance = (lat1, lon1, lat2, lon2) => {
//   const toRad = (value) => (value * Math.PI) / 180;
//   const R = 6371; // Radius of the Earth in kilometers

//   const dLat = toRad(lat2 - lat1);
//   const dLon = toRad(lon2 - lon1);
//   const a =
//     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//     Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
//     Math.sin(dLon / 2) * Math.sin(dLon / 2);
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   return R * c; // Distance in kilometers
// };

// // Get all places
// const getAllPlaces = (req, res) => {
//   res.json(AVAILABLE_PLACES);
// };

// // Get place by ID
// const getPlaceById = (req, res) => {
//     console.log("hi");
//   const placeId = req.params.id;
//   const place = AVAILABLE_PLACES.find((p) => p.id === placeId);

//   if (place) {
//     res.json(place);
//   } else {
//     res.status(404).send('Place not found');
//   }
// };

// // Add a new place
// // const createPlace = (req, res) => {
// //   const newPlace = req.body;
// //   addPlace(newPlace);
// //   res.status(201).json(newPlace);
// // };


// const createPlace = async (req, res) => {
//     try {
//       const newPlace = new Place(req.body); // Create a new Place instance with the request body
//       await newPlace.save(); // Save the new place to the database
//       res.status(201).json(newPlace); // Respond with the created place and status code 201 (Created)
//     } catch (error) {
//       res.status(400).json({ message: error.message }); // Respond with an error message if something goes wrong
//     }
//   };

// // Sort places by proximity to a given lat/lon
// const getPlacesSortedByProximity = (req, res) => {
//   const { lat, lon } = req.query;
//   console.log("hi hello");

//   if (!lat || !lon) {
//     return res.status(400).send('Latitude and longitude are required');
//   }

//   const latitude = parseFloat(lat);
//   const longitude = parseFloat(lon);

//   const sortedPlaces = AVAILABLE_PLACES.map((place) => {
//     return {
//       ...place,
//       distance: getDistance(latitude, longitude, place.lat, place.lon),
//     };
//   }).sort((a, b) => a.distance - b.distance);

//   console.log(sortedPlaces);

//   res.json(sortedPlaces);
// };

// module.exports = {
//   getAllPlaces,
//   getPlaceById,
//   createPlace,
//   getPlacesSortedByProximity,
// };


