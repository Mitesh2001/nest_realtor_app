import { Body, Controller, Param, ParseEnumPipe, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { generateProductKeyDto, signInDto, signUpDto } from '../dto/auth.dto';
import { UserType } from '@prisma/client';
import * as bcrypt from "bcryptjs";


@Controller('auth')
export class AuthController {

    constructor(private readonly authService : AuthService){}

    @Post('/signup/:userType')
    async signup (
        @Body() body : signUpDto,
        @Param('userType', new ParseEnumPipe(UserType)) userType : UserType
    ) {

        if (userType != UserType.BUYER) {
            if (!body.productKey) {
                throw new UnauthorizedException();
            }
            
            const validProductKey = `${body.email}-${userType}-${process.env.PRODUCT_KEY_SECRET}`;

            const isValidProductKey =  await bcrypt.compare(validProductKey,body.productKey);

            if(!isValidProductKey){
                throw new UnauthorizedException();
            }

        }

        return this.authService.signUp(body);    
    }

    @Post('/signin')
    signin (
        @Body() body : signInDto
    ) {
        return this.authService.signIn(body);    
    }
    
    @Post('/key')
    generateProductKey(@Body() {email, userType} : generateProductKeyDto ){
        return this.authService.generateProductKey(email, userType)
    }

}
