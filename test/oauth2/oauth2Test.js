var assert = require('assert');
var oauth2 = require("../../oauth2/oauth2");

describe('oauth2', function () {
    this.timeout(20000);
    
    describe('#authorize()', function () {
        it('should fail to authorize a request', function (done) {
            setTimeout(function () {
                var req = {};
                var header = function (val) {
                    if (val === "Authorization") {
                        return "Bearer " + "slldndngggg";
                    } else if (val === "userId") {
                        return "admin";
                    } else if (val === "clientId") {
                        return "544";
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
                res.send = function () {
                    if (this.statusCode === 401) {
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                };
                var me = {
                    role: "admin",
                    uri: "/rs/addUser",
                    scope: "read"
                };
                oauth2.authorize(req, res, me, function () {
                    console.log("In authorization callback");
                    assert(false);
                    done();
                });
            }, 1000);
        });
    });
    
    /*
    describe('#authorize()', function () {
        it('should to authorize a request', function (done) {
            setTimeout(function () {
                var req = {};
                var header = function (val) {
                    if (val === "Authorization") {
                        return "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhY2Nlc3MiLCJncmFudCI6ImNsaWVudF9jcmVkZW50aWFscyIsImNsaWVudElkIjo0MDMsInJvbGVVcmlzIjpbeyJjbGllbnRSb2xlSWQiOjEsInJvbGUiOiJhZG1pbiIsInVyaUlkIjo2MiwidXJpIjoiaHR0cDovL2xvY2FsaG9zdC9ycy9hZGRDbGllbnQiLCJjbGllbnRJZCI6NDAzfSx7ImNsaWVudFJvbGVJZCI6MSwicm9sZSI6ImFkbWluIiwidXJpSWQiOjYzLCJ1cmkiOiJodHRwOi8vbG9jYWxob3N0L3JzL3VwZGF0ZUNsaWVudCIsImNsaWVudElkIjo0MDN9LHsiY2xpZW50Um9sZUlkIjoxLCJyb2xlIjoiYWRtaW4iLCJ1cmlJZCI6NzcsInVyaSI6Imh0dHA6Ly9sb2NhbGhvc3QvcnMvYWRkQ2xpZW50U2NvcGUiLCJjbGllbnRJZCI6NDAzfSx7ImNsaWVudFJvbGVJZCI6Miwicm9sZSI6InVzZXIiLCJ1cmlJZCI6NjgsInVyaSI6Imh0dHA6Ly9sb2NhbGhvc3QvcnMvZGVsZXRlQ2xpZW50QWxsb3dlZFVyaSIsImNsaWVudElkIjo0MDN9LHsiY2xpZW50Um9sZUlkIjoyLCJyb2xlIjoidXNlciIsInVyaUlkIjo4MCwidXJpIjoiaHR0cDovL2xvY2FsaG9zdC9ycy9hZGRDbGllbnRSb2xlVXJpIiwiY2xpZW50SWQiOjQwM31dLCJleHBpcmVzSW4iOjM2MDAsImlhdCI6MTQ4ODc3MDEwMSwidG9rZW5UeXBlIjoiYWNjZXNzIiwiZXhwIjoxNDg4NzczNzAxLCJpc3MiOiJVbGJvcmEgT2F1dGgyIFNlcnZlciJ9.zsiTjwBkD1GrQnpJivepTr0xLvwn9JlLNhVOSRhctkw";
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
                res.send = function () {
                    if (this.statusCode === 401) {
                        assert(false);
                    } else {
                        assert(true);
                    }
                    done();
                };
                var me = {
                    role: "admin",
                    uri: "/rs/addUser",
                    scope: "read"
                };
                oauth2.authorize(req, res, me, function () {
                    console.log("In authorization callback");
                    assert(true);
                    done();
                });
            }, 1000);
        });
    });
*/

});


