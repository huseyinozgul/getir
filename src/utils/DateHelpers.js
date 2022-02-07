/**
 * Adds n day to date and returns new instance.
 * @param {Date|string} dt
 * @param {number} n
 * @returns {Date}
 */

const addDay = (dt, n) => {
    const result = new Date(dt);
    result.setDate(result.getDate() + n);
    return result;
}

module.exports = {
    addDay
}