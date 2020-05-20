const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const generateId = require('./../../common/generateId');
const knex = require('../../database/connection');

const handleLogin = async (req, res) => {
    // `${process.env.HOST}/api/v1/login
    const { email, password } = req.body;
    try {
        const user = await knex('users')
            .select()
            .where({ email })
            .first();

        if (!user) {
            return res.status(401).json({ message: 'Email is not exist' });
        }

        const checkPwd = bcrypt.compareSync(password, user.password);
        if (!checkPwd) {
            return res.status(401).json({ message: 'Password is not correct' });
        }

        const data = {
            id: user.id,
            email: user.email,
            name: user.name,
            avatar: user.avatar,
        };
        const token = jwt.sign(data, process.env.JWT_SECRET_KEY, {
            expiresIn: '12h',
        });
        return res.status(200).json(token);
    } catch (err) {
        return res.status(404).json({ message: 'Error when query database!' });
    }
};

const handleSignup = async (req, res) => {
    const email = req.body.email.trim().toLowerCase();

    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g.test(email)) {
        return res.status(403).json({ message: 'Invalid email' });
    }

    const { password, retypePassword } = req.body;
    if (retypePassword !== password) {
        return res
            .status(403)
            .json({ message: 'Retype-password is incorrect' });
    }

    let { fullname } = req.body;
    if (/^(\s*[A-Za-z]{2,}\s*)+$/g.test(fullname)) {
        fullname = fullname.trim();
        fullname = fullname.replace(/\s(?=\s)/g, '');
    } else {
        return res.status(403).json({ message: 'Invalid fullname' });
    }

    if (
        !/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(
            password
        )
    ) {
        return res.status(403).json({
            message:
                'Password must contain at least 8 characters, at least one number and both lower and upper case and special characters',
        });
    }

    const data = await knex('users')
        .select()
        .where({ email })
        .first();
    if (data) return res.status(403).json({ message: 'Email is exist' });

    try {
        await knex('users').insert({
            id: generateId(),
            name: fullname,
            email,
            password,
        });
    } catch (err) {
        return res.status(403).json({ message: 'Failed 403!' });
    }

    return res.status(200).json({ message: 'Registered successfully' });
};
module.exports = {
    handleLogin,
    handleSignup,
};
