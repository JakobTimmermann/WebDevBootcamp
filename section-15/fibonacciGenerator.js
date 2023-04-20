function fibonacciGenerator (n) {
    if (n === 0) {
        return [];
    } else if (n === 1) {
        return [0];
    }

    output = [0, 1];
    for (var i = 2; i < n; i++) {
        output.push(output[i-1] + output[i-2]);
    }
    return output.slice(0,n);
}

output = fibonacciGenerator(4);
console.log(output);