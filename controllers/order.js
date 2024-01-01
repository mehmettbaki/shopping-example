const { Order, User, Product } = require('../db');
const getOrderResponse = require('../DTO/createOrderResponse');
const calculateTotal = require('../utils/calculateTotal');
// kullanıcının  bütün orderları listelenir
// userid TOKENDAN ALINACAK
const getAllOrders = async (req, res) => {
    try {
        const [orders, _] = await Order.findAll({
            where: {
                UserId: 'e9213d32-a32e-46f5-a085-6b513129fce1',
                onay: true,
            },
            include: 'Products',
        });
        console.log(orders.toJSON());
        return res.status(200).json(orders);
    } catch (error) {
        return res.status(500).json(error.message);
    }
};
// sipariş onayla
const createOrder = async (req, res) => {
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

        order.totalPrice = calculateTotal(order);
        order.onay = true;

        await order.save();

        console.log(order.totalPrice);

        return res.status(200).json(getOrderResponse(order, products));
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

// user kendine ait olan siparişleri görebilecek
const getOrderById = async (req, res) => {
    try {
        const order = await Order.findOne({
            where: {
                id: req.params.id, // 'e077a944-1a14-4c41-84c2-c1c7215bbbc4',
                // UserId : req.User.id
                onay: true,
            },
            include: 'Products',
        });
        if (!order) {
            return res.status(404).json('order not found');
        }
        console.log(order.toJSON());

        return res.status(200).json(order);
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

// admin can update
const updateOrder = async (req, res) => {
    try {
        return res.send('update order');
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

//admin can delete
const deleteOrder = async (req, res) => {
    try {
        return res.send('delete order');
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

module.exports = {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrder,
    deleteOrder,
};
