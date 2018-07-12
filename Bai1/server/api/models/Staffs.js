/**
 * Staffs.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    staff_id:{
      type: 'integer',
      primaryKey: true,
      autoIncrement: true,
    },
    staff_room_id:{
      type :'integer'
    },
    staff_position_id:{
      type: 'integer'
    },
    staff_fullname:{
      type: 'string',
      size: 50,
    },
    staff_birthday:{
      type: 'date',
    },
    staff_address:{
      type : 'string'
    },
    staff_phone:{
      type: 'string',
      size:15
    },
    staff_email:{
      type:'string',
      size: 50
    },
    staff_sex:{
      type: 'string',
      size: 10,
      defaultsTo: 'male',
      enum: ['male', 'female']
    },
    staff_avatar:{
      type:'string',
    },

  }
};

