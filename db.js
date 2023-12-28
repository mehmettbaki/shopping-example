const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("WORLD", "memo", "memo", {
  host: "localhost",
  dialect: "mysql",
  timezone: "+03:00", //Turkiye Timezone
});

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    isim: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    soyisim: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    sifre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: true },
);

const Order = sequelize.define(
  "Order",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    totalPrice: {
      type: DataTypes.DECIMAL,
    },
    onay: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  { timestamps: true },
);

const Product = sequelize.define(
  "Product",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    productName: {
      type: DataTypes.STRING,
    },
    productDescription: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.DECIMAL,
    },
  },
  { timestamps: true },
);

const OrderProducts = sequelize.define(
  "OrderProducts",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },

    OrderId: {
      type: DataTypes.INTEGER,
      model: Order,
      key: Order.id,
    },

    ProductId: {
      type: DataTypes.INTEGER,
      model: Product,
      key: Product.id,
          },

    adet: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
  },
  { timestamps: true },
);

// İLİŞKİLER

User.hasMany(Order);
Order.belongsTo(User);

// Movie.belongsToMany(Actor, { through: 'ActorMovies' });
// Actor.belongsToMany(Movie, { through: 'ActorMovies' });

Order.belongsToMany(Product, { through: "OrderProducts" });
Product.belongsToMany(Order, { through: "OrderProducts" });

const connect = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    //await sequelize.sync({});
    console.log("All models were synchronized successfully.");

    //const result = await Product.create(newProduct);
    //const result = await Product.bulkCreate(products)
    //const result = await Product.create(newProduct)
    // await createrOrder();
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};


const newUser = {
  isim: "enes",
  soyisim: "kepek",
  email: "eneskepek@gmail.com",
  sifre: "sifre123",
};

const newProduct = {
  productName: "macbook pro",
  productDescription: "1 tb macbook pro",
  price: 6000,
};

const createrOrder = async () => {
    const reqProductId = '0efd4147-f516-431b-8879-2c3b3c38bf22'

  try {
    const [order, isCreated] = await Order.findOrCreate({
      where: { UserId: "e9213d32-a32e-46f5-a085-6b513129fce1", onay: false}});
    const product = await  Product.findByPk(reqProductId)

    const exists = await order.hasProduct(product)

     if(exists) {
        console.log('product exist in order')
        const orderitem = await OrderProducts.findOne({where :{ ProductId: reqProductId}})
        await orderitem.increment({adet : 1})
        
    //if(exists){ console.log('product exist in order')}
     }else {await order.addProduct(product)}

    // const ass = await Product.findOne({where : {id :'152b12ac-a59e-44f1-b83f-9770e0b8c01e'}, include : 'Orders' } );
    // console.log(ass.Orders.length)
    // let exits =await order.hasProduct(product);
    // if(exists) { await order.addProduct(product, {through: {quantity :  }})}

    // console.log(ornek)

    // let urunler = await order.getProducts();

    // console.log(urunler.length)
    // // Find or create the order
    // const [currentOrder, created] = await Order.findOrCreate({
    //     where: { UserId: 'e9213d32-a32e-46f5-a085-6b513129fce1', onay: false },
    //   });

    //   // Find the product
    //   const product = await Product.findByPk('2015ddee-c096-47fc-9201-cd03896f4d48');

    //   // Add the product to the order
    //   if (product) {
    //     await currentOrder.addProduct(product, { through: { adet: 5 } });
    //   } else {
    //     // Handle the case where the product is not found
    //         console.log('product yok')
    //   }

    //     let newOrder = null
    //     // önce user var mı yok mu buna bakalım
    //     const myuser = await User.findOne({email : 'mehmetbaki.123@gmail.com'})
    //     console.log('my userrr')
    //    //console.log(myuser.dataValues.id)
    // //     const myorders= await myuser.getOrders()
    // //    console.log('benim orderalr')
    // //     console.log(myorders)

    //     const [currentOrder, createdat] = await Order.findOrCreate({ where : { UserId : myuser.dataValues.id ,onay : false, } })
    //     // const hasOrder = await myuser.getOrders({ where : { onay : false}})
    //     // console.log(hasOrder)
    //     // ilgili userın ilgili siparişine ulaştıktan sonra orderproduct ekleyebiliriz.
    //     const productId = '2015ddee-c096-47fc-9201-cd03896f4d48'
    //     const adet = 5
    //     let foundProduct = await Product.findByPk(productId)
    //     console.log(foundProduct)

    //     console.log('current order')

    //    let a = await currentOrder.addOrderProducts(foundProduct, {through : { adet : adet }})

    //     // let ab = await OrderProduct.create({OrderId: currentOrder[0].dataValues.id, ProductId : productId, adet : 5})
    //     console.log('current order')

    // //         console.log(ourOrder)

    // //    await myuser.createOrder({})
    // //    console.log('created')
    //   //  console.log(`benim kullanıcım :   ${myuser}`)
    //     // console.log(myuser?.dataValues?.id)
    //     // // user yoksa yok response dönelim varsa onaylanmamış sipariş varsa onu bulalım
    //     // const existOrder = await Order.findOne({where : {onay : false}})
    //     // if(!existOrder){
    //     //     const newOrder = await Order.create({})
    //     //     // sipariş oluşturduktan sonra orderproductları buraya ekleyebiliriz
    //     //    await myuser.addOrders(newOrder)

    //     // }
    //     // console.log(newOrder)
  } catch (error) {
    console.log(error);
  }
};

// const createUser = async () => {
//   try {
//     const result = await User.create(users);

//     console.log(result);
//   } catch (error) {
//     console.log(error);
//   }
// };

module.exports = { sequelize, connect, User, Product, Order, OrderProducts };
