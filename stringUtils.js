function isUpper(str) {
    var m = str.match(/^[A-Z]$/);
    return m !== null;
}

function isLower(str) {
    var m = str.match(/^[a-z]$/);
    return m !== null;
}

function isNumber(str) {
    var m = str.match(/^[0-9]$/);
    return m !== null;
}

module.exports = {
	isUpper: isUpper,
    isLower: isLower,
    isNumber: isNumber
};
