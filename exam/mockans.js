var express = require('express');
var router = express.Router();

/* */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});


/**
 * Exercise 1
 * - example of: writing nodeJS routes. The route takes some parameters and combines them. We had a similar
 * exercise in the lab with two numbers being added. The following is another example
 * Create a nodejs POST route that takes four strings as input and returns the concatenation of the four strings
 * e.g. input -> {val1: 'one', val2: 'two', val3: 'three', val4: 'four'}
 * output -> 'one - two - three - four'
 * e.g. your answer should look like:
 * router.post('/concatenate', function (req, res) {...}
 */

/**
 * solution:
 */

router.post('/concatenate', (req, res, next) => {
    const val1 = req.body.val1
    const val2 = req.body.val2
    const val3 = req.body.val3
    const val4 = req.body.val4

    res.setHeader('Content-Type', 'application/json');
    res.json(val1 + ' - ' + val2 + ' - ' + val3 + ' - ' + val4);
})

/**
 * Exercise 2
 * - example of: Ajax exercise
 *     - write the JQuery Ajax function that communicates with the following server route
 *     your solution should take the form of e.g.
 *     function sendAjaxQuery(url, data) { ...}
 *
 *     the Ajax call should
 *         - print on the console the values returned if the call is successful
 *         - create an alert showing the error otherwise
 */

 router.post('/user_data', function(req, res, next) {
    let userData = req.body;
    const currentYear = (new Date()).getFullYear();
    const dob= parseInt(userData.year);

    if (userData == null) {
        res.setHeader('Content-Type', 'application/json');
        res.status(403).json({error: 403, reason: 'no user data provided'});
    } else if (!isNumeric(userData.year) || dob>currentYear) {
        res.setHeader('Content-Type', 'application/json');
        res.status(403).json({error: 403, reason: 'Year is invalid'});
    } else if (!userData.firstname) {
            res.setHeader('Content-Type', 'application/json');
            res.status(403).json({error: 403, reason: 'First name is invalid'});
    } else if (!userData.lastname) {
        res.setHeader('Content-Type', 'application/json');
        res.status(403).json({error: 403, reason: 'Last name is invalid'});
    }
    else {
        userData.age = currentYear - dob;
        res.setHeader('Content-Type', 'application/json');
        res.json(userData);
    }
});