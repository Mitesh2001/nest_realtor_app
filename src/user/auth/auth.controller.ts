import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signInDto, signUpDto } from '../dto/auth.dto';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService : AuthService){}

    @Post('/signup')
    signup (
        @Body() body : signUpDto
    ) {
        return this.authService.signUp(body);    
    }

    @Post('/signin')
    signin (
        @Body() body : signInDto
    ) {
        return this.authService.signIn(body);    
    }

}
