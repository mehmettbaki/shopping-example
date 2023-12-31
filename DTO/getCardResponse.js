const getCardResponse = (products, total) => {
    
    const responseProducts = products.map((u) => {
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
        products: responseProducts,
        total: total,
        success: true,
    };
};

module.exports = getCardResponse;
