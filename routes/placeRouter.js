

const express = require('express');
const router = express.Router();
const placeController = require('../controller/placecontroller');


router.get('/', placeController.getAllPlaces);


router.post('/createPlace', placeController.createPlace);


router.get('/proximity', placeController.getPlacesSortedByProximity);
router.get('/:id', placeController.getPlaceById);

module.exports = router;
