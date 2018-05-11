// Immanuel Amirtharaj
// response-formatter.js

const baseReponse = function(code, err, body) {

    var status = "success";

    let errMessage = "";
    if (err) {
        errMessage = err;
        status = "failure";
    }

    const res = {
        "meta": {
            "type": status,
            "code": code,
            "message": err,
        },
        "data": body,
    };  

    return res;
}

const failedResponse = function(code, err) {
    return baseReponse(code, err, null);
}

const successfulResponse = function(body) {
    return baseReponse(200, null, body);
}

module.exports.successfulResponse = successfulResponse;
module.exports.baseReponse = baseReponse;
module.exports.failedResponse = failedResponse;


