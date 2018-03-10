/** 
 * Class 
 */
module.exports = class Context {
    constructor(row,padding,generation){
        this.row = row
        this.generation = generation
        this.padding = padding
        this.rowSize = row*4
        this.position = 0
    }   
};