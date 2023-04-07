import { IsDefined, IsNotEmpty, IsString } from "class-validator";

export class DeleteMediaDto{

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    url: string
}