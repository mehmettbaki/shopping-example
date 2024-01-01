const register = async (req, res) => {
    try {
        return res.status(200).json('auth route');
    } catch (error) {
        return res.status(500).json(error.message);
    }
};


const login = async (req, res) => {
    try {
        return res.status(200).json('auth route');
    } catch (error) {
        return res.status(500).json(error.message);
    }
};


const logout = async (req, res) => {
    try {
        return res.status(200).json('auth route');
    } catch (error) {
        return res.status(500).json(error.message);
    }
};


module.exports = {register, login, logout}

