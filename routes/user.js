const express = require('express')
const { getAllUsers, createUser, getUserById, updateUser, deleteUser } = require('../controllers/user')
const router = express.Router()


router.get('/', getAllUsers)
router.get('/:id', getUserById)
router.post('/', createUser)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)




module.exports = router