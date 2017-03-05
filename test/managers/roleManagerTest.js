var assert = require('assert');
var db = require("../../database/db");
var roleManager = require("../../managers/roleManager");
var roleId;
describe('Role Manager', function () {
    this.timeout(20000);
    describe('#init()', function () {
        it('should init manager', function (done) {
            db.connect("localhost", "admin", "admin", "ulbora_user_service", 5);
            setTimeout(function () {
                roleManager.init(db);
                done();
            }, 1000);
        });
    });
    
    
    
    describe('#addRole()', function () {
        it('should add a role in manager', function (done) {
            var d = new Date();
            var json = {
                role: "tester1234role45"
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

     

    describe('#getRole()', function () {
        it('should get role in manager', function (done) {
            setTimeout(function () {
                roleManager.getRole(roleId, function (result) {
                    if (result && result.id > -1) {
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                });
            }, 1000);
        });
    });


    describe('#getRoleList()', function () {
        it('should get role list in manager', function (done) {
            setTimeout(function () {
                roleManager.getRoleList(function (result) {
                    console.log("role list: " + JSON.stringify(result));
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



