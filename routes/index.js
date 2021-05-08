var db = require('../db-connection');
var customFunc = require('../functions');

var express = require('express');
var router = express.Router();


router.get("/", (req, res) => {
	db.query(`SELECT users.id as uid, users.name, request.id as req_id, request.type, request.details, request.start_date, request.end_date, request.days, request.status, request.allowance from users left join request on users.id = request.user_id`, (error, result) => {
    	if(error)
    		return res.status(404).send({message: "Sorry, could not process your request at the moment, please try again later"});

    	res.status(200).send({status: "success", data: customFunc.arrangeOutput(result)});
	})
})

router.post("/create-request", customFunc.scrutinize, (req, res) => {
	res.send("Hello")
})

router.get("/update-request/:id/:status", (req, res) => {
	var status = req.params.status;
	var id = req.params.id;
	db.query(`UPDATE request set status = ? where id = ?`, [status, id], (error, result) => {
		if(error)
    		return res.status(404).send({message: "Sorry, could not process your request at the moment, please try again later"});

		db.query(`SELECT users.id as uid, users.name, request.id as req_id, request.type, request.details, request.start_date, request.end_date, request.days, request.status, request.allowance from users left join request on users.id = request.user_id`, (error, result) => {
	    	if(error)
	    		return res.status(404).send({message: "Sorry, could not process your request at the moment, please try again later"});

	    	res.status(200).send({status: "success", message: "Leave status updated successfully", data: customFunc.arrangeOutput(result)});
		})

	})
})


module.exports = router;