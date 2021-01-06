const express = require('express')
const app = express()
const request = require('../controller/handle');
const logger = require('../util/logger.js');

app.get('/allpatients',async (req, res) => {
    try {
        logger.debug(req.body)
        var result = await new request().allpatients()
        logger.debug(result.message)
        //res.status(result.status_code).json(result.message)
        res.json(result.message)
    } catch (error) {
        let messageError = {
            statusCode: error.statusCode ||  400,
            message: error.message || error
        }
        res.status(messageError.statusCode)
        res.json(messageError)
    }
})

app.get('/nocovid',async (req, res) => {
    try {
        logger.debug(req.body)
        var result = await new request().noCovidInHospital()
        logger.debug(result.message)
        res.status(result.status_code).json(result.message)
    } catch (error) {
        let messageError = {
            statusCode: error.statusCode ||  400,
            message: error.message || error
        }
        res.status(messageError.statusCode)
        res.json(messageError)
    }
})

app.get('/tophospital',async (req, res) => {
    try {
        logger.debug(req.body)
        var result = await new request().topTreeHospital()
        logger.debug(result.message)
        res.status(result.status_code).json(result.message)
    } catch (error) {
        let messageError = {
            statusCode: error.statusCode ||  400,
            message: error.message || error
        }
        res.status(messageError.statusCode)
        res.json(messageError)
    }
})





module.exports = app