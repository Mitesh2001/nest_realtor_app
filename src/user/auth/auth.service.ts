import { ConflictException, HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from "bcryptjs";
import { UserType } from '@prisma/client';
import  * as jwt  from 'jsonwebtoken';

interface SignUpParams {
    email : string;
    password : string;
    name : string;
    phone : string;
}

interface SignInParams {
    email : string;
    password : string;
}

@Injectable()
export class AuthService {

    constructor( private readonly prismaService : PrismaService ) {}

    signUp = async (

        { email,password,name,phone } : SignUpParams

    ) => {

        if(await this.prismaService.user.findUnique({where : {email}})){
            throw new ConflictException;
        }        
        const user = await this.prismaService.user.create({
            data : {
                email,
                password : await bcrypt.hash(password,10),
                name,
                phone,
                user_type : UserType.BUYER
            }
        })

        const token = this.generateJWT(user.name, user.id);

        return {token}

    }

    signIn = async (

        { email, password } : SignInParams

    ) => {
        const user = await this.prismaService.user.findUnique({
            where : {
                email
            }
        })
        
        if (!user) {
            throw new HttpException('Invalid credentials', 400);
        }
        
        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            throw new HttpException('Invalid credentials', 400);
        }

        const token = this.generateJWT(user.name, user.id);    

        return {token}

    }    

    generateProductKey = (email:string, userType : UserType) => bcrypt.hash(`${email}-${userType}-${process.env.PRODUCT_KEY_SECRET}`, 10) ;

    private generateJWT = (name : string, id : number) : string => jwt.sign({name,id},process.env.JWT_SECRET_KEY, {expiresIn : 360000}) ;
        
}
