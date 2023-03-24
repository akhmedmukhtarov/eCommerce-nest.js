import { Transform } from "class-transformer"
import { IsBoolean, IsNotEmpty } from "class-validator"

export class CreateCategoryDto{
    
    nameUz: string

    nameRu: string

    parentId?: number

    position?: string

    isFeatured?: boolean

    @IsNotEmpty()
    @IsBoolean()
    @Transform(({value}) => value === 1 ? true : false)
    status?: boolean

    images: string
}

/**
 * [{url: "123.jpg", garbage: 123}]
 */