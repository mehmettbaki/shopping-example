const express = require('express');
const router = express.Router();
const {
    addProductToCard,
    getProductsFromCard,
    updateProductInCard,
    deleteProductfromCard,
    getProductFromCard,
} = require('../controllers/card');

//sepete ekle
router.post('/', addProductToCard);

//sepettekileri çağır
router.get('/', getProductsFromCard);

//sepetteki ürünü çağır
router.get('/:id', getProductFromCard);

//sepettekin ürün günncelle
router.put('/:id', updateProductInCard);

//sepetteki ürünü çıkar
router.delete('/:id', deleteProductfromCard);

module.exports = router;
