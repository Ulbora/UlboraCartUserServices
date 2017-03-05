var assert = require('assert');
var db = require("../../database/db");
var roleId;

describe('DB role', function () {
    this.timeout(20000);
    describe('#connect()', function () {
        it('should connect to db and create pool', function (done) {
            db.connect("localhost", "admin", "admin", "ulbora_user_service", 5);    
            setTimeout(function () {
                done();
            }, 1000);
        });
    });
    
    describe('#addRole()', function () {
        it('should add a role in db', function (done) {
            var d = new Date();
            var json = {
                role: "tester1234role4"
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

     

    describe('#getRole()', function () {
        it('should get role in db', function (done) {
            setTimeout(function () {
                db.getRole(roleId, function (result) {
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
        it('should get role list in processor', function (done) {
            setTimeout(function () {
                db.getRoleList(function (result) {
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

