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

//client operations---------------------------------------
var userQueries = require("../queries/userQueries");
var crud;
exports.init = function (c) {
    crud = c;
};
exports.addUser = function (con, json, callback) {
    var args = {
        username: json.username,
        password: json.password,
        enabled: json.enabled,
        date_entered: json.dateEntered,
        email_address: json.emailAddress,
        first_name: json.firstName,
        last_name: json.lastName,
        role_id: json.roleId,
        client_id: json.clientId
    };
    crud.insertNoId(con, userQueries.USER_INSERT_QUERY, args, function (result) {
        var rtn = {
            success: result.success,
            message: result.message
        };
        callback(rtn);
    });
};

exports.updateUserPassword = function (con, json, callback) {
    var args = [
        json.password,
        json.username,
        json.clientId
    ];
    crud.update(con, userQueries.USER_PASSWORD_UPDATE_QUERY, args, callback);
};

exports.updateUserEnabled = function (con, json, callback) {
    var args = [
        json.enabled,
        json.username,
        json.clientId
    ];
    crud.update(con, userQueries.USER_ENABLE_UPDATE_QUERY, args, callback);
};

exports.updateUserInfo = function (con, json, callback) {
    var args = [
        json.firstName,
        json.lastName,
        json.emailAddress,
        json.username,
        json.clientId
    ];
    crud.update(con, userQueries.USER_INFO_UPDATE_QUERY, args, callback);
};


exports.getUser = function (username, clientId, callback) {
    var queryId = [username, clientId];
    crud.get(userQueries.USER_GET_BY_USERNAME_QUERY, queryId, function (result) {
        if (result.success && result.data.length > 0) {
            var rtn = {
                username: result.data[0].username,
                password: result.data[0].password,
                enabled: (result.data[0].enabled === 1) ? true : false,
                dateEntered: result.data[0].date_entered,
                emailAddress: result.data[0].email_address,
                firstName: result.data[0].first_name,
                lastName: result.data[0].last_name,
                roleId: result.data[0].role_id,
                clientId: result.data[0].client_id
            };
            callback(rtn);
        } else {
            callback(null);
        }
    });
};

exports.getUserList = function (callback) {
    crud.getList(userQueries.USER_LIST_QUERY, function (result) {
        if (result.success && result.data.length > 0) {
            var rtnList = [];
            for (var cnt = 0; cnt < result.data.length; cnt++) {
                var rtn = {
                    username: result.data[cnt].username,
                    clientId: result.data[cnt].client_id,
                    firstName: result.data[cnt].first_name,
                    lastName: result.data[cnt].last_name,
                    enabled: (result.data[0].enabled === 1) ? true : false

                };
                rtnList.push(rtn);
            }
            callback(rtnList);
        } else {
            callback(rtnList);
        }
    });
};


exports.searchUserList = function (clientId, callback) {
    var queryId = [clientId];
    crud.get(userQueries.USER_SEARCH_LIST_QUERY, queryId, function (result) {
        if (result.success && result.data.length > 0) {
            var rtnList = [];
            for (var cnt = 0; cnt < result.data.length; cnt++) {
                var rtn = {
                    username: result.data[cnt].username,
                    clientId: result.data[cnt].client_id,
                    firstName: result.data[cnt].first_name,
                    lastName: result.data[cnt].last_name,
                    enabled: (result.data[0].enabled === 1) ? true : false

                };
                rtnList.push(rtn);
            }
            callback(rtnList);
        } else {
            callback(rtnList);
        }
    });
};

exports.deleteUser = function (con, userId, clientId, callback) {
    var queryId = [userId, clientId];
    crud.delete(con, userQueries.USER_DELETE_QUERY, queryId, callback);
};
