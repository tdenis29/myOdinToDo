export class Todo {
    constructor(id, title, desc, pri, dd, complete = false){
        this.id = id;
        this.title = title
        this.dd = dd
        this.desc = desc
        this.pri = pri 
        this.complete = complete
    }
}