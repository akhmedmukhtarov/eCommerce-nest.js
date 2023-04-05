type ProductIdAndQty = {
    productId: number
    qty: number
}
export class CreateOrderDto {

    productIdAndQty: ProductIdAndQty[]

    paymentStatus: "paid"|"unpaid"

    paymentMethod: 'cod'| "click" | "payme" | "apelsin"

    note?: string

    status?: 'pending'|'processing'| 'ontheway'|'delivered'|'cancelled'

    deliveryPrice?: number

    deliveryAddress: string 

    deliveryPhone: string

    refundRequestedAt?: Date

    refundedAt?: Date

}
