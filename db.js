const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('WORLD', 'memo', 'memo', {
    host: 'localhost',
    dialect: 'mysql',
    timezone: '+03:00', //Turkiye Timezone
});

const User = sequelize.define(
    'User',
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
    { timestamps: true }
);

const Order = sequelize.define(
    'Order',
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
    { timestamps: true }
);

const Product = sequelize.define(
    'Product',
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
            defaultValue: 0,
        },
    },
    { timestamps: true }
);

const OrderProducts = sequelize.define(
    'OrderProducts',
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
    { timestamps: true }
);

// associations

User.hasMany(Order);
Order.belongsTo(User);

// Movie.belongsToMany(Actor, { through: 'ActorMovies' });
// Actor.belongsToMany(Movie, { through: 'ActorMovies' });

Order.belongsToMany(Product, { through: 'OrderProducts' });
Product.belongsToMany(Order, { through: 'OrderProducts' });

const connect = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        // await sequelize.sync({alter :true});
        await sequelize.sync();
        console.log('All models were synchronized successfully.');

        //const result = await Product.create(newProduct);
        //const result = await Product.bulkCreate(products)
        //const result = await Product.create(newProduct)
        // await createrOrder();
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

module.exports = { sequelize, connect, User, Product, Order, OrderProducts };
