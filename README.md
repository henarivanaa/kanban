# kanban

### by Henarivan Andhika Abhirama

endpoint/url : https://dry-castle-71353.herokuapp.com

## GET /tasks
Get all tasks that the user have

### Properties
- token (String)

#### Request Header
```javascript
{
   "token" : "<your_token>" 
}
```

### Response
Status 200

```javascript
[
    {
        "id": 35,
        "title": "Belajar Vue",
        "category": "Backlog",
        "difficulty": "Easy",
        "createdAt": "2020-03-13T16:21:31.157Z",
        "updatedAt": "2020-03-13T16:21:31.157Z",
        "UserId": 7
    },
    {
        "id": 36,
        "title": "Belajar Socket.io",
        "category": "Backlog",
        "difficulty": "Easy",
        "createdAt": "2020-03-13T16:21:38.683Z",
        "updatedAt": "2020-03-13T16:21:38.683Z",
        "UserId": 7
    }
]
```
<br>

## POST /tasks
Create a tasks

### Properties
- Title (String)
    - Can not be null or empty
- Category (String)
    - Can not be null or empty
- Difficulty (String)
    - Can not be null or empty


#### Request Header
```javascript
{
   "Content-Type": "application/json",
   "token" : "<your_token>" 
}
```

#### Request Body
```javascript
{
	"title": "Belajar Vue",
	"category": "Backlog",
	"difficulty": "Easy"
}
```

#### Response
Status 201
```javascript
{
    "id": 34,
    "title": "Belajar Vue",
    "category": "Backlog",
    "difficulty": "Easy",
    "UserId": 7,
    "updatedAt": "2020-03-13T16:12:07.139Z",
    "createdAt": "2020-03-13T16:12:07.139Z"
}
```

Status 400
```javascript
{
  "status": 400,
  "msg": [
    "Validation errors (title can not be empty)"
  ]
}
```
<br>

<br>

## PUT /tasks/:id
Update a todo by the id from the todos resources

### Properties
- id (Number)
    - Gotten from the client
- Title (String)
    - Can not be null or empty
- Category (String)
    - Can not be null or empty
- Difficulty (String)
    - Can not be null or empty

#### Request Headers
```javascript
{
    "Content-Type": "application/json",
    "token" : "<your_token>"
}
```

#### Request Body
```javascript
{
	"title": "Belajar Vue",
	"category": "Backlog"
}
```

#### Response
Status (200)
```javascript
{
    "title": "Belajar Vue",
    "category": "Backlog"
}
```

Status (400)
```javascript
{
  "status": 400,
  "msg": [
    "Validation errors (title can not be empty)",
    "Validation errors (description can not be empty)",
    "Validation errors (due_date can not be empty)"
  ]
}
```

Status (403)
```javascript
{
  "status": 403,
  "msg": "You are not authorized"
}
```

Status (404)
```javascript
{
  "status": 404,
  "msg": "Todo not found"
}
```
<br>

## DELETE /tasks/:id
Delete a tasks

### Properties
- id (Number)
    - Gotten from the client

#### Request Headers
```javascript
{
    "Content-Type": "application/json",
    "token" : "<your_token>"
}
```

#### Response
Status (200)
```javascript
{
    "id": 34,
    "title": "Belajar Vue",
    "category": "Backlog",
    "difficulty": "Easy",
    "createdAt": "2020-03-13T16:12:07.139Z",
    "updatedAt": "2020-03-13T16:17:11.341Z",
    "UserId": 7
}
```

Status (403)
```javascript
{
  "status": 403,
  "msg": "You are not authorized"
}
```

Status (404)
```javascript
{
  "status": 404,
  "msg": "Todo not found"
}
```
<br>

## POST /register
Sign up an account

### Properties
- name (String)
    - Can not be null or empty
- email (String)
    - Can not be null or empty
- password (String)
    - Can not be null or empty

#### Request Headers
```javascript
{
    "Content-Type": "application/json"
}
```

#### Request Body
```javascript
{
	"name": "wow",
	"email": "wow@gmail.com",
	"password": "123"
}
```

#### Response
Status (201)
```javascript
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiZW1haWwiOiJ3b3dAZ21haWwuY29tIiwiaWF0IjoxNTg0MTE0OTY4fQ.p8V1NH9dN8m4I_x3yIbTO0SRSRZ8ftodsc2QGiHdq3U"
```
Status (400)
```javascript
{
  "status": 400,
  "msg": [
    "Validation errors (Name can not be empty)",
    "Validation errors (Email can not be empty)",
    "Validation errors (Password can not be empty)"
  ]
}
```
<br>

## POST /login
Login to an account
Generates a token for authentication

### Properties
- email (String)
- password (String)

#### Request Headers
```javascript
{
    "Content-Type": "application/json"
}
```
#### Request Body
```javascript
{
	"email": "wow@gmail.com",
	"password": "123"
}
```

#### Response
Status (200)
```javascript
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiZW1haWwiOiJ3b3dAZ21haWwuY29tIiwiaWF0IjoxNTg0MTE1MTgxfQ.-kpgcpK3gcDILZixhH4ZehsfiSziuSbNLwqJZHozyHg"
```

Status (400)
```javascript
{
  "status": 400,
  "msg": "Wrong Email / Password"
}
```
<br>

## POST /googleLogin
Login to an account with a google acount

### Properties
- Google Token (String)
    - Gotten from google sign-in server

#### Request Headers
```javascript
{
    "Content-Type": "application/json"
}
```

#### Request Body
```javascript
{
	"token" : "<token_from_google>"
}
```

#### Response
Status (200)
```javascript
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiZW1haWwiOiJoZW5hcml2YW5hYUBnbWFpbC5jb20iLCJpYXQiOjE1ODM1NTk5MjF9.q0qRNCzGxjC1TeqsaHxwqINnLu2FXRjTD3IulTJlzE8"
```