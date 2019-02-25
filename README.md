# kijimuna

Kijimuna aim to be a chat system which has characteristic below

- Communication as a Service. Providing communication protocol instead of full-stack chat system
- Adaptable and composable with other system. System can be use kijimuna to make UI under their design system
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
- items[...].messages (hypermedia link)
- items[...].attendees (hypermedia link)

## GET - /api/groups/:group-id

### RQ Header

- client \*
- secret \*

### RS

- id
- name
- messages (hypermedia link)
- attendees

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
- items[...].groups

## GET - /api/messages

### RQ Header

- client \*
- secret \*

### RQ Query

- offset
- limit
- group \*

### RS

- total
- items
- items[...].id
- items[...].text
- items[...].time
- items[...].posted

## POST - /api/token

### RQ Header

- secret \*
- client \*

### RQ Body

- group \*
- user \*

### RS

- token

# Websocket

| Action ID (a) | Action          | Data (d)                                                   |
| ------------- | --------------- | ---------------------------------------------------------- |
| 1             | Member updates  | ms: list of users ID                                       |
| 2             | Send message    | i: message id, m: message, t: timestamp, p: posted user ID |
| 3             | Fetch histories | h: list of chat history                                    |

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

# Environment variables

For kijimuna contributer

- KIJIMUNA_HASH_SECRET
- KIJIMUNA_CHAUS_CLIENT_ID
- KIJIMUNA_CHAUS_SECRET_ID
- KIJIMUNA_MONGO_URI
