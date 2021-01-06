const logger = require('../util/logger.js');
const sql = require("mssql");
const moment = require('moment');
// config for your database
const config = {
    user: 'sa',
    password: 'P@d0rU123',
    server: '167.71.200.91',
    database: 'patDB'
};

// connect to database
var err = sql.connect(config)
if (err) console.log(err);

class request {
    async allpatients(){
        let functionName = '[allpatients]' //ชื่อ function
        var request = new sql.Request();
        // sql command
        var command = `SELECT p.HNID, Firstname, Lastname 
        FROM patDB.dbo.PATIENTS p, patDB.dbo.PATIENT_COVID_STATUS pcs
        WHERE p.HNID = pcs.HNID and pcs.COVID19_STATUS = 'Positive';`
        var data = await request.query(command)
        var message = {
            "status_code": 200,
            "status": "select all patients Positive success",
            "message": data.recordset
        }
        logger.info(message.status)
        return message
    }

    async noCovidInHospital(){
        let functionName = '[noCovidInHospital]' //ชื่อ function
        var request = new sql.Request();
        // sql command
        var command = `SELECT h.HID,Title, COUNT(p.HNID)AS number_of_patients 
        FROM patDB.dbo.HOSPITALS h, patDB.dbo.PATIENT_COVID_STATUS pcs, patDB.dbo.PATIENTS p
        WHERE p.HNID = pcs.HNID AND pcs.COVID19_STATUS = 'Positive' AND h.HID = p.HID
        GROUP BY h.HID,Title;`
        var data = await request.query(command)
        var message = {
            "status_code": 200,
            "status": "select number patients in hospital success",
            "message": data.recordset
        }
        logger.info(message.status)
        return message
    }

    async topTreeHospital(){
        let functionName = '[topTreeHospital]' //ชื่อ function
        var request = new sql.Request();
        // sql command
        var command = `SELECT TOP(3) h.HID,Title, COUNT(p.HNID)AS number_of_patients  
        FROM patDB.dbo.HOSPITALS h, patDB.dbo.PATIENT_COVID_STATUS pcs, patDB.dbo.PATIENTS p
        WHERE p.HNID = pcs.HNID AND pcs.COVID19_STATUS = 'Positive' AND h.HID = p.HID
        GROUP BY h.HID,Title;`
        var data = await request.query(command)
        var message = {
            "status_code": 200,
            "status": "select number patients in hospital success",
            "message": data.recordset
        }
        logger.info(message.status)
        return message

    }





}
module.exports = request 