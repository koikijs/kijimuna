# kijimuna

Kijimuna aim to be a chat system which has characteristic below

- Communication as a Service. Providing communication protocol instead of full-stack chat system
- Adaptable and composable with other system. System can be used kijimuna and they can make UI under their design system and Authentication.
- Support individual, group communication
- Text chat with Websocket
- Video / Voice chat with WebRTC
- Providing API to manipulating chat

# Overview

![Overview](https://raw.githubusercontent.com/koikijs/kijimuna/master/docs/overview.png)

# Resources

![Overview](https://raw.githubusercontent.com/koikijs/kijimuna/master/docs/resource.png)

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

## GET - /api/groups/:group-id

### RQ Header

- client \*
- secret \*

### RS

- id
- name
- icon
- attendees

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
