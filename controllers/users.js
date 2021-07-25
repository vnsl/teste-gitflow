const connection = require('../connection');
const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {
    const { user_name, email, user_password, store_name } = req.body;

    if (!user_name) {
        return res.status(404).json("'user_name' field is mandatory.");
    }

    if (!email) {
        return res.status(404).json("'email' field is mandatory.");
    }

    if (!user_password) {
        return res.status(404).json("'user_password' field is mandatory.");
    }

    if (!store_name) {
        return res.status(404).json("'store_name' field is mandatory.");
    }

    try {
        const queryVerifyEmail = 'select * from users where email = $1';

        const { rowCount: user } = await connection.query(queryVerifyEmail, [email]);
        
        if (user > 0) {
            return res.status(400).json("This email is already taken. Choose a different one.")
        }

        const encryptedPassword = await bcrypt.hash(user_password, 10);

        const query = 'insert into users (user_name, email, user_password, store_name) values ($1, $2, $3, $4)';
        const { rowCount: newUser } = await connection.query(query, [user_name, email, encryptedPassword, store_name]);

        if (newUser === 0) {
            return res.status(400).json('User registration failed.');
        }

        return res.status(200).json('User registration completed.');
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

module.exports = {
    registerUser
}