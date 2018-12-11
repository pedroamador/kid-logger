require('dotenv').config()
let debug = require('debug')('app:start')
let mongodb = require('./services/mongodb')
let redis = require('./services/redis')
let rabbit = require('./services/rabbit')
let app = require('./app')

let server = app.listen(process.env.SERVER_PORT, () => {
  debug(`Express is running on port ${process.env.SERVER_PORT}`);
})