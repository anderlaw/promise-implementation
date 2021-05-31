const {isFunction} = require("./utils")
function triggerReactions(reactions,value){
    reactions.forEach(reaction=>{
        executeReaction(reaction,value)
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
        setTimeout(()=>{
            try{
                handlerResult = handler(value);
                capability.resolve(handlerResult);
            }catch(e){
                capability.reject(e);
            }
        },0)
        
    }
}
module.exports = {
    triggerReactions,
    executeReaction
}