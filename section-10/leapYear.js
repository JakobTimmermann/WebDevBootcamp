function isLeap(year) {
    if (year%400 === 0) {
        var isLeap = true;
    } else if (year%100 === 0) {
        var isLeap = false;
    } else if (year%4 == 0) {
        var isLeap = true;
    } else {
        var isLeap = false;
    }

    return isLeap
}

console.log(`Should be false: ${isLeap(2105)}`);
console.log(`Should be true: ${isLeap(2104)}`);
console.log(`Should be false: ${isLeap(2100)}`);
console.log(`Should be true: ${isLeap(2000)}`);


