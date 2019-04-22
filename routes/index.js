var express = require('express');
const user = require('../database/user');
const USER = user.model;
const USERSCHEMA = user.schema;
var valid = require("../utils/validate");
var router = express.Router();
var sha1 = require('sha1');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.status(200).json({
        msn: "Practica 2, parte 2"
    });
});

router.post('/user', async(req, res) => {
    var params = req.body;

    params["registerDate"] = new Date();
    params["updateDate"] = new Date();
    params["password"] = sha1(params.password);
    if (!valid.checkParams(USERSCHEMA, params)) {
        res.status(300).json({
            msn: "Parametros Incorrectos"
        });
        return;
    }
    // if (!valid.checkEmail(params.email)) {
    //     res.status(300).json({
    //         msn: "Email Incorrecto"
    //     });
    //     return;
    // }

    var user = new USER(params);
    var result = await user.save();
    res.status(200).json(result);
});

router.get("/user", async(req, res) => {
    var params = req.query;
    var limit = 100;
    if (params.limit != null) {
        limit = parseInt(params.limit);
    }
    var order = -1;
    if (params.order != null) {
        if (params.order == "desc") {
            order = -1;
        } else if (params.order == "asc") {
            order = 1;
        }
    }
    var filter = {};
    if (params.id != null) {
        filter = { _id: params.id }
    };
    var skip = 0;
    if (params.skip != null) {
        skip = parseInt(params.skip);
    }
    var list = await USER.find(filter).limit(limit).sort({ _id: order }).skip(skip);
    res.status(200).json(list);
});

router.put('/user', async(req, res) => {
    var params = req.body;
    var id = req.query.id;
    if (id == null) {
        res.status(300).json({
            msn: "id no Encontrado"
        });
        return;
    }


    params["updateDate"] = new Date();
    // if (!valid.checkParams(USERSCHEMA, params)) {
    //     res.status(300).json({
    //         msn: "Parametros Incorrectos"
    //     });
    // //     return;
    // // }
    // delete params.registerDate;
    // delete params.updateDate;

    var result = await USER.findOneAndUpdate({ _id: id }, params);
    res.status(200).json(result);
});

router.patch('/user', async(req, res) => {
    var params = req.body;
    var id = req.query.id;
    if (id == null) {
        res.status(300).json({
            msn: "id no Encontrado"
        });
        return;
    }


    params["updateDate"] = new Date();


    var result = await USER.findOneAndUpdate({ _id: id }, params);
    res.status(200).json(result);
});

router.delete("/user", async(req, res) => {
    var id = req.query.id;
    if (id == null) {
        res.status(300).json({
            msn: "id no Encontrado"
        });
        return;
    }
    var result = await USER.remove({ _id: id });
    res.status(200).json(result);
});
module.exports = router;