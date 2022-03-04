const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

/* GET home page. */
router.route('/')
    .get (function(req, res) {
      res.render('index', {title: 'Express'});
    })

    .post(function  (req, res) {
        let firstNo = req.body.no1;
        let secondNo = req.body.no2;
        if (isNaN(firstNo) || isNaN(secondNo)) {
            res.setHeader('Content-Type', 'application/json');
            res.status(403).json({error: 403, reason: 'One of the numbers is invalid'});
        } else {
            fetch('http://localhost:3001/add', {
                method: 'post',
                body: JSON.stringify({firstNumber: firstNo, secondNumber: secondNo}),
                headers: {'Content-Type': 'application/json'},
            })
                .then(res =>
                    res.json())
                .then(json =>
                    res.json(json.result))
                .catch(err =>
                    res.status(500).json(err))
        }
    });

module.exports = router;
