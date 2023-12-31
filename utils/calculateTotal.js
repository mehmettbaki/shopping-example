const calculateTotal = (order) => {
    return order.Products.reduce((total, p) => {
        return total + p.price * p.OrderProducts.adet;
    }, 0);
};


module.exports = calculateTotal