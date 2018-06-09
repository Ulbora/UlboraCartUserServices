/*     
 Copyright (C) 2016 Ulbora Labs LLC. (www.ulboralabs.com)
 All rights reserved.
 
 Copyright (C) 2016 Ken Williamson
 All rights reserved.
 
 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU Affero General Public License as published
 by the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.
 
 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU Affero General Public License for more details.
 
 You should have received a copy of the GNU Affero General Public License
 along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */



var roleService = require("../services/roleService");
var userService = require("../services/userService");
var clientUserService = require("../services/clientUserService");

exports.init = function (app, db) {
    //init
    roleService.init(db);
    userService.init(db);

    // role validation
    app.post('/rs/role/add', roleService.add);
    app.get('/rs/role/get/:id', roleService.get);
    app.get('/rs/role/list', roleService.list);
    app.delete('/rs/role/delete/:id', roleService.delete);

    //Admin user services
    app.post('/rs/user/add', userService.add);
    app.put('/rs/user/update', userService.update);
    app.get('/rs/user/get/:username/:clientId', userService.get);
    app.delete('/rs/user/delete/:username/:clientId', userService.delete);
    app.get('/rs/user/list', userService.list);
    app.get('/rs/user/search/:clientId', userService.search);
    app.post('/rs/user/login', userService.login);


    //Client user services --- used by client to add users
    app.post('/rs/client/user/add', clientUserService.add);
    app.put('/rs/client/user/update', clientUserService.update);
    app.get('/rs/client/user/get/:username', clientUserService.get);
    app.delete('/rs/client/user/delete/:username', clientUserService.delete);
    app.get('/rs/client/user/search', clientUserService.search);


};
