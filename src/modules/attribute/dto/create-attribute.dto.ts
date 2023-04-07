import { IsDefined, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateAttributeDto {

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    nameUz: string;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    nameRu: string;

    @IsOptional()
    @IsString()
    isFilterable?: boolean;
}
