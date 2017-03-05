var assert = require('assert');
var db = require("../../database/db");
var roleManager = require("../../managers/roleManager");
var userManager = require("../../managers/userManager");
var roleId;
describe('User Manager', function () {
    this.timeout(20000);
    describe('#init()', function () {
        it('should init manager', function (done) {
            db.connect("localhost", "admin", "admin", "ulbora_user_service", 5);
            setTimeout(function () {
                roleManager.init(db);
                userManager.init(db);
                done();
            }, 1000);
        });
    });
        
    
    describe('#addRole()', function () {
        it('should add a role in manager', function (done) {
            var d = new Date();
            var json = {
                role: "tester1234role4577"
            };
            setTimeout(function () {
                roleManager.addRole(json, function (result) {
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
        it('should add a user in manager', function (done) {
            var d = new Date();
            var json = {
                username: "tester123455677",
                password: "tester",
                enabled: true,
                dateEntered: d,
                emailAddress: "bob@bob.com",
                firstName: "bob",
                lastName: "hope",
                roleId: roleId,
                clientId: "4454"
            };
            setTimeout(function () {
                userManager.addUser(json, function (result) {
                    if (result.success) {
                        userId = "tester123455677";
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
        it('should fail to add a douplicate user in manager', function (done) {
            var d = new Date();
            var json = {
                username: "tester123455677",
                password: "tester",
                enabled: true,
                dateEntered: d,
                emailAddress: "bob@bob.com",
                firstName: "bob",
                lastName: "hope",
                roleId: roleId,
                clientId: "4454"
            };
            setTimeout(function () {
                userManager.addUser(json, function (result) {
                    if (result.success) {                        
                        assert(false);
                    } else {
                        assert(true);
                    }
                    done();
                });
            }, 1000);
        });
    });
    
    
    describe('#updateUserPassword()', function () {
        it('should chang password of a user in manager', function (done) {
            var d = new Date();
            var json = {
                username: "tester123455677",
                password: "tester22"
                
            };
            setTimeout(function () {
                userManager.updateUserPassword(json, function (result) {
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
        it('should disable a user in manager', function (done) {
            var json = {
                enabled: false,
                username: userId
            };
            setTimeout(function () {
                userManager.updateUserEnabled(json, function (result) {
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
                username: userId
            };
            setTimeout(function () {
                userManager.updateUserInfo(json, function (result) {
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
        it('should get user in manager', function (done) {
            setTimeout(function () {
                userManager.getUser(userId, function (result) {
                    console.log("user to found: " + JSON.stringify(result));
                    if (result && result.lastName === "sims" && result.enabled === false && result.password === undefined) {
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                });
            }, 1000);
        });
    });
    
    
    describe('#validateUser()', function () {
        it('should validate user in manager', function (done) {
            setTimeout(function () {
                userManager.validateUser(userId, "tester22", function (result) {
                    if (result && result.valid === true) {
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
                userManager.getUserList(function (result) {
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
    
    describe('#deleteUser()', function () {
        it('should delete user in manager', function (done) {
            setTimeout(function () {
                userManager.deleteUser(userId, function (result) {
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
        it('should delete role in manager', function (done) {
            setTimeout(function () {
                roleManager.deleteRole(roleId, function (result) {
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



