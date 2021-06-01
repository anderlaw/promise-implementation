const {triggerReactions} = require("./promsie-reaction")
module.exports = function(promise,value){
    if(promise.PromiseState === 'pending'){
        //extrat reactions from promise
        const reactions = promise.PromiseFulfillReactions;
        
        //update promise properties
        promise.PromiseState = "fulfilled";
        promise.PromiseResult = value;
        promise.PromiseFulfillReactions = undefined;
        promise.PromiseRejectReactions = undefined;

        //execute then functions, base on this change
        triggerReactions(reactions,value)
    }
}