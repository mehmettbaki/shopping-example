const getOrderResponse = (order, products) => {
    const pro = products.map((u) => {
        let product = {
            productId: u.id,
            productName: u.productName,
            productDescription: u.productDescription,
            unitPrice: u.price,
            quantity: u.OrderProducts.adet,
            unittotalPrice: +(u.price * u.OrderProducts.adet),
        };

        return product;
    });

    return {
        OrderId: order.id,
        UserId: order.UserId,
        TotalPrice: order.totalPrice,
        Onay: order.onay,
        Products: pro,
    };
};

module.exports = getOrderResponse;
