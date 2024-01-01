const { Order, User } = require('../db');


// kullanıcının  bütün orderları listelenir
// userid TOKENDAN ALINACAK
const getAllOrders = async (req, res) => {
    try {
        const [order, _] = await Order.findAll({
            where: {
                UserId: 'e9213d32-a32e-46f5-a085-6b513129fce1',
                onay: true,
                
            },
            include: 'Products',
        });

        console.log(order.toJSON());

        // const orderTotalPrice = order.Products.reduce((total, p) => {
        //     return total + p.price * p.OrderProducts.adet;
        // }, 0);

        // console.log(orderTotalPrice);


        // order.totalPrice = orderTotalPrice

        // await order.save()
        
        return res.status(200).json(order);
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

const getOrderById = async (req, res) => {
    try {
        return res.send('getorder byid');
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
