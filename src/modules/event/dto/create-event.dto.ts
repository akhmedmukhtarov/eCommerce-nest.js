import { IsDate, IsDefined, IsNotEmpty, IsOptional, IsString } from "class-validator"

export class CreateEventDto {

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    titleUz: string

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    titleRu: string

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    image: string

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    url:string


    @IsOptional()
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    position?: string

    @IsOptional()
    @IsDefined()
    @IsNotEmpty()
    @IsDate()
    startsAt?: Date


    @IsOptional()
    @IsDefined()
    @IsNotEmpty()
    @IsDate()
    endsAt?: Date
}
