import { ApiProperty } from "@nestjs/swagger"
import { Transform } from "class-transformer"
import { IsInt, IsOptional, IsString } from "class-validator"

export class FindAllUserDto{
    

    @ApiProperty()
    @IsOptional()
    @Transform(({value})=>{
        return Number(value)
    })
    @IsInt()
    page? : number

    @ApiProperty()
    @IsOptional()
    @Transform(({value})=>{
        return Number(value)
    })
    @IsInt()
    limit?: string

    @ApiProperty()
    @IsOptional()
    @IsString()
    search: string
}