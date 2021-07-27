// Author: Anirudh Dhoundiyal
// This simple node program, creates a node express server.

//Requirements
const express = require('express');
const twilio = require('twilio');
const Router = require('express').Router;
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const router = new Router();
const ivrRouter = require('./ivr');
const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

router.use('/ivr', twilio.webhook({validate: false}), ivrRouter);
app.use(router);
app.listen(3000);