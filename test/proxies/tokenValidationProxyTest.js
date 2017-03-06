var assert = require('assert');
var tokenValidationProxy = require("../../proxies/tokenValidationProxy");

describe('tokenValidationProxy', function () {
    this.timeout(20000);



    describe('#validateAccessToken()', function () {
        it('should fail to validateAccess token', function (done) {

            var json = {
                accessToken: "dadsfndslknfds",
                userId: "kaff4",
                clientId: 333,
                role: "admin",
                uri: "http://localhost/rs/role/add",
                scope: "write"
            };
            setTimeout(function () {
                tokenValidationProxy.validateAccessToken(json, function (result) {
                    console.log('validateAccessToken: ', JSON.stringify(result));
                    if (!result.valid) {
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                });
            }, 1000);
        });
    });
    
    /*
    describe('#validateAccessToken()', function () {
        it('should validateAccess token', function (done) {

            var json = {
                accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhY2Nlc3MiLCJncmFudCI6ImNsaWVudF9jcmVkZW50aWFscyIsImNsaWVudElkIjo0MDMsInJvbGVVcmlzIjpbeyJjbGllbnRSb2xlSWQiOjEsInJvbGUiOiJhZG1pbiIsInVyaUlkIjo2MiwidXJpIjoiaHR0cDovL2xvY2FsaG9zdC9ycy9hZGRDbGllbnQiLCJjbGllbnRJZCI6NDAzfSx7ImNsaWVudFJvbGVJZCI6MSwicm9sZSI6ImFkbWluIiwidXJpSWQiOjYzLCJ1cmkiOiJodHRwOi8vbG9jYWxob3N0L3JzL3VwZGF0ZUNsaWVudCIsImNsaWVudElkIjo0MDN9LHsiY2xpZW50Um9sZUlkIjoxLCJyb2xlIjoiYWRtaW4iLCJ1cmlJZCI6NzcsInVyaSI6Imh0dHA6Ly9sb2NhbGhvc3QvcnMvYWRkQ2xpZW50U2NvcGUiLCJjbGllbnRJZCI6NDAzfSx7ImNsaWVudFJvbGVJZCI6Miwicm9sZSI6InVzZXIiLCJ1cmlJZCI6NjgsInVyaSI6Imh0dHA6Ly9sb2NhbGhvc3QvcnMvZGVsZXRlQ2xpZW50QWxsb3dlZFVyaSIsImNsaWVudElkIjo0MDN9LHsiY2xpZW50Um9sZUlkIjoyLCJyb2xlIjoidXNlciIsInVyaUlkIjo4MCwidXJpIjoiaHR0cDovL2xvY2FsaG9zdC9ycy9hZGRDbGllbnRSb2xlVXJpIiwiY2xpZW50SWQiOjQwM31dLCJleHBpcmVzSW4iOjM2MDAsImlhdCI6MTQ4ODc2NDY4OCwidG9rZW5UeXBlIjoiYWNjZXNzIiwiZXhwIjoxNDg4NzY4Mjg4LCJpc3MiOiJVbGJvcmEgT2F1dGgyIFNlcnZlciJ9.GaOtVUT4RCv_iD3UJFHRAdKsp2iJ-G8WIgf_N5hedQs",                
                clientId: 403,
                role: "admin",
                uri: "http://localhost/rs/role/add",
                scope: "write"
            };
            setTimeout(function () {
                tokenValidationProxy.validateAccessToken(json, function (result) {
                    console.log('validateAccessToken: ', JSON.stringify(result));
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
    */
});



