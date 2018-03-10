const fs = require('fs')

module.exports = class Data {
    constructor(obj,filename){
        this.context = obj
        this.filename = filename
        this.fd = fs.openSync(this.filename, 'r')
    }


    /**
     *   readGeneration() returns Promise object
     *   Object contains numeric data and current position
     *   Generation is collection of many plots
     */
    readGeneration(){
        const row = this.context.row
        const rowSize = this.context.rowSize
        let fd = this.fd
        const SIZE = (16 * this.context.generation * this.context.generation * (row + this.context.padding) + row) * 4
        return new Promise((resolve,reject) => {
                let buffer = new Float32Array(SIZE);
                let xAxis = new Float32Array(rowSize);
                fs.read(fd, buffer, null, SIZE , null, function(err, bytesRead) {
                    if(err) {
                        reject(err)
                    }
                    else {
                        xAxis = buffer.slice(0,120)
                        buffer = buffer.slice(120,-1)
                        resolve({buffer,xAxis})
                    }
                })
        })
    }
}