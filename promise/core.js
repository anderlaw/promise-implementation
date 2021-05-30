
const {isFn,assignProps} = require("./utils")

function Promise(executor){
    if(!isFn(executor)){
        throw new TypeError('executor must be a function!')
    }
    const newPromise = createInstance();
    const resolvingFns = CreateResolvingFunctions(newPromise);
    executor(resolvingFns.resolve,resolvingFns.reject);
    return newPromise;
}
// 挂载原型
Object.assign(Promise.prototype,{
    then(){

    }
})

//静态方法
Promise.all = function(){

}


function createInstance(){
    let instance = {};
    instance["[[PromiseState]]"] = "pending";
    instance["[[PromiseResult]]"] = null;
    instance["[[PromiseFulfillReactions]]"] = [];
    instance["[[PromiseRejectReactions]]"] = [];
    instance["[[PromiseIsHandled]]"] = false;
    instance.prototype = Promise.prototype
}


// 创建resolving函数
/**
 * (promise:Promise)=>{resolve:Function,reject:Function}
 */
function CreateResolvingFunctions(promise){

    //initialize `resolve` callback
    const resolveFnObj = (result)=>{
        const promise = resolveFnObj.promise;
        const alreadyResolved = resolveFnObj.alreadyResolved;
        if(alreadyResolved){
            return
        }

        resolveFnObj.alreadyResolved = true;

        //if resolution value refer the same value with promise throw error
        if(result === promise){
            throw new TypeError("result and promise can't be the same")
        }
        if(!result || typeof result !== 'object' || !isFn(result.then)){
            fulfillPromise(promise,result)
        }else{
            makeNewResolution(promise,result,result.then);
        }
    }

    //set extra props to resolveFnObj
    assignProps(resolveFnObj,{promise,alreadyResolved:false})

    //initialize `reject` callback
    const rejectFnObj = (reason)=>{
        const promise = rejectFnObj.promise;
        const alreadyResolved = rejectFnObj.alreadyResolved;
        if(alreadyResolved){
            return
        }

        resolveFnObj.alreadyResolved = true;
        rejectPromise(promise,reason)
    }

    //set extra props to resolveFnObj
    assignProps(rejectFnObj,{promise,alreadyResolved:false})

    return {
        resolve:resolveFnObj,
        reject:rejectFnObj
    }
}
function fulfillPromise(promise,result){
    if(promise['[[PromiseState]]'] === "pending"){
        const reactions = promise['[[PromiseFulfillReactions]]'];
        promise['[[PromiseResult]]'] = result;
        promise['PromiseFulfillReactions'] = undefined;
        promise['PromiseRejectReactions'] = undefined;
        promise['[[PromiseState]]'] = 'fulfilled';

        triggerPromiseReactions(reactions,result)
    }
}
function makeNewResolution(promise,resolution,thenFn){

    //create a new resolving function
    const newResolvingFn = CreateResolvingFunctions(promise)

    resolution.then.call(result,newResolvingFn.resolve,newResolvingFn.reject)
}
/**
 * 
 * @param {Promise} promise 
 * @param {any} reason 
 */
function rejectPromise(promise,reason){
    if(promise['[[PromiseState]]'] === 'pending'){

        const reactions = promise['[[PromiseRejectReactions]]'];
        //we don't do further resolutions about reason
        promise['[[PromiseResult]]'] = reason;
        promise['PromiseFulfillReactions'] = undefined;
        promise['PromiseRejectReactions'] = undefined;
        promise['[[PromiseState]]'] = 'rejected';
        triggerPromiseReactions(reactions,reason)
    }
}
function triggerPromiseReactions(reactions,reason){
    reactions = reactions || [];
    reactions.forEach(reaction=>{
        const handler = reaction.handler;
        const promiseCapability = reaction.Capability;
        const type = reaction.type;
        if(!handler){
            if(type === 'reject'){
                promiseCapability.reject.call(undefined,reason)
            }else if(type === 'fulfill'){
                promiseCapability.resolve.call(undefined,reason)
            }
        }else{
            const handlerResult = handler.call(this,reason);
            promiseCapability.resolve.call(undefined,handlerResult)
        }
    })
}

function enqueJobs(type,){

}

// export elements
module.exports = {
    Promise,
    createInstance
}