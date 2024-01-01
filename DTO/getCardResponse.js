const getCardResponse = (products, total) => {
    
    const newUrunler = products.map((u) => {
        let urun = {
            productId: u.id,
            productName: u.productName,
            productDescription: u.productDescription,
            unitPrice: u.price,
            quantity: u.OrderProducts.adet,
            unittotalPrice: +(u.price * u.OrderProducts.adet),
        };

        return urun;
    });

    return {
        products: newUrunler,
        total: total,
        success: true,
    };
};

module.exports = getCardResponse;
