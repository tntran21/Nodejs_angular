var jwt = require('jsonwebtoken');
var key = 'ngan';
module.exports = {
    mahoa: function(data){
        return jwt.sign({
            id: data
        }, key);
    },
    giaima: function(token){
        try {
            var decoded = jwt.verify(token, key);
            return decoded;
        } catch(err) {
            return false;
        }
    }
}