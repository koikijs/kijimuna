# kijimuna

Kijimuna aim to be a chat system which has characteristic below

- Communication as a Service. Providing communication protocol instead of full-stack chat system
- Adaptable and Composable from other system
- Support indivisual, group communication
- Text chat with Websocket
- Video / Voice chat with WebRTC
- Providing API to manipulating chat

![Overview](https://raw.githubusercontent.com/koikijs/kijimuna/master/docs/overview.png)

# API

## POST - /api/services

### RS

- id
- secretKey
- clientKey

## GET - /api/services/:service-id/groups

### RQ Header

- clientKey
- secretKey

### RQ Query

- offset
- limit

### RS

- total
- items[...].id
- items[...].members (hypermedia link)

## GET - /api/services/:service-id/groups/:group-id

### RQ Header

- clientKey
- secretKey

### RS

- messages[...].time
- messages[...].user
- messages[...].text

## GET - /api/services/:service-id/users

### RQ Header

- clientKey
- secretKey

### RQ Query

- offset
- limit
- group

### RS

- total
- items
- items[...].id
- items[...].groups (hypermedia link)
