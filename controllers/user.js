const { User } = require('../db');
const bcrypt = require('bcrypt');

const createUser = async (req, res) => {
    try {
        const { isim, soyisim, email, sifre } = req.body;

        hashedPassword = await bcrypt.hash(sifre, 10);

        const newUser = await User.create({
            isim,
            soyisim,
            email,
            sifre: hashedPassword,
        });
        console.log('new prodd');
        console.log(newUser);

        return res.status(201).json(newUser);
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

const getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req?.params?.id);
        if (!user) {
            res.status(404).json(`${req?.params?.id} user not exist`);
        } else {
            return res.status(200).json(user);
        }
    } catch (error) {
        return res.status(500).json(error.message);
    }
};
const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({});

        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json(error.message);
    }
};
const updateUser = async (req, res) => {
    try {
        const { isim, soyisim, email, sifre } = req.body;
        hashedPassword = await bcrypt.hash(sifre, 10);
        const updatedUser = await User.findOne(
            { isim, soyisim, email, sifre: hashedPassword },
            { where: { id: req?.params?.id } }
        );

        return res.status(200).json(updateUser);
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

const deleteUser = async (req, res) => {
    try {
        const isDeleted = await User.destroy({
            where: { id: req?.params?.id },
        });
        if (!isDeleted) {
            res.status(404).json('user not found');
        } else {
            res.status(204).json(`${req.params.id} user deleted`);
        }
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
};