const { newPromiseCapability } = require("../capability")
const { executeReaction } = require("../promsie-reaction")
module.exports = function then(onFulfilled,onRejected){
    const promise = this;
    const newCapability = newPromiseCapability();

    //create two new reactions
    const fulfillReaction = {
        Handler:onFulfilled,
        Type:'fulfill',
        Capability:newCapability
    }

    const rejectReaction = {
        Handler:onRejected,
        Type:'reject',
        Capability:newCapability
    }

    //return promise first
    //during nextTick determine what to do next by the state of this(promise)
    setTimeout(()=>{
        switch(promise.PromiseState){
            case "fulfilled":
                executeReaction(fulfillReaction,promise.PromiseResult)
                break;
            case "rejected":
                executeReaction(rejectReaction,promise.PromiseResult)
                break;
            default:
                promise.PromiseFulfillReactions.push(fulfillReaction);
                promise.PromiseRejectReactions.push(rejectReaction);
                break;
        }
    },0)
    return newCapability.promise
}