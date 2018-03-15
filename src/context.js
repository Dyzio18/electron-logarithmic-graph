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
        this.data
    }   

    fileSize(){
        return  (16 * this.generation * this.generation * (this.row + this.padding) + this.row) * 4
    } 

    generationSize(){
        return (this.row + this.padding) * this.generation
    }
    
};