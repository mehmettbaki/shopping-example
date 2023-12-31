const getOrderProductsResponse = (urunler) => {
    return urunler.map((u) => {
        let urun = {
            productId : u.id,
            productName: u.productName,
            productDescription: u.productDescription,
            unitPrice: u.price,
            quantity: u.OrderProducts.adet,
            totalPrice : +(u.price*u.OrderProducts.adet)
            
        };

        return urun;
    });
};

module.exports = getOrderProductsResponse