require("../index");

const resolved = (value)=>{
    return new Promise((res,rej)=>{
        res(value)
    })
}
var promise = resolved('dummy').then(function () {
    return promise;
});

promise.then(null, function (reason) {
    console.log(reason instanceof TypeError);
});