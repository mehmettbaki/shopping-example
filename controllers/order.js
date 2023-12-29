const { Order } = require('../db');

const getAllOrders = async (req, res) => {
    try {
        res.send('getAllorders');
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

const createOrder = async (req, res) => {
    try {
        res.send('create order');
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

const getOrderById = async (req, res) => {
    try {
        res.send('getorder byid');
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

const updateOrder = async (req, res) => {
    try {
        res.send('update order');
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

const deleteOrder = async (req, res) => {
    try {
        res.send('not implemented');
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
