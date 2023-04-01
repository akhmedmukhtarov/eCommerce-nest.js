export class Pagination{
    page: number
    limit: number
    skippedItems: number
    constructor(page:string,limit:string, maxItems: string){
        this.page = +page
        this.limit = +limit || (+maxItems)
        this.limit = this.limit > +maxItems ? +maxItems : this.limit
        this.skippedItems = ((this.page || 1) - 1) * this.limit


    }
}