function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
}

function generateId(length = 5) {
    let id = '';
    for (let i = 1; i <= length; i += 1) {
        id += `${s4()}-`;
    }
    return id.substring(0, id.length - 1);
}

function validateSignUp(req, res, next) {
    const error = [];

    let { name } = req.body;
    if (/^(\s*[A-Za-z]{2,}\s*)+$/g.test(name)) {
        // xoá khoảng trắng 2 đầu chuỗi
        name = name.trim();
        // xoá những khoảng trắng theo sau nó là khoảng trắng
        name = name.replace(/\s(?=\s)/g, '');
    } else {
        error.push('Tên không hợp lệ');
    }

    const email = req.body.email.trim().toLowerCase();
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g.test(email)) {
        error.push('Email không hợp lệ');
    }

    const { password, retypePassword } = req.body;
    if (password !== retypePassword) {
        error.push('Mật khẩu không khớp');
    } else if (
        !/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(
            password
        )
    ) {
        error.push(
            'Mật khẩu phải gồm 8 kí tự trở lên, có ít nhất một chữ hoa và một kí tự đặc biệt, một chữ số'
        );
    }

    res.locals.error = error;
    res.locals.user = {
        id: generateId(),
        name,
        email,
        password,
    };

    next();
}

module.exports = {
    validateSignUp,
};
