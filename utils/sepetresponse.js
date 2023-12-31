const sepetresponse = (urunler) => {
    return urunler.map((u) => {
        let urun = {
            productName: u.productName,
            productDescription: u.productDescription,
            price: u.price,
            quantity: u.OrderProducts.adet,
        };

        return urun;
    });
};

module.exports = sepetresponse