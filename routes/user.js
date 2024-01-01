const express = require('express');
const {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    registerUser,
} = require('../controllers/user');
const router = express.Router();

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', registerUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
