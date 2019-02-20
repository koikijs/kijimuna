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

- secretKey
- clientKey

## GET - /api/groups

### RQ Header

- clientKey
- secretKey

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

- clientKey
- secretKey

### RS

- id
- name
- messages (hypermedia link)
- attendees

## GET - /api/users

### RQ Header

- clientKey
- secretKey

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

- clientKey
- secretKey

### RQ Query

- offset
- limit
- groups

### RS

- total
- items
- items[...].id
- items[...].text
- items[...].time
- items[...].posted
