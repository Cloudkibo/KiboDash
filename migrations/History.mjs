// import { sequelize } from './../cron/database'
const Sequelize = require('sequelize')
const db = require('./../cron/database')

export const HistoryData = db.define('History', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    startDateTime: {
        type: Sequelize.DATE
    },
    endDateTime: {
        type: Sequelize.DATE
    },
    aggregateType: {
        type: Sequelize.STRING
    },
    status: {
        type: Sequelize.STRING
    }
})