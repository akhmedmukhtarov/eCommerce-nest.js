import { ApiProperty } from "@nestjs/swagger"
import { IsDate, IsDefined, IsNotEmpty, IsOptional, IsString } from "class-validator"

export class CreateEventDto {

    @ApiProperty()
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    titleUz: string

    @ApiProperty()
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    titleRu: string

    @ApiProperty({type: 'Array of one or more pictures', example: ['url','url1']})
    @IsDefined()
    @IsNotEmpty()
    @IsString({each: true})
    image: string[]

    @ApiProperty()
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    url:string


    @ApiProperty()
    @IsOptional()
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    position?: string

    @ApiProperty()
    @IsOptional()
    @IsDefined()
    @IsNotEmpty()
    @IsDate()
    startsAt?: Date


    @ApiProperty()
    @IsOptional()
    @IsDefined()
    @IsNotEmpty()
    @IsDate()
    endsAt?: Date
}
