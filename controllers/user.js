const { User } = require('../db');
const bcrypt = require('bcrypt');


const login = async (req, res)=>{

    try {
        const {email, sifre} =req.body

        const user = await User.findOne({where : {email : email}})
        if(!user){return res.status(404).json('user does not exist! please register')}

        const passwordCorrect = await bcrypt.compare(sifre, user.sifre)

        console.log(passwordCorrect)

        return res.json(passwordCorrect)

    } catch (error) {
        return res.status(500).json(error.message);
    }
}

const registerUser = async (req, res) => {
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
// verison v1 use User model find method. cannot return updated User
// const updateUser = async (req, res) => {
//     try {
//         const { isim, soyisim, email, sifre } = req.body;
//         hashedPassword = await bcrypt.hash(sifre, 10);
//         const [_, isUpdated] = await User.update(
//             { isim, soyisim, email, sifre: hashedPassword },
//             { where: { id: req?.params?.id }, returning: true } // returning true only works with postgres and mssql
//         );
//         if (!isUpdated) {
//             return res.status(404).json('user does not updated');
//         } else {
//             return res.status(200).json(`${req.params.id} user updated`);
//         }
//     } catch (error) {
//         return res.status(500).json(error.message);
//     }
// };

// version v2 return updated. use user instance find method
const updateUser = async (req, res) => {
    try {
        const { isim, soyisim, email, sifre } = req.body;
        hashedPassword = await bcrypt.hash(sifre, 10);

        const user = await User.findByPk(req.params.id)
        if (!user) {
            return res.status(404).json('user does not found');
        }
        const isUpdated = await  user.update({isim, soyisim, email, sifre : hashedPassword})

        if (!isUpdated) {
            return res.status(404).json('user does not updated');
        } else {
            return res.status(200).json(isUpdated);
        }
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

const deleteUser = async (req, res) => {
    try {
        const isDeleted = await User.destroy({
            where: { id: req?.params?.id },
        });
        console.log(isDeleted)
        if (isDeleted) {
            console.log('return tarafı')
            return res.status(204).json('user deleted');
        } else {
            return res.status(404).json('user not found');
        }
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

module.exports = {
    registerUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
};
