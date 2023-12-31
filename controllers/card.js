const { OrderProducts, Order, Product, User } = require('../db');
const getOrderProductsResponse = require('../DTO/getOrderProductsResponse');
const calculateTotal = require('../utils/calculateTotal');

//sepete ekle
//  req.body.productId
// req.body.adet

const createOrderProduct = async (req, res) => {
    const userId = 'e9213d32-a32e-46f5-a085-6b513129fce1';
    const orderID = 'ac7002eb-ef60-463d-af3f-ec1abed1710a';

    try {
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json('user does not exist');
        }

        const [order, isCreated] = await Order.findOrCreate({
            where: { UserId: userId, onay: false },
            include: [{ model: Product, required: true }],
        });

        const product = await Product.findByPk(req.body.productId);
        if (!product) {
            return res.status(404).json('product not found');
        }

        const added = await order.addProduct(product, {
            through: { adet: +req.body.adet || 1 },
        });

        return res.json(201).json('sepete eklendi');
    } catch (error) {
        return res.status(500).json(error.message);
    }
};
//sepetteki ürünü çağır
const getOrderProductbyId = async (req, res) => {
    try {
        return res.json(200);
    } catch (error) {
        return res.status(500).json(error.message);
    }
};
//sepettekileri çağır
const getOrderProducts = async (req, res) => {
    try {
        // userid token ile alınacak
        const userId = 'e9213d32-a32e-46f5-a085-6b513129fce1';
        const orderID = 'ac7002eb-ef60-463d-af3f-ec1abed1710a';

        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json('user now exist');
        }

        const [order, isCreated] = await Order.findOrCreate({
            where: { UserId: userId, onay: false },
            include: [{ model: Product, required: true }],
        });

        if (isCreated) {
            return res.status(200).json('sepet boş');
        }

        const products = await order.getProducts();

        const total = calculateTotal(order);

        console.log(total);

        return res.status(200).json({
            products: getOrderProductsResponse(products) || [],
            total: total,
            success: true,
        });
    } catch (error) {
        return res.status(500).json(error.message);
    }
};
//sepettekin ürün günncelle
const updateOrderProduct = async (req, res) => {
    try {
        return res.json(200);
    } catch (error) {
        return res.status(500).json(error.message);
    }
};
//sepetteki ürünü çıkar
const deleteOrderProduct = async (req, res) => {
    try {
        res.json(200);
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

module.exports = {
    createOrderProduct,
    getOrderProducts,
    updateOrderProduct,
    deleteOrderProduct,
    getOrderProductbyId,
};
