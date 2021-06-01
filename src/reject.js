const {triggerReactions} = require("./promsie-reaction")
module.exports = function(promise,value){
    if(promise.PromiseState === 'pending'){
        //extrat reactions from promise
        const reactions = promise.PromiseRejectReactions;
        
        //update promise properties
        promise.PromiseState = "rejected";
        promise.PromiseResult = value;
        promise.PromiseFulfillReactions = undefined;
        promise.PromiseRejectReactions = undefined;

        //execute then functions, base on this change
        triggerReactions(reactions,value)
    }
}