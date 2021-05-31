var num = 0;
var obj = Object.create(null, {
    then: {
        get: function () {
            num++
            return function thenMethodForX(onFulfilled) {
                onFulfilled();
            };
        }
    }
})
console.log(typeof obj.then.get)