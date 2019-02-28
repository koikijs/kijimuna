# Resources

![Overview](https://raw.githubusercontent.com/koikijs/kijimuna/master/kijimuna-server/docs/resource.png)

## POST - /api/services

### RS

- secret
- client

## GET - /api/groups

### RQ Header

- client \*
- secret \*

### RQ Query

- offset
- limit

### RS

- total
- items[...].id
- items[...].name
- items[...].icon

## POST - /api/groups

### RQ Header

- client \*
- secret \*

### RQ Body

- name \*
- icon
- custom ( JSON )

## GET - /api/groups/:group-id

### RQ Header

- client \*
- secret \*

### RS

- id
- name
- icon
- attendees

## PATCH - /api/groups/:group-id

### RQ Header

- client \*
- secret \*

### RQ Body

- icon
- custom ( JSON )

## DELETE - /api/groups/:group-id

### RQ Header

- client \*
- secret \*

## POST - /api/groups/:group-id/attendees

### RQ Header

- client \*
- secret \*

### RQ Body

- user (user id) \*

## GET - /api/users

### RQ Header

- client \*
- secret \*

### RQ Query

- offset
- limit

### RS

- total
- items
- items[...].id
- items[...].name
- items[...].icon
- items[...].groups

## POST - /api/users

### RQ Header

- client \*
- secret \*

### RQ Body

- name \*
- icon

## GET - /api/users/:user-id

### RQ Header

- client \*
- secret \*

### RS

- id
- name
- icon
- attendees

## PATCH - /api/users/:user-id

### RQ Header

- client \*
- secret \*

### RQ Body

- icon
- custom ( JSON )

## DELETE - /api/users/:user-id

### RQ Header

- client \*
- secret \*

## POST - /api/token

### RQ Header

- secret \*
- client \*

### RQ Body

- group (group id) \*
- user (user id) \*

### RS

- token

# Websocket

| Action ID (a) | Action                | Data (d)                                                     |
| ------------- | --------------------- | ------------------------------------------------------------ |
| 1             | Online member updates | on: list of online member ID, off: list of offline member ID |
| 2             | Send message          | i: message id, m: message, t: timestamp, p: posted user ID   |
| 3             | Fetch histories       | h: list of chat history                                      |

## Sending message example

```
{
  "a":2,
  "d": {
    "m": "test message"
  }
}
```

## Get message example

```
{
  "a":2,
  "d": {
    "i": "5c73fc6510629c189f94e04c",
    "m": "test message",
    "t": "1551105125856",
    "p": "67157f9"
  }
}
```

## Get online memebers update example

```
{
  "a": 1,
  "d": {
    "on": [
      {
        "id": "67157f9",
        "name": "test"
      }
    ],
    "off": [
      {
        "id": "f806399",
        "name": "test2"
      }
    ]
  }
}
```

## Fetch chat history example

```

{
  "a": 3,
  "d": {
    "h": [
      {
        "i": "5c73f6c2d2ba5716cda127b5",
        "m": "hello",
        "p": "67157f9",
        "t": 1551104000000
      },
      {
        "i": "5c73fc6510629c189f94e04c",
        "m": "world",
        "p": "67157f9",
        "t": 1551105125856
      }
    ]
  }
}
```

# Environment variables

For kijimuna contributer

- KIJIMUNA_HASH_SECRET
- KIJIMUNA_CHAUS_CLIENT_ID
- KIJIMUNA_CHAUS_SECRET_ID
- KIJIMUNA_MONGO_URI
- KIJIMUNA_REDIS_URI
