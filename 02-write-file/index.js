const fs = require('fs');
const path = require('path');
const readline = require('readline');
const {stdin} = require('process');

const rl = readline.createInterface(stdin);

const stream = fs.createWriteStream(
    path.join(__dirname, 'text.txt'),
    'utf-8',
    err => {
        if (err) {
            console.log('Error', err.message)
        }
    }
);

console.log('Hello. Write some text');

rl.on('line', (data) => {
    if (data.toString() === 'exit'){
        console.log('Ok. Your text write to file "text.txt".');
        process.exit();
    }
    else {
        stream.write(data.toString() + '\n');
    }
});

process.on('SIGINT', () => {
    console.log('Ok. Your text write to file "text.txt".');
    process.exit();
})