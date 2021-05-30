/**
 * this file will
 * exports prototyped methods of Promise
 */
const then = require('./then')
const _catch = require('./catch')
module.exports = {
    then,
    catch:_catch
}