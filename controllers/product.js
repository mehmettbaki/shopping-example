const { Product, Order, User, OrderProducts } = require('../db');

const createProduct = async (req, res) => {
    try {
        const { productName, productDescription, price } = req.body;

        const newProduct = await Product.create({
            productName,
            productDescription,
            price,
        });
        console.log('new prodd')
        console.log(newProduct)

        return res.status(201).json(newProduct);
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

const getProductById = async (req, res) => {
    try {
        const getProduct = await Product.findByPk(req.params.id);
        if(!getProduct){return res.status(404).json('product not found')}

        return res.status(200).json(getProduct);
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll({});

        res.status(200).json(products);
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

const updateProduct = async (req, res) => {
    try {
        const { productName, productDescription, price } = req.body;

        const updatedProduct = await Product.update(
            { productName, productDescription, price },
            { where: { id: req.params.id } }
        );
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

const deleteProduct = async (req, res) => {
    try {
        const isDeleted = await Product.destroy({
            where: { id: req?.params?.id }
        });
        if(!isDeleted){
            res.status(404).json('product not found');
        }else {
        res.status(204).json({isDeleted :true });}
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
};
