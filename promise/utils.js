var obj = {};
const toString = obj.toString;

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
    return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
    return toString.call(val) === '[object Function]';
}
  
// export const 
module.exports = {
    isFn:isFunction,
    isFunction,
    isObj:isObject,
    isObject,
    assignProps:(target,src) => Object.assign(target,src)
}