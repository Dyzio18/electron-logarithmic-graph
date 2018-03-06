
const fs = require('fs');
const fileName = './baza.bin';

let position = 0;
let length = 4;
let row = 120;

fs.open(fileName, 'r', function(err, fd) {
    if(err) {
        // TODO: display error in app
        // ...
        return console.error(err.message);
    }

    let buffer = new Buffer(row*length);

    position = fs.read(fd, buffer, 0, row*length, position, function(err, bytesRead) {
        if(err) {
            return console.error(err);
        }

        //console.log(buffer.readFloatLE(8));
    });
    for(let i = 0; i < row*length; i=i+4){
        console.log(buffer.readFloatLE(i));
    }
});

