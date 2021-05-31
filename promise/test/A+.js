require("../index");
const {createResolvingFunctions} = require("../resolve")
module.exports = {
    resolved(value){
        return new Promise((res)=>{
            res(value)
        })
    },
    rejected(value){
        return new Promise((res,rej)=>{
            rej(value)
        })
    },
    deferred(){
        const promise = new Promise(()=>{});
        const resolveingFunctions = createResolvingFunctions(promise);
        return {
            promise,
            resolve:resolveingFunctions.resolve,
            reject:resolveingFunctions.reject
        }
    }
}