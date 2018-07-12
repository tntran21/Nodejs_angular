/**
 * UsersController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
//Cai packege tu dong restar server
//npm install -g nodemon
//chay : nodemon app.js
//Cai jsonwebtoken npm install jsonwebtoken


var bcrypt = require('bcryptjs');
var jwt = require('../services/jsonwebtoken');

module.exports = {
	user_create: function(req, res){
        //Nhan du lieu tu client gui len
        //Tao user
        var user_email = req.param('user_email'),
          user_password= req.param('user_password');
            console.log(user_email);
            console.log(user_password);
         //Kiem tra du lieu email
            if(!user_email || user_email===''){
                return res.json({
                    status: 'err',
                    message:'Ban chua nhap email'
                });
            }
            //kiem tra mat khau
            if(!user_password || user_password ===''){
                return res.json({
                    status: 'erro',
                    message: 'Ban chua nhap mat khau'
                });
            }
             //Kiem tra user ton tai hay chua, voi findOne() tra ve 2 tham so (err, find)
            Users.findOne({ user_email: user_email }).exec(function (err, find) {
                //Neu trong qua trinh tao bi loi thi in ra man hinh
                if (err) { return console.log(err) }
                //User da ton tai
                if (find) {
                    return res.json({
                        status: 'error',
                        message: 'Email da ton tai'
                    })
                } else {
                    //User chua ton tai, tien hanh tao moi
                    Users.create({ user_email: user_email, user_password: user_password }).exec(function (err, created) {
                        if (err) { return console.log(err) }
                        if (created) {
                            return res.json({
                                status: 'success',
                                message: 'Tao tai khoan thanh cong',
                                user: created
                            });
                        }
                    });
                }
            });
    },
    //Moi action cach nhau 1 dau ","
    //
    user_profile: function (req, res) {
        var user_id = req.headers.authID;
        
        if (!user_id || user_id === '' || user_id === 0) {
            return res.json({
                status: 'error',
                message: 'ID khong hop le'
            });
        }
        Users.findOne({ user_id: user_id }).exec(function (err, find) {
            if (err) { return console.log(err) }
            if (find) {
                return res.json({
                    status: 'success',
                    message: 'GET profile thanh cong',
                    user: find
                })
                console.log(find)
            } else {
                return res.json({
                    status: 'success',
                    message: 'Khong tim thay user voi id: ' + user_id
                })
            }
        });
    },
    user_update: function (req, res) {
        var user_id = req.param('user_id'),
            update_email = req.param('update_email'), //Email nguoi dung gui len
            user_fullname = req.param('user_fullname'),
            user_sex = req.param('user_sex');
        if (!user_id || user_id === '' || user_id === 0) {
            return res.json({
                status: 'error',
                message: 'ID khong hop le'
            });
        }
        if ((update_email && update_email != '')) {
            console.log("Nguoi dung co nhap email")
            Users.findOne({ user_email: update_email }).exec(function (err, find) {
                if (err) { return console.log(err) }
                //Email da ton tai, khong duoc cap nhat email nua
                if (find) {
                    Users.update({ user_id: user_id }, { user_fullname: user_fullname, user_sex: user_sex }).exec(function (err, updated) {
                        if (err) { return console.log(err) }
                        if (updated) {
                            return res.json({
                                status: 'success',
                                message: 'Cap nhat thong tin thanh cong'
                            })
                        }
                    });
                } else {
                    //Emaiil chua co trong csdl, duoc phep cap nhat lai email
                    Users.update({ user_id: user_id }, { user_email: update_email, user_fullname: user_fullname, user_sex: user_sex }).exec(function (err, updated) {
                        if (err) { return console.log(err) }
                        if (updated) {
                            return res.json({
                                status: 'success',
                                message: 'Cap nhat thong tin thanh cong'
                            })
                        }
                    });
                }
            });
        } else {
            Users.findOne({ user_id: user_id }).exec(function (err, find) {
                if (err) { return console.log(err) }
                if (find) {
                    Users.update({ user_id: user_id }, { user_fullname: user_fullname, user_sex: user_sex }).exec(function (err, updated) {
                        if (err) { return console.log(err) }
                        if (updated) {
                            return res.json({
                                status: 'success',
                                message: 'Cap nhat thong tin thanh cong'
                            })
                        }
                    });
                } else {
                    return res.json({
                        status: 'error',
                        message: 'ID khong hop le'
                    })
                }
            })
        }

    },
    user_delete:function(req, res){
        var user_id = req.param('user_id');
        if (!user_id || user_id === '' || user_id === 0) {
            return res.json({
                status: 'error',
                message: 'ID khong hop le'
            });
        }
        Users.findOne({user_id: user_id}).exec(function(err, find){
            if(err){return console.log(err)}
            if(find){
                //Dieu kien xoa
                Users.destroy({user_id: user_id}).exec(function(err){
                    if(err){return console.log(err)}
                    return res.json({
                        status: 'success',
                        message: 'Xoa user thanh cong'
                    })
                });
            }else{
                return res.json({
                    status: 'error',
                    message: 'Khong tim thay user voi ID: ' + user_id
                })
            }
        })
    },
    bcryptjs:function(req, res){
        var s = "ma hoa chuoi";
        bcrypt.hash(s, 8, function(err, hash){
            console.log(hash);
            return;
        });
    },
    login: function (req, res) {    
        var user_email = req.param('user_email'),
            user_password = req.param('user_password');
        if (!user_email || user_email === '') {
            return res.json({
                status: 'error',
                message: 'Ban chua nhap email'
            });
        }
        if (!user_password || user_password === '') {
            return res.json({
                status: 'error',
                message: 'Ban chua nhap mat khau'
            });
        }
        Users.findOne({ user_email: user_email }).exec(function (err, find) {
            if (err) { return console.log(err) }
            if (find) {
                Users.comparePassword(user_password, find, function (err, valid) {
                    if (err) { return console.log(err) }
                    if (valid) {
                        return res.json({
                            status: 'success',
                            message: 'Dang nhap thanh cong',
                            token: jwt.mahoa(find.user_id)
                        })
                    } else {
                        return res.json({
                            status: 'error',
                            message: 'Mat khau khong dung'             
                        })
                    }
                })
            } else {
                return res.json({
                    status: 'error',
                    message: 'Email khong dung'
                })
            }
        });
    },
    user_change_password: function (req, res) {
        var user_id = req.param('user_id'),
            old_password = req.param('old_password'),
            new_password = req.param('new_password');

        if (!user_id || user_id === '' || user_id === 0) {
            return res.json({
                status: 'error',
                message: 'Ban chua nhap ID'
            })
        }
        
        if (!old_password || old_password === '') {
            return res.json({
                status: 'error',
                message: 'Ban chua nhap mat khau cu'
            })
        }
        if (!new_password || new_password === '') {
            return res.json({
                status: 'error',
                message: 'Ban chua nhap mat khau moi'
            })
        }
        Users.findOne({ user_id: user_id }).exec(function (err, find) {
            if (err) { return console.log(err) }
            console.log(find)
            if (find) {
                //Kiem tra mat khau cua id tim duoc
                //Tim duoc bat dau tao mat khau moi, truoc khi update phai ma hoa mk moi
                Users.comparePassword(old_password, find, function (err, valid) {
                    if (err) { return console.log(err) }
                    if (valid) {
                        bcrypt.genSalt(10, function (err, salt) {
                            bcrypt.hash(new_password, salt, function (err, hash) {
                                if (err) {
                                    return cb(err);
                                }
                                if (hash) {
                                    Users.update({ user_id: user_id }, { user_password: hash }).exec(function (err, updated) {
                                        if (err) {
                                            return cb(err);
                                        }
                                        if (updated) {
                                            return res.json({
                                                status: 'success',
                                                message: 'Cap nhat mat khau thanh cong'
                                            })
                                        }
                                    });
                                }
                            });
                        });
                    } else {
                        //Kiem tra mat khau cu nhung bi sai
                        return res.json({
                            status: 'error',
                            message: 'Mat khau cu khong dung'
                        })
                    }
                })
                //Khong tim thay
            } else {
                return res.json({
                    status: 'error',
                    message: 'ID khong dung'
                })
            }
        });
    },
    giaima: function(req, res){
      
    }

};


