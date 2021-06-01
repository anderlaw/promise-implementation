const { createResolvingFunctions } = require('./resolve.js')
function newPromiseCapability(){
    const promise = new Promise(()=>{});
    const resolvingFunctions = createResolvingFunctions(promise)
    return {
        promise,
        resolve:resolvingFunctions.resolve,
        reject:resolvingFunctions.reject
    }
}
module.exports = {
    newPromiseCapability
}