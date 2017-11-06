var assert = require('assert');
var db = require("../../../database/mysql/db");
var roleId;
var userId;
var clientId = "3444";
describe('mysql DB user', function () {
    this.timeout(20000);
    describe('#connect()', function () {
        it('should connect to db and create pool', function (done) {
            db.connect("localhost", "admin", "admin", "ulbora_user_service", 5);
            db.testConnection(function (success) {
                if (success) {                    
                    assert(true);
                } else {
                    assert(false);
                }
                done();
            });
        });
    });
    
    describe('#addRole()', function () {
        it('should add a role in db', function (done) {
            var d = new Date();
            var json = {
                role: "tester1234role3"
            };
            setTimeout(function () {
                db.addRole(json, function (result) {
                    if (result.success) {
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
                username: "tester123455",
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
                db.addUser(json, function (result) {
                    if (result.success) {
                        userId = "tester123455";
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
                db.updateUserPassword(json, function (result) {
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
                db.updateUserEnabled(json, function (result) {
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
                roleId: roleId,
                username: userId,
                clientId: clientId
            };
            setTimeout(function () {
                db.updateUserInfo(json, function (result) {
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
                db.getUser(userId, clientId, function (result) {
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
                db.getUserList(function (result) {
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
                db.searchUserList(clientId, function (result) {
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
                db.deleteUser(userId, clientId, function (result) {
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

    describe('#deleteRole()', function () {
        it('should delete role', function (done) {
            setTimeout(function () {
                db.deleteRole(roleId, function (result) {
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

