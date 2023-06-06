import { UserType } from "@prisma/client"
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Matches, MinLength, isString } from "class-validator"

export class signUpDto {

    @IsString()
    @IsNotEmpty()
    name : string

    @Matches(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/,{message : 'Phone should be valid phone number !'})
    phone : string

    @IsEmail()
    email : string

    @IsString()
    @MinLength(5)
    password : string

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    productKey? : string
    
}

export class signInDto {

    @IsEmail()
    email : string

    @IsString()
    password : string    
}

export class generateProductKeyDto {
    @IsEmail()
    email : string

    @IsEnum(UserType)
    userType : UserType
}