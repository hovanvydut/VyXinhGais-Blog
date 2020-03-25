function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
}

function generateId(length = 5) {
    let id = '';
    for (let i = 1; i <= length; i += 1) {
        id += `${s4()}-`;
    }
    return id.substring(0, id.length - 1);
}

module.exports = generateId;
