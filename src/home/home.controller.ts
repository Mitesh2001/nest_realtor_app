import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { HomeService } from './home.service';
import { HomeResponseDto } from './dto/home.dto';

@Controller('home')
export class HomeController {

    constructor(private homeService : HomeService){}

    @Get()
    getHomes() : Promise<HomeResponseDto[]> {
        return this.homeService.getAllHomes();
    }

    @Get(":id")
    getHomeById(){
        return {}
    }    

    @Post()
    createHome(){
        return {}
    }

    @Put(":id")
    updateHome(){
        return {}
    }

    @Delete(":id")
    deleteHome(){

    }

}
