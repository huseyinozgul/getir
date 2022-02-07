/**
 * Creates new object by given keys that match each property
 * @param {Object} object
 * @param {string[]} keys
 * @returns {Object}
 */
const getMatched = (object, keys) => {
    return keys.reduce((obj, key) => {
        if (object && Object.prototype.hasOwnProperty.call(object, key)) {
            obj[key] = object[key];
        }
        return obj;
    }, {});
};

module.exports = getMatched;