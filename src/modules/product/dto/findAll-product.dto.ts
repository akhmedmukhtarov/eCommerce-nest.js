type ascDesc = "asc"|"desc"|"ASC"|"DESC"
export class FindAllProductDto {
    page?: string
    limit?: string
    attr?: string
    category?: string
    brand?: string
    date: ascDesc
    isnew: ascDesc
    isfeatured: ascDesc
    orderCount: ascDesc
    viewcount: ascDesc
  }