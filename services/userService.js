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

var userManager = require("../managers/userManager");
var constants = require("../constants/constants");
var oauth2 = require("ulbora-oauth2");
var validationUrl = process.env.OAUTH2_VALIDATION_URI || constants.OAUTH2_VALIDATION_URI;

var db;

exports.init = function (database) {
    db = database;
    userManager.init(db);
};

exports.add = function (req, res) {
    if (req.is('application/json')) {
        var me = {
            role: "superAdmin",
            uri: "/ulbora/rs/user/add",
            scope: "write"
        };
        oauth2.authorize(req, res, me, validationUrl, function () {
            var reqBody = req.body;
            //var bodyJson = JSON.stringify(reqBody);
            //console.log("body: " + bodyJson);
            userManager.addUser(reqBody, function (result) {
                res.send(result);
            });
        });
    } else {
        res.status(415);
        res.send({success: false});
    }
};

exports.update = function (req, res) {
    if (req.is('application/json')) {
        var me = {
            role: "superAdmin",
            uri: "/ulbora/rs/user/update",
            scope: "write"
        };
        oauth2.authorize(req, res, me, validationUrl, function () {
            var reqBody = req.body;
            //var bodyJson = JSON.stringify(reqBody);
            //console.log("body: " + bodyJson);
            if (reqBody.password) {
                userManager.updateUserPassword(reqBody, function (result) {
                    res.send(result);
                });
            } else if (reqBody.enabled !== undefined) {
                userManager.updateUserEnabled(reqBody, function (result) {
                    res.send(result);
                });
            } else {
                userManager.updateUserInfo(reqBody, function (result) {
                    res.send(result);
                });
            }
        });
    } else {
        res.status(415);
        res.send({success: false});
    }
};


exports.get = function (req, res) {
    console.log("in auth callback");
    var me = {
        role: "superAdmin",
        uri: "/ulbora/rs/user/get",
        scope: "read"
    };
    oauth2.authorize(req, res, me, validationUrl, function () {
        var id = req.params.username;
        var clientId = req.params.clientId;
        if (id !== null && id !== undefined && clientId !== null && clientId !== undefined) {
            userManager.getUser(id, clientId, function (result) {
                res.send(result);
            });
        } else {
            res.send({});
        }
    });
};

exports.list = function (req, res) {
    var me = {
        role: "superAdmin",
        uri: "/ulbora/rs/user/list",
        scope: "read"
    };
    oauth2.authorize(req, res, me, validationUrl, function () {
        //console.log("in auth callback");
        userManager.getUserList(function (result) {
            res.send(result);
        });
    });
};


exports.search = function (req, res) {
    console.log("in auth callback");
    var me = {
        role: "superAdmin",
        uri: "/ulbora/rs/user/search",
        scope: "read"
    };
    oauth2.authorize(req, res, me, validationUrl, function () {       
        var clientId = req.params.clientId;
        if (clientId !== null && clientId !== undefined) {
            userManager.searchUserList(clientId, function (result) {
                res.send(result);
            });
        } else {
            res.send([]);
        }
    });
};


exports.delete = function (req, res) {
    console.log("in auth callback");
    var me = {
        role: "superAdmin",
        uri: "/ulbora/rs/user/delete",
        scope: "write"
    };
    oauth2.authorize(req, res, me, validationUrl, function () {
        var id = req.params.username;
        var clientId = req.params.clientId;
        if (id !== null && id !== undefined && clientId !== null && clientId !== undefined) {
            userManager.deleteUser(id, clientId, function (result) {
                res.send(result);
            });
        } else {
            res.send({success: false});
        }
    });
};


exports.login = function (req, res) {
    if (req.is('application/json')) {
        var reqBody = req.body;
        //var bodyJson = JSON.stringify(reqBody);
        //console.log("body: " + bodyJson);
        if (reqBody.username && reqBody.password && reqBody.clientId) {
            userManager.validateUser(reqBody.username, reqBody.password, reqBody.clientId, function (result) {
                res.send(result);
            });
        } else {
            res.status(500);
            res.send({valid: false});
        }
    } else {
        res.status(415);
        res.send({valid: false});
    }
};
