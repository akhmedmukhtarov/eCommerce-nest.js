import { Category } from "src/modules/category/entities/category.entity"

export class CreateProductDto {
    nameUz: string

    nameRu: string

    descShortUz?: string

    descShortRu?: string

    descriptionUz?: string

    descriptionRu?: string

    quantity: number

    price: number

    isFeatured?: boolean

    isPopular?: boolean

    isNew?: boolean

    discount?: number

    categoryId?: number[]

    status?: boolean

    images: string

    // attributeId?: number[]

    attributeValueId?: number[]
}
