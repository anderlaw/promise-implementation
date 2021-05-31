require("../index");

const resolved = (value)=>{
    return new Promise((res,rej)=>{
        res(value)
    })
}
let numberOfTimesThenWasRetrieved = 0;
var promise = resolved('dummy').then(function () {
    return Object.create(null,{
        then: {
            get: function () {
                ++numberOfTimesThenWasRetrieved;
                return function thenMethodForX(onFulfilled) {
                    onFulfilled();
                };
            }
        }
    })
});

promise.then(()=>{
    console.log(numberOfTimesThenWasRetrieved)
}, function (reason) {
    console.log('rej',reason instanceof TypeError);
});