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
        this.disable = 'previous'
        this.data
        this.colors = new Array(38).fill('#333').map( elem => `#${(Math.random()*0xFFFFFF<<0).toString(16).padStart(6, 0)}`)
    }   

    fileSize(){
        return  (16 * this.generation * this.generation * (this.row + this.padding) + this.row) * 4
    } 

    generationSize(){
        return (this.row + this.padding) * this.generation
    }
    
};