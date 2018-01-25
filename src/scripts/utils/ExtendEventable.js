const Eventable = require('./Eventable');

/**
 * @param {Function} Extendable
 * @return {Function} Extendable
 */
function ExtendEventable(Extendable) {
    for (let proto in Eventable.prototype) {
        Extendable.prototype[proto] = Eventable.prototype[proto];
    }
    return Extendable;
}

module.exports = ExtendEventable;
