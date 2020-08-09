const request = require('request');

const username = 'ct_interviewee';
const password = 'supersecret';
const auth = "Basic " + new Buffer(username + ":" + password).toString("base64")

const makeRequest = (url, defaultRes) => {
    return new Promise((resolve, reject) => {
        request({
            url,
            timeout: 400,
            json: true,
            headers:{
                'accept': 'application/json',
                "Authorization" : auth
            }
        },(err, res, body) => {
            if(res && res.statusCode === 200){
                return resolve(body);
            };
            return resolve(defaultRes)
        })
    })
}

module.exports = makeRequest;