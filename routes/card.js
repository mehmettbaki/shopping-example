const express = require('express');
const router = express.Router();
const {
    createOrderProduct,
    getOrderProducts,
    updateOrderProduct,
    deleteOrderProduct,
    getOrderProductbyId,
} = require('../controllers/card');


//sepete ekle
router.post('/',createOrderProduct); 

//sepettekileri çağır
router.get('/', getOrderProducts )

//sepetteki ürünü çağır
router.get('/:id',getOrderProductbyId )

//sepettekin ürün günncelle
router.put('/:id', updateOrderProduct)

//sepetteki ürünü çıkar
router.delete('/:id', deleteOrderProduct) 



module.exports = router