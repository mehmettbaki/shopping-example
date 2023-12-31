const { OrderProducts, Order, Product, User } = require('../db');
const sepetresponse = require('../utils/sepetresponse')


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

        const added = await order.addProduct(product, {through: {adet : +req.body.adet || 1 }})

        console.log(added)





   

        res.json(200);
    } catch (error) {
        res.status(500).json(error.message);
    }
};
//sepetteki ürünü çağır
const getOrderProductbyId = async (req, res) => {
    try {
        res.json(200);
    } catch (error) {
        res.status(500).json(error.message);
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

        const total = order.Products.reduce((total, p) => {
            return total + p.price * p.OrderProducts.adet;
        }, 0);

        console.log(total);

        return res.status(200).json({
            products: sepetresponse(products) || [],
            total: total,
            success: true,
        });
    } catch (error) {
        res.status(500).json(error.message);
    }
};
//sepettekin ürün günncelle
const updateOrderProduct = async (req, res) => {
    try {
        res.json(200);
    } catch (error) {
        res.status(500).json(error.message);
    }
};
//sepetteki ürünü çıkar
const deleteOrderProduct = async (req, res) => {
    try {
        res.json(200);
    } catch (error) {
        res.status(500).json(error.message);
    }
};

module.exports = {
    createOrderProduct,
    getOrderProducts,
    updateOrderProduct,
    deleteOrderProduct,
    getOrderProductbyId,
};
