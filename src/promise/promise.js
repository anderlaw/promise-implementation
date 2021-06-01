const {isFunction} = require('../utils')
const {createResolvingFunctions}  = require("../resolve")
const thenMethod = require("./then")
function createInstance(){
    const defaultObj = {
        PromiseState:"pending",
        PromiseResult:undefined,
        PromiseIsHandled: false,
        PromiseFulfillReactions : [],
        PromiseRejectReactions : []
    }
    defaultObj.__proto__ = Promise.prototype
    return defaultObj
}
function Promise(executor){
    if(!isFunction(executor)){
        throw new TypeError('executor must be a function!')
    }
    const promise = createInstance();
    const resolvingFunctoins = createResolvingFunctions(promise);
    executor(resolvingFunctoins.resolve,resolvingFunctoins.reject);
    return promise;
}

// assign prototype methods to Promise.prototype
Object.assign(Promise.prototype,{
    then:thenMethod
})

module.exports = {
    Promise:Promise
}