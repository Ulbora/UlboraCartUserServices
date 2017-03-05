var assert = require('assert');
var crud = require("../../../../database/mysql/crud/mysqlCrud");
var roleProcessor = require("../../../../database/mysql/processors/roleProcessor");
var roleId;
describe('RoleProcessor', function () {
    this.timeout(6000);
    describe('#connect()', function () {
        it('should connect to db and create pool', function (done) {
            crud.connect("localhost", "admin", "admin", "ulbora_user_service", 5);
            crud.testConnection(function (success) {
                if (success) {
                    roleProcessor.init(crud);
                    assert(true);
                } else {
                    assert(false);
                }
                done();
            });
        });
    });


    describe('#addRole()', function () {
        it('should add a role in Processor', function (done) {
            var d = new Date();
            var json = {
                role: "tester1234role"
            };
            setTimeout(function () {
                roleProcessor.addRole(null, json, function (result) {
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
        it('should get role in processor', function (done) {
            setTimeout(function () {
                roleProcessor.getRole(roleId, function (result) {
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
                roleProcessor.getRoleList(function (result) {
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
                roleProcessor.deleteRole(null, roleId, function (result) {
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

