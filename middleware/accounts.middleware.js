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
    const error = {
        name: '',
        email: '',
        password: '',
        retypePassword: '',
        status: 'noError',
    };

    console.log(req.body);

    let { name } = req.body;
    if (/^(\s*[A-Za-z]{2,}\s*)+$/g.test(name)) {
        // xoá khoảng trắng 2 đầu chuỗi
        name = name.trim();
        // xoá những khoảng trắng theo sau nó là khoảng trắng
        name = name.replace(/\s(?=\s)/g, '');
    } else {
        error.name = 'Tên không hợp lệ';
        error.status = 'hasError';
    }

    const email = req.body.email.trim().toLowerCase();
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g.test(email)) {
        error.email = 'Email không hợp lệ';
        error.status = 'hasError';
    }

    const { password, retypePassword } = req.body;
    if (password !== retypePassword) {
        error.retypePassword = 'Mật khẩu không khớp';
        error.status = 'hasError';
    } else if (
        !/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(
            password
        )
    ) {
        error.password =
            'Ít nhất 8 kí tự, 1 chữ hoa, 1 kí tự đặc biệt và 1 chữ số';
        error.status = 'hasError';
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
