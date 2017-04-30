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

var manager = require("./manager");

var db;

exports.init = function (database) {
    db = database;
};


exports.addUser = function (json, callback) {
    var returnVal = {
        success: false,
        message: ""
    };
    var isOk = manager.securityCheck(json);
    if (isOk) {
        if (json.username && json.password) {
            manager.hashPassword(json.username, json.password, function (err, key) {
                if (!err && key) {
                    console.log("password hash : " + key.toString('base64'));
                    json.password = key.toString('base64');
                    var d = new Date();
                    json.dateEntered = d;
                    db.addUser(json, function (result) {
                        if (result && result.success) {
                            returnVal.success = result.success;
                            returnVal.username = json.username;
                            callback(returnVal);
                        } else {
                            callback(returnVal);
                        }
                    });
                } else {
                    console.error("password hash error: " + err);
                    callback(returnVal);
                }
            });
        } else {
            callback(returnVal);
        }
    } else {
        callback(returnVal);
    }
};

exports.updateUserPassword = function (json, callback) {
    var returnVal = {
        success: false,
        message: ""
    };
    var isOk = manager.securityCheck(json);
    if (isOk) {
        if (json.username && json.password) {
            manager.hashPassword(json.username, json.password, function (err, key) {
                if (!err && key) {
                    console.log("password hash : " + key.toString('base64'));
                    json.password = key.toString('base64');
                    db.updateUserPassword(json, function (result) {
                        if (result && result.success) {
                            returnVal.success = result.success;
                            callback(returnVal);
                        } else {
                            callback(returnVal);
                        }
                    });
                } else {
                    console.error("password hash error: " + err);
                    callback(returnVal);
                }
            });
        } else {
            callback(returnVal);
        }
    } else {
        callback(returnVal);
    }
};

exports.updateUserEnabled = function (json, callback) {
    var returnVal = {
        success: false,
        message: ""
    };
    var isOk = manager.securityCheck(json);
    if (isOk) {
        if (json.username && json.enabled !== null && json.enabled !== undefined) {
            db.updateUserEnabled(json, function (result) {
                if (result && result.success) {
                    returnVal.success = result.success;
                    callback(returnVal);
                } else {
                    callback(returnVal);
                }
            });
        } else {
            callback(returnVal);
        }
    } else {
        callback(returnVal);
    }
};

exports.updateUserInfo = function (json, callback) {
    var returnVal = {
        success: false,
        message: ""
    };
    var isOk = manager.securityCheck(json);
    if (isOk) {
        if (json.username) {
            db.updateUserInfo(json, function (result) {
                if (result && result.success) {
                    returnVal.success = result.success;
                    callback(returnVal);
                } else {
                    callback(returnVal);
                }
            });
        } else {
            callback(returnVal);
        }
    } else {
        callback(returnVal);
    }
};

exports.getUser = function (username, callback) {
    var isOk = manager.securityCheck(username);
    if (isOk) {
        db.getUser(username, function (result) {
            if (result) {
                delete result.password;
                callback(result);
            } else {
                callback({});
            }
        });
    } else {
        callback({});
    }
};

exports.getUserList = function (callback) {
    db.getUserList(callback);
};

exports.deleteUser = function (username, callback) {
    var returnVal = {
        success: false,
        message: ""
    };
    var isOk = manager.securityCheck(username);
    if (isOk) {
        db.deleteUser(username, callback);
    } else {
        callback(returnVal);
    }
};



exports.validateUser = function (username, password, callback) {
    var rtn = {
        valid: false
    };
    var isOk = manager.securityCheck(username);
    var isOk2 = manager.securityCheck(password);
    if (isOk && isOk2) {
        if (username && password) {
            db.getUser(username, function (result) {
                console.log("user to validate: " + JSON.stringify(result));
                if (result) {
                    manager.hashPassword(username, password, function (err, key) {
                        if (!err && key) {
                            var encpw = key.toString('base64');
                            console.log("pw to validate: " + encpw);
                            console.log("pw for user: " + result.password);
                            if(encpw === result.password && result.enabled){
                                rtn.valid = true;
                                rtn.code = result.clientId;
                            }
                            callback(rtn);
                        } else {
                            console.error(err);
                            callback(rtn);
                        }
                    });                    
                } else {
                    callback(rtn);
                }
            });
        } else {
            callback(rtn);
        }
    } else {
        callback(rtn);
    }
};
