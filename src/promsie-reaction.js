const {isFunction} = require("./utils")
function triggerReactions(reactions,value){
    reactions.forEach(reaction=>{
        setTimeout(()=>{
            executeReaction(reaction,value)
        },0)
    })
}
function executeReaction(reaction,value){
    const capability = reaction.Capability;
    const handler = reaction.Handler;
    const type = reaction.Type;
    let handlerResult = value;

    if(!isFunction(handler)){
        if(type === 'reject'){
            capability.reject(handlerResult);
        }else{
            capability.resolve(handlerResult);
        }
    }else{
        try{
            handlerResult = handler(value);

            capability.resolve(handlerResult);
        }catch(e){
            capability.reject(e);
        }
    }
}
module.exports = {
    triggerReactions,
    executeReaction
}