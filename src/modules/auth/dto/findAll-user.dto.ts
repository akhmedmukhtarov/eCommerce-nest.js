import { Transform } from "class-transformer"
import { IsInt, IsOptional, IsString } from "class-validator"

export class FindAllUserDto{
    

    @IsOptional()
    @Transform(({value})=>{
        return Number(value)
    })
    @IsInt()
    page? : number

    @IsOptional()
    @Transform(({value})=>{
        return Number(value)
    })
    @IsInt()
    limit?: string

    @IsOptional()
    @IsString()
    search: string
}