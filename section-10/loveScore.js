var loveScore = Math.random() * 101;
loveScore = Math.floor(loveScore);

if (loveScore > 75) {
    console.log(`Your love score is through the roof! ${loveScore}%`);
} else if (loveScore > 30) {
    console.log(`Your love score is ${loveScore}%`);
} else {
    console.log(`Your love score sucks! ${loveScore}`);
} 