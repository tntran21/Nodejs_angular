/**
 * StaffController
 *
 * @description :: Server-side logic for managing staff
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

//Khai bao de su dung moment: set kieu cua ngay sinh
const moment = require('moment');
module.exports = {
    staff_upload_avatar: function (req, res) {
        req.file('avatar').upload({
            dirname: require('path').resolve(sails.config.appPath, 'assets/uploads/avatar')
        }, function (err, uploadFiles) {
            if (err) {
                return console.log(err);
            }
            if (uploadFiles.length > 0) {
                //Chỉ lấy phần đuôi tên của hình.
                var avatar = require('path').basename(uploadFiles[0].fd);
                return res.json({
                    status: 'success',
                    message: 'Upload avatar thành công!',
                    avatar: avatar
                });
            }
        });
    },
    add_staff: function (req, res) {
        var staff_room_id = req.param('staff_room_id'),
            staff_position_id = req.param('staff_position_id'),
            staff_fullname = req.param('staff_fullname'),
            staff_birthday = req.param('staff_birthday'),
            staff_address = req.param('staff_address'),
            staff_phone = req.param('staff_phone'),
            staff_email = req.param('staff_email'),
            staff_sex = req.param('staff_sex'),
            staff_avatar = req.param('staff_avatar');
        // Phai validate tat ca gia tri
        if (!staff_room_id) {
            return res.json({
                status: 'error',
                message: 'Bạn chưa chọn phòng'
            });
        }
        if (!staff_position_id) {
            return res.json({
                status: 'error',
                message: 'Bạn chưa chọn vị trí'
            });
        }
        if (!staff_fullname || staff_fullname === '') {
            return res.json({
                status: 'error',
                message: 'Bạn chưa nhập họ tên'
            });
        }
        if (!staff_birthday || staff_birthday === '') {
            return res.json({
                status: 'error',
                message: 'Bạn chưa nhập ngày sinh'
            });
        }
        if (!staff_address || staff_address === '') {
            return res.json({
                status: 'error',
                message: 'Bạn chưa nhập địa chỉ'
            });
        }
        if (!staff_phone || staff_phone === '') {
            return res.json({
                status: 'error',
                message: 'Bạn chưa nhập số điện thoại'
            });
        }
        if (!staff_email || staff_email === '') {
            return res.json({
                status: 'error',
                message: 'Bạn chưa nhập Email'
            });
        }
        if (!staff_sex || staff_sex === '') {
            return res.json({
                status: 'error',
                message: 'Bạn chưa chọn giới tính'
            });
        }
        if (!staff_avatar || staff_avatar === '') {
            return res.json({
                status: 'error',
                message: 'Bạn chưa chọn hình đại diện'
            });
        }
        console.log('Chua format:' + staff_birthday);
        //cắt 01/05/2018 để chuyển sang dạng date yyyy-MM-dd
        //split('/') được mảng ['01','05','2018']
        let birthday = staff_birthday.split('/')[2] + "-" + staff_birthday.split('/')[1] + "-" + staff_birthday.split('/')[0];
        //Format birday
        staff_birthday = moment(birthday).format('YYYY-MM-DD');

        Staffs.create({
            staff_room_id,
            staff_position_id,
            staff_fullname,
            staff_birthday,
            staff_address,
            staff_phone,
            staff_email,
            staff_sex,
            staff_avatar
        }).exec(function (err, created) {
            if (err) { return console.log(err) }
            if (created) {
                return res.json({
                    status: 'success',
                    message: 'Thêm nhân viên thành công'
                });
            }
        });

    },
    list_staff: function (req, res) {
        var sql = 'SELECT staffs.staff_id, staffs.staff_fullname, staffs.staff_birthday, staffs.staff_address, staffs.staff_phone,staffs.staff_email, staffs.staff_sex,staffs.staff_avatar, staffs.createdAt, rooms.room_name AS staff_room_name,staff_room_id,staff_position_id, positions.position_name AS staff_position_name FROM staffs LEFT JOIN rooms ON staffs.staff_room_id  =rooms.room_id LEFT JOIN positions ON staffs.staff_position_id = positions.position_id';
        Staffs.query(sql, function (err, results) {
            if (err) { return console.log(err) }
            return res.json({
                status: 'success',
                message: 'Lấy danh sách nhân viên thành công',
                staffs: results
            })
        })
    },
    // update_staff: function (req, res) {
    //     var staff_id = req.param('staff_id'),
    //         update_fullname = req.param('update_fullname'),
    //         update_phone = req.param('update_phone'),
    //         update_birthday = req.param('update_birthday'),
    //         update_address = req.param('update_address'),
    //         update_position_id = req.param('update_position'),
    //         update_room_id = req.param('update_room'),
    //         update_sex = req.param('update_sex'),
    //         update_email = req.param('update_email'),
    //         update_avatar = req.param('update_avatar');
    //        var sql ='UPDATE `staffs` SET `staff_room_id`=[update_room_id],`staff_position_id`=[update_position_id],`staff_fullname`=[update_fullname],`staff_birthday`=[update_birthday],`staff_address`=[update_address],`staff_phone`=[update_phone],`staff_email`=[update_email],`staff_sex`=[update_sex],`staff_avatar`=[update_avatar] WHERE `staff_id`=[staff_id]';
    //        Staffs.query(sql, function(err, results){
    //            if(err){return console.log(err);}
    //            return  res.json({
    //                status: 'success',
    //                message: 'Staff updated'
    //            });    
    //        });
    // },
    staff_profile: function(req, res){
        var staff_id = req.param('staff_id');
        if (!staff_id || staff_id === '' || staff_id === 0) {
            return res.json({
                status: 'error',
                message: 'ID khong hop le'
            });
        }
        Staffs.findOne({ staff_id: staff_id }).exec(function (err, find) {
            if (err) { return console.log(err) }
            if (find) {
                return res.json({
                    status: 'success',
                    message: 'GET profile Staff thanh cong',
                    staff: find
                })
            } else {
                return res.json({
                    status: 'success',
                    message: 'Khong tim thay staff voi id: ' + staff_id
                })
            }
        });
    },
    delete_staff: function(req, res){
        var staff_id = req.param('staff_id');
        if(!staff_id || staff_id === 0 || staff_id === ''){
            return res.json({
                status:'error',
                message: 'ID khong hop le'
            });
        }
        Staffs.destroy({staff_id: staff_id}).exec(function(err){
            if(err){return console.log(err);}
            return res.json({
                status: 'success',
                message: 'Xoa nhan vien thanh cong'
            });
        })
    }


};

