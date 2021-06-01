const {isFunction,isObject} = require('./utils')
const rejectPromise = require('./reject')
const fulfillPromise = require('./fulfill') 

/**
 * 
 * @param {Promise} promise 
 * @returns Function
 */
function makeResolveFn(promise,AlreadyResolved){

    const rFn = function(argument){
        // only resolve once
        if(rFn.AlreadyResolved.value){
            return;
        }
        rFn.AlreadyResolved.value = true;
        const promise = rFn.Promise;
        
        /**
         * 
         * if argument and promise refer to the same object
         * reject `promise` with a `TypeError' as the reason.
         * 
         * determine if the argument is a promise-liked object
         * if it is, do a new resolution 
         * else fulfill the promise
         */
        if(argument === promise){
            rejectPromise(promise,new TypeError("error"))
        }else if(isObject(argument)){
            let thenFn;
            try{
                thenFn = argument.then;
                if(isFunction(thenFn)){
                    resolveThenableJob(promise,argument,thenFn)
                }else{
                    fulfillPromise(promise,argument)
                }
            }catch(e){
                rejectPromise(promise,e)
            }
            
            
        }else{
            const promiseResult = argument;
            // fulfill the promise
            fulfillPromise(promise,promiseResult)
        }
    }
    rFn.Promise = promise;
    rFn.AlreadyResolved = AlreadyResolved;
    return rFn;
}
/**
 * 
 * @param {Promise} promise 
 * @returns Function
 */
function makeRejectFn(promise,AlreadyResolved){
    const rFn = function(argument){
        // only resolve once
        if(rFn.AlreadyResolved.value){
            return;
        }
        
        rFn.AlreadyResolved.value = true;
        const promise = rFn.Promise;
        const promiseResult = argument;
        // reject the promise
        rejectPromise(promise,promiseResult)
    }
    rFn.Promise = promise;
    rFn.AlreadyResolved = AlreadyResolved;
    return rFn;
}
function resolveThenableJob(promise,resolution,thenFn){
    const newResolvingFunctions = createResolvingFunctions(promise);
    const resolveFn = newResolvingFunctions.resolve;
    const rejectFn = newResolvingFunctions.reject;
    try{
        thenFn.call(resolution,resolveFn,rejectFn);
    }catch(e){
        rejectFn(e)
    }
    return newResolvingFunctions;
}
function createResolvingFunctions(promise){
    const AlreadyResolved = {
        value:false
    }
    return {
        resolve:makeResolveFn(promise,AlreadyResolved),
        reject:makeRejectFn(promise,AlreadyResolved)
    }
}
module.exports = {
    createResolvingFunctions
}