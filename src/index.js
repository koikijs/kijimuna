import express from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';
import expressWs from 'express-ws';
import api from './api';
import ws from './ws';

const { app } = expressWs(express());

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

api(app);
ws(app);

app.listen(process.env.PORT || 5432);
