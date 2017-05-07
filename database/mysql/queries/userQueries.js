/*     
 Copyright (C) 2016 Ulbora Labs Inc. (www.ulboralabs.com)
 All rights reserved.
 
 Copyright (C) 2016 Ken Williamson
 All rights reserved.
 
 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU Affero General Public License as published
 by the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.
 
 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU Affero General Public License for more details.
 
 You should have received a copy of the GNU Affero General Public License
 along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

//client   
exports.USER_INSERT_QUERY = "INSERT INTO user Set ?";
exports.USER_PASSWORD_UPDATE_QUERY = "UPDATE user SET password = ? " +
                                     "WHERE username = ? and client_id = ? ";
exports.USER_ENABLE_UPDATE_QUERY = "UPDATE user SET enabled = ? " +
                                   "WHERE username = ? and client_id = ? ";
exports.USER_INFO_UPDATE_QUERY = "UPDATE user SET first_name = ?, last_name = ?, email_address = ? " +
                                 "WHERE username = ? and client_id = ? ";
exports.USER_GET_BY_USERNAME_QUERY = "SELECT * FROM user WHERE username = ? and client_id = ? ";
exports.USER_DELETE_QUERY = "DELETE FROM user WHERE username = ? and client_id = ? ";
exports.USER_LIST_QUERY = "SELECT username, first_name, last_name, enabled, client_id " +
                          "FROM user " +
                          "order by client_id ";
