const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtById,
    addThought,
    updateThought,
    deleteThought,
    addReaction, 
    removeReaction
  } = require('../../controllers/thought-controller');

  router
  .route('/')
  .get(getAllThoughts)
  .post(addThought);

  router
  .route('/:id')
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

  router
  .route('/:thoughtid/reactions')
  .post(addReaction)
  .delete(removeReaction);
