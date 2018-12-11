let debug = require('debug')('app:mongodb')
let mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_CONECTION, { useNewUrlParser: true })
mongoose.Promise = global.Promise

// if the connection is closed or fails to be established at all, we will reconnect
class MongoDB {
    constructor() {
        this.mongoConn = null
        this.start = function () {
            mongoose.connection.on('connected', () => {
                debug(`Mongoose connection open on ${process.env.MONGODB_CONECTION}`)
            })
            mongoose.connection.on('error', (err) => {
                debug(`Connection error: ${err.message}`)
                return setTimeout(mongodb.start, 10000)
            })
            mongoose.connection.on("close", function () {
                debug("reconnecting")
                return setTimeout(mongodb.start, 10000)
            })
            mongodb.mongoConn = mongoose.connection;
        }
    }
}

var mongodb = new MongoDB()
mongodb.start()
module.exports = mongodb