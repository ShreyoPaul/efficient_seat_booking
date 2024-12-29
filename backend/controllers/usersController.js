const User = require('../models/users');
const { hashPassword, generateJWT, comparePassword } = require('../utils/authenticate');

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    console.log(typeof password, password);

    try {
        const user = await User.findOne({ where: { email } });
        console.log(user);
        if (!user) {
            return res.status(400).json({ message: 'User not found!' });
        }
        if(!await comparePassword(password, user.password)) {
            return res.status(400).json({ message: 'Invalid password!' });
        }
        const token = generateJWT({ user });
        res.status(200).json({ message: 'Login successful!', token, user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await hashPassword(password);
    try {
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required!' });
        }
        else if (await User.findOne({ where: { email } })) {
            return res.status(400).json({ message: 'User already exists!' });
        }

        const user = await User.create({ name, email, password: hashedPassword });
        console.log(user);
        const token = generateJWT({ user });
        res.status(200).json({ message: 'User registered successfully', user, token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { loginUser, registerUser };