var assert = require('assert');
var db = require("../../database/db");
var roleService = require("../../services/roleService");
var userService = require("../../services/userService");
var tokenFile = require("./token");
// for this tests to pass, the tokenFile needs to be updated with a new token 
var token = tokenFile.token;
var roleId;
var userId;

describe('userService', function () {
    this.timeout(20000);
    describe('#init()', function () {
        it('should init manager', function (done) {
            db.connect("localhost", "admin", "admin", "ulbora_user_service", 5);
            setTimeout(function () {
                roleService.init(db);
                userService.init(db);
                done();
            }, 1000);
        });
    });


    describe('#add()', function () {
        it('should add a role', function (done) {
            setTimeout(function () {
                var req = {};
                var header = function (val) {
                    if (val === "Authorization") {
                        return "Bearer " + token;
                    } else if (val === "userId") {
                        return undefined;
                    } else if (val === "clientId") {
                        return "403";
                    }
                };
                req.header = header;
                req.protocol = "https";
                req.hostname = "abc.com";
                req.body = {
                    role: "tester1234role45667"
                };
                req.is = function (val) {
                    if (val === 'application/json') {
                        return true;
                    } else {
                        return false;
                    }
                };
                var res = {};
                res.statusCode;
                res.status = function (val) {
                    this.statusCode = val;
                    console.log("res status: " + val);
                };
                res.send = function (val) {
                    if (this.statusCode === 401) {
                        assert(false);
                    } else if (val && val.id) {
                        clientObj = val;
                        roleId = val.id;
                        console.log("add role reaponse: " + JSON.stringify(val));
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                };
                roleService.add(req, res);
            }, 1000);
        });
    });


    describe('#addUser()', function () {
        it('should add a user', function (done) {
            setTimeout(function () {
                var d = new Date();
                var req = {};
                var header = function (val) {
                    if (val === "Authorization") {
                        return "Bearer " + token;
                    } else if (val === "userId") {
                        return undefined;
                    } else if (val === "clientId") {
                        return "403";
                    }
                };
                req.header = header;
                req.protocol = "https";
                req.hostname = "abc.com";
                req.body = {
                    username: "tester123455677ff",
                    password: "tester",
                    enabled: true,
                    dateEntered: d,
                    emailAddress: "bob@bob.com",
                    firstName: "bob",
                    lastName: "hope",
                    roleId: roleId,
                    clientId: "4454"
                };
                req.is = function (val) {
                    if (val === 'application/json') {
                        return true;
                    } else {
                        return false;
                    }
                };
                var res = {};
                res.statusCode;
                res.status = function (val) {
                    this.statusCode = val;
                    console.log("res status: " + val);
                };
                res.send = function (val) {
                    if (this.statusCode === 401) {
                        assert(false);
                    } else if (val && val.success) {
                        userId = val.username;
                        console.log("add user reaponse: " + JSON.stringify(val));
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                };
                userService.add(req, res);
            }, 1000);
        });
    });

    describe('#updateUser()', function () {
        it('should change a user password', function (done) {
            setTimeout(function () {

                var req = {};
                var header = function (val) {
                    if (val === "Authorization") {
                        return "Bearer " + token;
                    } else if (val === "userId") {
                        return undefined;
                    } else if (val === "clientId") {
                        return "403";
                    }
                };
                req.header = header;
                req.protocol = "https";
                req.hostname = "abc.com";
                req.body = {
                    username: "tester123455677ff",
                    password: "tester2"
                };
                req.is = function (val) {
                    if (val === 'application/json') {
                        return true;
                    } else {
                        return false;
                    }
                };
                var res = {};
                res.statusCode;
                res.status = function (val) {
                    this.statusCode = val;
                    console.log("res status: " + val);
                };
                res.send = function (val) {
                    if (this.statusCode === 401) {
                        assert(false);
                    } else if (val && val.success) {
                        console.log("update user reaponse: " + JSON.stringify(val));
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                };
                userService.update(req, res);
            }, 1000);
        });
    });


    describe('#login()', function () {
        it('should login a user', function (done) {
            setTimeout(function () {

                var req = {};

                req.body = {
                    username: "tester123455677ff",
                    password: "tester2"
                };
                req.is = function (val) {
                    if (val === 'application/json') {
                        return true;
                    } else {
                        return false;
                    }
                };
                var res = {};
                res.statusCode;
                res.status = function (val) {
                    this.statusCode = val;
                    console.log("res status: " + val);
                };
                res.send = function (val) {
                    console.log("login user reaponse: " + JSON.stringify(val));
                    if (this.statusCode === 401) {
                        assert(false);
                    } else if (val && val.valid) {
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                };
                userService.login(req, res);
            }, 1000);
        });
    });

    describe('#updateUser()', function () {
        it('should disable a user', function (done) {
            setTimeout(function () {

                var req = {};
                var header = function (val) {
                    if (val === "Authorization") {
                        return "Bearer " + token;
                    } else if (val === "userId") {
                        return undefined;
                    } else if (val === "clientId") {
                        return "403";
                    }
                };
                req.header = header;
                req.protocol = "https";
                req.hostname = "abc.com";
                req.body = {
                    username: "tester123455677ff",
                    enabled: false,
                };
                req.is = function (val) {
                    if (val === 'application/json') {
                        return true;
                    } else {
                        return false;
                    }
                };
                var res = {};
                res.statusCode;
                res.status = function (val) {
                    this.statusCode = val;
                    console.log("res status: " + val);
                };
                res.send = function (val) {
                    if (this.statusCode === 401) {
                        assert(false);
                    } else if (val && val.success) {
                        console.log("update user reaponse: " + JSON.stringify(val));
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                };
                userService.update(req, res);
            }, 1000);
        });
    });



    describe('#login()', function () {
        it('should fail to login a user that is disabled', function (done) {
            setTimeout(function () {

                var req = {};

                req.body = {
                    username: "tester123455677ff",
                    password: "tester2"
                };
                req.is = function (val) {
                    if (val === 'application/json') {
                        return true;
                    } else {
                        return false;
                    }
                };
                var res = {};
                res.statusCode;
                res.status = function (val) {
                    this.statusCode = val;
                    console.log("res status: " + val);
                };
                res.send = function (val) {
                    console.log("login user reaponse: " + JSON.stringify(val));
                    if (this.statusCode === 401) {
                        assert(false);
                    } else if (val && val.valid) {
                        assert(false);
                    } else {
                        assert(true);
                    }
                    done();
                };
                userService.login(req, res);
            }, 1000);
        });
    });


    describe('#updateUser()', function () {
        it('should udate a user info', function (done) {
            setTimeout(function () {
                var req = {};
                var header = function (val) {
                    if (val === "Authorization") {
                        return "Bearer " + token;
                    } else if (val === "userId") {
                        return undefined;
                    } else if (val === "clientId") {
                        return "403";
                    }
                };
                req.header = header;
                req.protocol = "https";
                req.hostname = "abc.com";
                req.body = {
                    username: "tester123455677ff",
                    firstName: "robert",
                    lastName: "johnson",
                    emailAddress: "sims@sims.com"
                };
                req.is = function (val) {
                    if (val === 'application/json') {
                        return true;
                    } else {
                        return false;
                    }
                };
                var res = {};
                res.statusCode;
                res.status = function (val) {
                    this.statusCode = val;
                    console.log("res status: " + val);
                };
                res.send = function (val) {
                    if (this.statusCode === 401) {
                        assert(false);
                    } else if (val && val.success) {
                        console.log("update user reaponse: " + JSON.stringify(val));
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                };
                userService.update(req, res);
            }, 1000);
        });
    });


    describe('#get()', function () {
        it('should get a role', function (done) {
            setTimeout(function () {
                var req = {};
                var header = function (val) {
                    if (val === "Authorization") {
                        return "Bearer " + token;
                    } else if (val === "userId") {
                        return undefined;
                    } else if (val === "clientId") {
                        return "403";
                    }
                };
                req.header = header;
                req.protocol = "https";
                req.hostname = "abc.com";
                req.params = {};
                req.params.username = userId;
                var res = {};
                res.statusCode;
                res.status = function (val) {
                    this.statusCode = val;
                    console.log("res status: " + val);
                };
                res.send = function (val) {
                    if (this.statusCode === 401) {
                        assert(false);
                    } else if (val && val.username && val.lastName === "johnson" && val.enabled === false) {
                        console.log("get role reaponse: " + JSON.stringify(val));
                        assert(true);
                    }
                    done();
                };
                userService.get(req, res);
            }, 1000);
        });
    });



    describe('#list()', function () {
        it('should get a list of users', function (done) {
            setTimeout(function () {
                var req = {};
                var header = function (val) {
                    if (val === "Authorization") {
                        return "Bearer " + token;
                    } else if (val === "userId") {
                        return undefined;
                    } else if (val === "clientId") {
                        return "403";
                    }
                };
                req.header = header;
                req.protocol = "https";
                req.hostname = "abc.com";
                var res = {};
                res.statusCode;
                res.status = function (val) {
                    this.statusCode = val;
                    console.log("res status: " + val);
                };
                res.send = function (val) {
                    if (this.statusCode === 401) {
                        assert(false);
                    } else if (val.length > 0) {
                        console.log("get user list reaponse: " + JSON.stringify(val));
                        assert(true);
                    }
                    done();
                };
                userService.list(req, res);
            }, 1000);
        });
    });



    describe('#deleteUser()', function () {
        it('should delete a user', function (done) {
            setTimeout(function () {
                var req = {};
                var header = function (val) {
                    if (val === "Authorization") {
                        return "Bearer " + token;
                    } else if (val === "userId") {
                        return undefined;
                    } else if (val === "clientId") {
                        return "403";
                    }
                };
                req.header = header;
                req.protocol = "https";
                req.hostname = "abc.com";
                req.params = {};
                req.params.id = userId;
                var res = {};
                res.statusCode;
                res.status = function (val) {
                    this.statusCode = val;
                    console.log("res status: " + val);
                };
                res.send = function (val) {
                    if (this.statusCode === 401) {
                        assert(false);
                    } else if (val && val.success) {
                        console.log("delete user reaponse: " + JSON.stringify(val));
                        assert(true);
                    }
                    done();
                };
                userService.delete(req, res);
            }, 1000);
        });
    });



    describe('#delete()', function () {
        it('should delete a role', function (done) {
            setTimeout(function () {
                var req = {};
                var header = function (val) {
                    if (val === "Authorization") {
                        return "Bearer " + token;
                    } else if (val === "userId") {
                        return undefined;
                    } else if (val === "clientId") {
                        return "403";
                    }
                };
                req.header = header;
                req.protocol = "https";
                req.hostname = "abc.com";
                req.params = {};
                req.params.id = roleId;
                var res = {};
                res.statusCode;
                res.status = function (val) {
                    this.statusCode = val;
                    console.log("res status: " + val);
                };
                res.send = function (val) {
                    if (this.statusCode === 401) {
                        assert(false);
                    } else if (val && val.success) {
                        console.log("delete role reaponse: " + JSON.stringify(val));
                        assert(true);
                    }
                    done();
                };
                roleService.delete(req, res);
            }, 1000);
        });
    });

});


