const { OrderProducts, Order, Product, User } = require('../db');
const getCardResponse = require('../DTO/getCardResponse');
const calculateTotal = require('../utils/calculateTotal');

//sepete ekle
//  req.body.productId
// req.body.adet

const createOrderProduct = async (req, res) => {
    const userId = 'e9213d32-a32e-46f5-a085-6b513129fce1';
    const orderID = 'ac7002eb-ef60-463d-af3f-ec1abed1710a';

    try {
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json('user does not exist');
        }

        const [order, isCreated] = await Order.findOrCreate({
            where: { UserId: userId, onay: false },
            include: [{ model: Product, required: true }],
        });

        const product = await Product.findByPk(req.body.productId);
        if (!product) {
            return res.status(404).json('product not found');
        }

        const added = await order.addProduct(product, {
            through: { adet: +req.body.adet || 1 },
        });
        // if(!added){return res.status(400).json('ürün sepete eklenemedi')}

        const products = await order.getProducts();

        const total = calculateTotal(order);

        return res.status(201).json(getCardResponse(products, total));
    } catch (error) {
        return res.status(500).json(error.message);
    }
};
//sepetteki ürünü çağır
const getOrderProductbyId = async (req, res) => {
    try {
        const userId = 'e9213d32-a32e-46f5-a085-6b513129fce1';
        const orderID = 'ac7002eb-ef60-463d-af3f-ec1abed1710a';

        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json('user does not exist');
        }

        const [order, isCreated] = await Order.findOrCreate({
            where: { UserId: userId, onay: false },
            include: [{ model: Product, required: true }],
        });

        const product = await Product.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json('product not found');
        }
        const productAddedtoCard = await order.hasProduct(product);

        if (!productAddedtoCard) {
            return res.status(404).json('please add product to card');
        }

        // if(!added){return res.status(400).json('ürün sepete eklenemedi')}

        const products = await order.getProducts();

        const pro = products.find((p) => {
            console.log(p.id);
            return p.id == req.params.id;
        });

        const getOrderProductbyIdResponse = (product) => {
            return {
                orderId: product.OrderProducts.OrderId,
                productId: product.id,
                productName: product.productName,
                price: product.price,
                quantity: product.OrderProducts.adet,
                unitTotalPrice: product.price * product.OrderProducts.adet,
            };
        };

        return res.json(getOrderProductbyIdResponse(pro));
    } catch (error) {
        return res.status(500).json(error.message);
    }
};
//sepettekileri çağır
const getOrderProducts = async (req, res) => {
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

        const total = calculateTotal(order);

        console.log(total);

        return res.status(200).json(getCardResponse(products, total));
    } catch (error) {
        return res.status(500).json(error.message);
    }
};
//sepettekin ürün günncelle    put product id quantity
const updateOrderProduct = async (req, res) => {
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

        const product = await Product.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json('product not found');
        }

        // if(!added){return res.status(400).json('ürün sepete eklenemedi')}

        const productAddedtoCard = await order.hasProduct(product);

        if (!productAddedtoCard) {
            return res.status(404).json('please add product to card');
        }

        const added = await order.addProduct(product, {
            through: { adet: +req.body.adet || 1 },
        });
        // if(!added){return res.status(400).json('ürün sepete eklenemedi')}

        const products = await order.getProducts();

        const total = calculateTotal(order);

        return res.status(201).json(getCardResponse(products, total));
    } catch (error) {
        return res.status(500).json(error.message);
    }
};
//sepetteki ürünü çıkar
const deleteOrderProduct = async (req, res) => {
    try {
        const userId = 'e9213d32-a32e-46f5-a085-6b513129fce1';
        const orderID = 'ac7002eb-ef60-463d-af3f-ec1abed1710a';

        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json('user not exist');
        }

        const [order, isCreated] = await Order.findOrCreate({
            where: { UserId: userId, onay: false },
            include: [{ model: Product, required: true }],
        });

        if (isCreated) {
            return res.status(200).json('sepet boş');
        }

        const product = await Product.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json('product not found');
        }



       const removed = await order.removeProduct(product)
       if(!removed){ return res.status(404).json('ürün sepette yok')}

        return res.status(200).json(`${req.params.id} ürün sepetten çıkarıldı.`);
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

module.exports = {
    createOrderProduct,
    getOrderProducts,
    updateOrderProduct,
    deleteOrderProduct,
    getOrderProductbyId,
};
