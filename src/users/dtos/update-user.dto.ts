import { IsEmail, IsString, IsOptional } from 'class-validator';

export class UdpateUserDto {
    @IsEmail()
    @IsOptional()
    email: string;
    @IsString()
    @IsOptional()
    password: string;
}