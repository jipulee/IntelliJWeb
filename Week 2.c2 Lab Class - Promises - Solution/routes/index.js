var express = require('express');
var router = express.Router();
const fs = require('fs')

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'Express'
    });
});

// method 01
let accessPromise = function (path) {
    return new Promise((resolve, reject) => {
        // fs.access it checks if a file exists or not
        fs.access(path, fs.F_OK, (err) => {
            if (err) reject();
            else resolve()
        })
    });
}

// method 02
const accessPromise = (path) => {
    return new Promise((resolve, reject) => {
        // fs.access it checks if a file exists or not
        fs.access(path, fs.F_OK, (err) => {
            if (err) reject();
            else resolve()
        })
    })
}
router.get('/get_photos', function (req, res, next) {
    accessPromise('./public/images/image1.png')
        .then(() => accessPromise('./public/images/image2.png'))
        .then(() => accessPromise('./public/images/image3.png'))
        .then(() => {
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end('all images exist');
        })
        .catch(err => {
            console.error(err);
            res.writeHead(500, {
                'Content-Type': 'text/plain'
            });
            res.end('image does not exist');
        })
});

module.exports = router;