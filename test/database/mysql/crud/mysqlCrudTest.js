var assert = require('assert');
var db = require("../../../../database/mysql/crud/mysqlCrud");
var userId;
var roleId;
describe('MYSQLCrud', function () {
    this.timeout(6000);
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
    
    describe('#insert()', function () {
        it('should insert into db', function (done) {
            var q = "INSERT INTO role Set ?";            
            var args = {
                role: 'testRole'
            };
            setTimeout(function () {
                db.insert(null, q, args, function (result) {
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

    describe('#insert()', function () {
        it('should insert into db', function (done) {
            var q = "INSERT INTO user Set ?";
            var d = new Date();
            var args = {
                username: 'test123',                
                password: 'test',
                enabled: true,
                date_entered: d,
                email_address: 'ulbora@ulbora.com',
                first_name: "john",
                last_name: "watson",
                role_id: roleId,
                client_id: "5444"
            };
            setTimeout(function () {
                db.insertNoId(null, q, args, function (result) {
                    console.log("add user: " + JSON.stringify(result))
                    if (result.success) {
                        userId = "test123";
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                });
            }, 1000);           
        });
    });
    
    
    describe('#update()', function () {
        it('should update row from db', function (done) {
            var q = "UPDATE user SET last_name = ? WHERE username = ?";
            var args = ['sanders', userId];
            setTimeout(function () {
                db.update(null, q, args, function (result) {
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
    
    describe('#get()', function () {
        it('should read row from db', function (done) {
            var q = "SELECT * FROM user WHERE username = ?";
            var queryId = [userId];
            setTimeout(function () {
                db.get(q, queryId, function (result) {
                    if (result.success && result.data[0].last_name === 'sanders') {                        
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                });
            }, 1000);           
        });
    });
    
    describe('#getList()', function () {
        it('should read row from db', function (done) {
            var q = "SELECT * FROM user";            
            setTimeout(function () {
                db.getList(q, function (result) {
                    if (result.success && result.data.length > 0) {                        
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
            var q = "DELETE FROM user WHERE username = ?";
            var queryId = [userId];
            setTimeout(function () {
                db.delete(null, q, queryId, function (result) {
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
                db.delete(null, q, queryId, function (result) {
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

