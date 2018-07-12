var jwt = require('../services/jsonwebtoken');
module.exports = function (req, res, next) {
    if (req.headers.token && req.headers.token != '') {
        var giaima = jwt.giaima(req.headers.token);
        if (giaima.id) {
            req.headers.authID = giaima.id;
            return next();
        }
        if (giaima === false) {
            return res.json({
                status: 'error',
                message: 'Token không hợp lệ',
                isAuth: false
            });
        }
    } else {
        return res.json({
            status: 'error',
            message: 'Bạn không đủ quyền truy cập đường dẫn này',
            isAuth: false
        });
    }
}