/*     
 Copyright (C) 2016 Ulbora Labs LLC. (www.ulboralabs.com)
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

var crud = require("./crud/mysqlCrud");
var roleProcessor = require("./processors/roleProcessor");
var userProcessor = require("./processors/userProcessor");

exports.connect = function (host, user, pw, db, cpnum) {
    crud.connect(host, user, pw, db, cpnum);
    roleProcessor.init(crud);
    userProcessor.init(crud);
};
// for testing only
exports.testConnection = function (callback) {
    crud.testConnection(callback);
};

// for testing only
exports.getConnection = function (callback) {
    crud.getConnection(callback);
};

//role 
exports.addRole = function (json, callback) {
    roleProcessor.addRole(null, json, callback);
};

exports.getRole = function (id, callback) {
    roleProcessor.getRole(id, callback);
};

exports.getRoleList = function (callback) {
    roleProcessor.getRoleList(callback);
};

exports.deleteRole = function (id, callback) {
    roleProcessor.deleteRole(null, id, callback);
};

//end role

//user
exports.addUser = function (json, callback) {
    userProcessor.addUser(null, json, callback);
};

exports.updateUserPassword = function (json, callback) {
    userProcessor.updateUserPassword(null, json, callback);
};

exports.updateUserEnabled = function (json, callback) {
    userProcessor.updateUserEnabled(null, json, callback);
};

exports.updateUserInfo = function (json, callback) {
    userProcessor.updateUserInfo(null, json, callback);
};


exports.getUser = function (username, clientId, callback) {
    userProcessor.getUser(username, clientId, callback);
};

exports.getUserList = function (callback) {
    userProcessor.getUserList(callback);
};


exports.searchUserList = function (clientId, callback) {
    userProcessor.searchUserList(clientId, callback);
};

exports.deleteUser = function (username, clientId, callback) {
    userProcessor.deleteUser(null, username, clientId, callback);
};

//end user