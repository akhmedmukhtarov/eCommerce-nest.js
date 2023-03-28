type ProductIdAndQty = {
    productId: number
    qty: number
}
export class CreateOrderDto {

    userid: number

    productIdAndQty: ProductIdAndQty[]

    paymentStatus: "paid"|"unpaid"

    paymentMethod: 'cod'| "click" | "payme" | "apelsin"

    note?: string

    status?: 'pending'|'processing'| 'onTheWay'|'delivered'|'canceled'

    deliveryPrice?: number

    deliveryAddress: string 

    deliveryPhone: string

    refundRequestedAt?: Date

    refundedAt?: Date

}
