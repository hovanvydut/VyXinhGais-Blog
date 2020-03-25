const updateUser = (req, res, next) => {
    const error = {
        name: '',
        email: '',
        resetPassword: '',
        retypePassword: '',
        role: '',
        status: 'noError',
        setNewPassword: false,
    };

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

    const { resetPassword, retypePassword } = req.body;
    // if resetPassword and retypePassword empty => no reset password => no check validate for pwd
    if (resetPassword !== '' || retypePassword !== '') {
        error.setNewPassword = true;
        if (resetPassword !== retypePassword) {
            error.retypePassword = 'Mật khẩu không khớp';
            error.status = 'hasError';
        } else if (
            !/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(
                resetPassword
            )
        ) {
            error.resetPassword =
                'Ít nhất 8 kí tự, 1 chữ hoa, 1 kí tự đặc biệt và 1 chữ số';
            error.status = 'hasError';
        }
    }

    const { role } = req.body;
    if (!['customer', 'moderator'].includes(role)) {
        error.role = 'Role không hợp lệ (customer || moderator)';
        error.status = 'hasError';
    }

    res.locals.error = error;
    res.locals.userSubmit = {
        name,
        email,
        resetPassword,
        retypePassword,
        role,
    };

    next();
};

module.exports = {
    updateUser,
};
