import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateShipmentDto {

    @IsString()
    @IsNotEmpty()
    addressee: string;

    @IsString()
    @IsNotEmpty()
    sender: string;

    @IsString()
    @IsNotEmpty()
    content: string;

    @IsString()
    @IsNotEmpty()
    send_date: string;

    @IsString()
    @IsNotEmpty()
    distance: string;

    @IsString()
    @IsNotEmpty()
    rate: string;

}