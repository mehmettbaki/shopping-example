const { Order, User } = require('../db');

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

        // const orderTotalPrice = order.Products.reduce((total, p) => {
        //     return total + p.price * p.OrderProducts.adet;
        // }, 0);

        // console.log(orderTotalPrice);

        // order.totalPrice = orderTotalPrice

        // await order.save()

        return res.status(200).json(orders);
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

const createOrder = async (req, res) => {
    try {
        return res.send('create order');
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

const updateOrder = async (req, res) => {
    try {
        return res.send('update order');
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

const deleteOrder = async (req, res) => {
    try {
        console.log('hitt');
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
