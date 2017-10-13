var assert = require('assert');
var crud = require("../../../../database/mysql/crud/mysqlCrud");
var userProcessor = require("../../../../database/mysql/processors/userProcessor");
var userId;
var roleId;
var clientId = "2442";
describe('UserProcessor', function () {
    this.timeout(6000);
    describe('#connect()', function () {
        it('should connect to db and create pool', function (done) {
            crud.connect("localhost", "admin", "admin", "ulbora_user_service", 5);
            crud.testConnection(function (success) {
                if (success) {
                    userProcessor.init(crud);
                    assert(true);
                } else {
                    assert(false);
                }
                done();
            });
        });
    });


    describe('#insert()', function () {
        it('should insert into db', function (done) {
            var q = "INSERT INTO role Set ?";
            var args = {
                role: 'testRole2'
            };
            setTimeout(function () {
                crud.insert(null, q, args, function (result) {
                    console.log("add role: " + JSON.stringify(result));
                    if (result.id > -1) {
                        roleId = result.id;
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                });
            }, 1000);
        });
    });


    describe('#addUser()', function () {
        it('should add a user in userProcessor', function (done) {
            var d = new Date();
            var json = {
                username: "tester1234",
                password: "tester",
                enabled: true,
                dateEntered: d,
                emailAddress: "bob@bob.com",
                firstName: "bob",
                lastName: "hope",
                roleId: roleId,
                clientId: clientId
            };
            setTimeout(function () {
                userProcessor.addUser(null, json, function (result) {
                    if (result.success) {
                        userId = "tester1234";
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                });
            }, 1000);
        });
    });

    describe('#updateUserPassword()', function () {
        it('should update user password in processor', function (done) {

            var json = {
                password: 'newpassword',
                username: userId,
                clientId: clientId
            };
            setTimeout(function () {
                userProcessor.updateUserPassword(null, json, function (result) {
                    if (result.success) {
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                });
            }, 1000);
        });
    });

    describe('#updateUserEnabled()', function () {
        it('should disable a user in processor', function (done) {

            var json = {
                enabled: false,
                username: userId,
                clientId: clientId
            };
            setTimeout(function () {
                userProcessor.updateUserEnabled(null, json, function (result) {
                    if (result.success) {
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                });
            }, 1000);
        });
    });

    describe('#updateUserInfo()', function () {
        it('should update user info in processor', function (done) {

            var json = {
                firstName: "robert",
                lastName: "sims",
                emailAddress: "sims@sims.com",
                username: userId,
                clientId: clientId
            };
            setTimeout(function () {
                userProcessor.updateUserInfo(null, json, function (result) {
                    if (result.success) {
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                });
            }, 1000);
        });
    });


    describe('#getUser()', function () {
        it('should get user in processor', function (done) {
            setTimeout(function () {
                userProcessor.getUser(userId, clientId, function (result) {
                    if (result && result.lastName === "sims" && result.enabled === false) {
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                });
            }, 1000);
        });
    });


    describe('#getUserList()', function () {
        it('should get user list in processor', function (done) {
            setTimeout(function () {
                userProcessor.getUserList(function (result) {
                    console.log("user list: " + JSON.stringify(result));
                    if (result && result.length > 0) {
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                });
            }, 1000);
        });
    });
    
    
    describe('#searchUserList()', function () {
        it('should search user list in processor', function (done) {
            setTimeout(function () {
                userProcessor.searchUserList(clientId, function (result) {
                    console.log("user searched list: " + JSON.stringify(result));
                    if (result && result.length > 0) {
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                });
            }, 1000);
        });
    });

    describe('#deleteUser()', function () {
        it('should delete client', function (done) {
            setTimeout(function () {
                userProcessor.deleteUser(null, userId, clientId, function (result) {
                    if (result.success) {
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                });
            }, 1000);
        });
    });

    describe('#delete()', function () {
        it('should delete row from db', function (done) {
            var q = "DELETE FROM role WHERE id = ?";
            var queryId = [roleId];
            setTimeout(function () {
                crud.delete(null, q, queryId, function (result) {
                    if (result.success) {
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                });
            }, 1000);
        });
    });

});

