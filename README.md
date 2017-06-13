Ulbora User Service 
==============

A User Micro Service


## Headers
Content-Type: application/json (for POST and PUT)
Authorization: Bearer atToken
clientId: clientId (example 33477)


## Add Role

```
POST:
URL: http://localhost:3001/rs/role/add

Example Request
{  
  "role": "tester1234role45667"
}
  
```

```
Example Response   

{
  "success": true, 
  "message": ""
}

```



## Get Role List

```
GET:
URL: http://localhost:3001/rs/role/list

  
```

```
Example Response   

[
    {
        "id": 1,
        "role": "admin"
    },
    {
        "id": 127,
        "role": "tester55"
    },
    {
        "id": 2,
        "role": "user"
    }
]

```



## Get Role

```
GET:
URL: http://localhost:3001/rs/role/get/94
  
```

```
Example Response   

{
    "id": 94,
    "role": "admin"
}

```


## Delete Role

```
DELETE:
URL: http://localhost:3001/rs/role/delete/94
  
```

```
Example Response   

{
  "success": true,
  "message": ""
}

```


## Add User

```
POST:
URL: http://localhost:3001/rs/user/add

Example Request
{
   "username":"ken",
   "password":"ken",
   "enabled":true,
   "emailAddress":"bob@bob.com",
   "firstName":"ken",
   "lastName":"williamson",
   "roleId":1,
   "clientId":"403"
}
  
```

```
Example Response   

{
  "success": true, 
  "emailAddress":"bob@bob.com",
  "message": ""
}

```


## Update User (change password)

```
PUT:
URL: http://localhost:3001/rs/user/update

Example Request
{
   "username":"ken",
   "password":"ken",
   "clientId":"5"   
}
  
```

```
Example Response   

{
  "success": true,
  "message": ""
}

```


## Update User (disable/enable)

```
PUT:
URL: http://localhost:3001/rs/user/update

Example Request
{
   "username":"ken",
   "enabled":true,
   "clientId":"5"   
}
  
```

```
Example Response   

{
  "success": true,
  "message": ""
}

```



## Update User (info)

```
PUT:
URL: http://localhost:3001/rs/user/update

Example Request
{
   "username":"ken",
   "emailAddress":"bob@bob.com",
   "firstName":"bob",
   "lastName":"williams",
   "clientId":"5"   
}
  
```

```
Example Response   

{
  "success": true,
  "message": ""
}

```



## Get User

```
GET:
URL: http://localhost:3001/rs/user/get/ken/2
  
```

```
Example Response   

{
    "username": "ken",
    "enabled": true,
    "dateEntered": "2017-05-06T04:00:00.000Z",
    "emailAddress": "bob@bob.com",
    "firstName": "ken",
    "lastName": "williamson",
    "roleId": 1,
    "clientId": "2"
}

```


## Get User List

```
GET:
URL: http://localhost:3001/rs/user/list


  
```

```
Example Response   

[
    {
        "username": "ken",
        "clientId": "2",
        "firstName": "ken",
        "lastName": "williamson",
        "enabled": true
    },
    {
        "username": "ken",
        "clientId": "3",
        "firstName": "ken",
        "lastName": "williamson",
        "enabled": true
    },
    {
        "username": "ken",
        "clientId": "4",
        "firstName": "ken",
        "lastName": "williamson",
        "enabled": true
    },
    {
        "username": "ken",
        "clientId": "403",
        "firstName": "ken",
        "lastName": "williamson",
        "enabled": true
    },
    {
        "username": "tester2",
        "clientId": "4454",
        "firstName": "bob",
        "lastName": "hope",
        "enabled": true
    }
]

```



## Delete User

```
DELETE:
URL: http://localhost:3001/rs/user/delete/ken/5
  
```

```
Example Response   

{
  "success": true,
  "message": ""
}

```



## Login

```
POST:
URL: http://localhost:3001/rs/user/login

Example Request
{
   "username":"ken",
   "password":"ken",
   "clientId":"5"   
}
  
```

```
Example Response   

{
  "success": true,
  "id": 49,
  "message": ""
}

```
