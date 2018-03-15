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
    initData(){
        const row = this.context.row
        const rowSize = this.context.rowSize
        let fd = this.fd
        const SIZE = this.context.fileSize()
        return new Promise((resolve,reject) => {
                let buffer = new Float32Array(SIZE);
                let xAxis = new Float32Array(rowSize);
                fs.read(fd, buffer, null, SIZE , null, function(err, bytesRead) {
                    if(err) {
                        reject(err)
                    }
                    else {
                        xAxis = buffer.slice(0,row)
                        buffer = buffer.slice(row,-1)
                        resolve({buffer,xAxis})
                    }
                })
        })
    }
}