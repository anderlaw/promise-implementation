const {isFunction,isObject} = require('./utils')
const rejectPromise = require('./reject')
const fulfillPromise = require('./fulfill') 

/**
 * 
 * @param {Promise} promise 
 * @returns Function
 */
function makeResolveFn(promise){
    const rFn = function(argument){
        // only resolve once
        if(rFn.AlreadyResolved){
            return;
        }

        const promise = rFn.Promise;
        /**
         * if argument and promise refer to the same object
         * reject `promise` with a `TypeError' as the reason.
         */
        if(argument === promise){
            rejectPromise(promise,TypeError)
        }
        /**
         * determine if the argument is a promise-liked object
         * if it is, do a new resolution 
         * else fulfill the promise
         */
        if(isObject(argument) && isFunction(argument.then)){
            resolveThenableJob(promise,argument,argument.then)
        }else{
            const promiseResult = argument;
            // fulfill the promise
            fulfillPromise(promise,promiseResult)
        }
    }
    rFn.Promise = promise;
    rFn.AlreadyResolved = false;
    return rFn;
}
/**
 * 
 * @param {Promise} promise 
 * @returns Function
 */
function makeRejectFn(promise){
    const rFn = function(argument){
        // only resolve once
        if(rFn.AlreadyResolved){
            return;
        }
        
        const promise = rFn.Promise;
        const promiseResult = argument;
        // reject the promise
        rejectPromise(promise,promiseResult)
    }
    rFn.Promise = promise;
    rFn.AlreadyResolved = false;
    return rFn;
}

function resolveThenableJob(promise,resolution,thenFn){
    const newResolvingFunctions = createResolvingFunctions(promise);
    const resolveFn = newResolvingFunctions.resolve;
    const rejectFn = newResolvingFunctions.reject;
    thenFn.call(resolution,resolveFn,rejectFn);
}
function createResolvingFunctions(promise){
    return {
        resolve:makeResolveFn(promise),
        reject:makeRejectFn(promise)
    }
}
module.exports = {
    createResolvingFunctions
}