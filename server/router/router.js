const express = require('express');
const controller = require('../controllers/controller');
const router = express.Router();
const { validateToken } = require("../middleware/middleware");

router.post('/register', controller.register);
router.post('/login', controller.login);
router.get('/', controller.fetchUser);
router.get('/auth', controller.auth);

module.exports = router;
