/**
 * RoomController
 *
 * @description :: Server-side logic for managing rooms
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    add_rooms: function (req, res) {
        var room_name = req.param('room_name');
        if (!room_name || room_name === '') {
            return res.json({
                status: 'error',
                message: 'Bạn chưa nhập tên phòng'
            })
        }
        Rooms.create({ room_name: room_name }).exec(function (err, created) {
            if (err) { return console.log(err) }
            if (created) {
                return res.json({
                    status: 'success',
                    message: 'Tạo phòng thành công'
                })
            }
        });
    },
    get_rooms: function (req, res) {
        Rooms.find().exec(function (err, finds) {
            if (err) { return console.log(err) }
            if (finds) {
                return res.json({
                    status: 'success',
                    rooms: finds
                });
            }
        });
    },
    delete_room: function (req, res) {
        var room_id = req.param('room_id');
        if (!room_id || room_id === '') {
            return res.json({
                status: 'error',
                message: 'ID không hợp lệ'
            });
        }
        Rooms.destroy({ room_id: room_id }).exec(function (err) {
            if (err) { console.log(err) }
            return res.json({
                status: 'success',
                message: 'Xóa phòng thành công'
            });
        })
    },
};

