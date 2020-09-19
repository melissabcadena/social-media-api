const router = require('express').Router();

const {
    getAllUsers,
    getPizzaById,
    createPizza,
    updatePizza,
    deletePizza
  } = require('../../controllers/user-controller');