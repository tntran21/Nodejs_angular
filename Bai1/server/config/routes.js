/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  //user controller
  'POST /users/user': 'UsersController.user_create',
  'GET /users/user': 'UsersController.user_profile',
  'PUT /users/user': 'UsersController.user_update',
  'DELETE /users/user': 'UsersController.user_delete',

  'POST /users/brypt': 'UsersController.bcryptjs',
  'POST /users/login': 'UsersController.login',
  'POST /users/updatepassword': 'UsersController.user_change_password',

  'POST /test': 'UsersController.giaima',

  //PositionController

  'POST /positions/add-position': 'PositionController.add_position',
  'GET /positions': 'PositionController.get_positions',
  'DELETE /positions/del-position': 'PositionController.delete_position',

  ///RoomController
  'POST /rooms/add-room': 'RoomController.add_rooms',
  'GET /room': 'RoomController.get_rooms',
  'DELETE /room/del-room': 'RoomController.delete_room',
  ///StaffController
  'POST /staffs/upload-avatar': 'StaffController.staff_upload_avatar',
  'POST /staffs/add-staff': 'StaffController.add_staff',
  'GET /staffs/list-staff': 'StaffController.list_staff',
  'GET /staffs/staff-profile': 'StaffController.staff_profile',
  'PUT /staffs/staff-update:': 'StaffController.update_staff',
  'DELETE /staffs/del-staff': 'StaffController.delete_staff',


  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

};
