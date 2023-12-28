const express = require('express')
const { getAllProducts, createProduct, getProductById, updateProduct, deleteProduct } = require('../controllers/product')
const router = express.Router()


router.get('/', getAllProducts)
router.get('/:id', getProductById)
router.post('/', createProduct)
router.put('/:id', updateProduct)
router.delete('/:id', deleteProduct)




module.exports = router