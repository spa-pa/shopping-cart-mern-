//----------Mongo connection----------
var express = require('express');
var mongoose = require("mongoose");

var dbName = 'products';
var connectionString = 'mongodb://localhost:27017/' + dbName;

//create a connection with mmongodb

mongoose.connect(connectionString);

