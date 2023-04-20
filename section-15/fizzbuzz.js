// for loop
function checkNumber(number) {
    if (number% 3 === 0 && number% 5 === 0) {
        return "FizzBuzz";
    } else if (number% 3 === 0) {
        return "Fizz";
    } else if (number% 5 === 0) {
        return "Buzz";
    } else {
        return i;
    }
}
fizzBuzz = [];
for (var i = 1; i < 101; i++) {
    fizzBuzz.push(checkNumber(i))
}
console.log(fizzBuzz);

// while loop

fizzBuzz2 = [];
var i = 1;

while (i < 101) {
    fizzBuzz2.push(checkNumber(i));
    i++;
}

