export class FindAllOrdersDto{

    userId?: string

    from: string

    to: string

    status?: 'pending'|'processing'| 'ontheway'|'delivered'|'cancelled'

}