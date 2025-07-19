const express = require('express');
const { AsyncTryCatch } = require('../middleware/tryCatch');
const { userDetails, register, login, protectedData } = require('../controllers/user.controller');
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/user').get(AsyncTryCatch(userDetails))
router.route('/register').post(AsyncTryCatch(register));
router.route('/login').post(AsyncTryCatch(login));
router.route('/protected').get(authenticate,AsyncTryCatch(protectedData));


module.exports = router;