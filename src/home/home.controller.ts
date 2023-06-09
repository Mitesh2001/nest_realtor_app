import { Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { HomeService } from './home.service';
import { HomeResponseDto } from './dto/home.dto';
import { PropertyType } from '@prisma/client';

@Controller('home')
export class HomeController {

    constructor(private homeService : HomeService){}

    @Get()
    getHomes(
        @Query('city') city? : string,
        @Query('minPrice') minPrice? : string,
        @Query('maxPrice') maxPrice? : string,
        @Query('propertyType') propertyType? : PropertyType,
    ) : Promise<HomeResponseDto[]> {                  

        const filters = {
            ...(city && {city}),
            price : {

                ...(minPrice && {gte : parseFloat(minPrice)}),
                ...(maxPrice && {lte : parseFloat(maxPrice)})

            },
            ...(propertyType && {propertyType})
        }
        
        return this.homeService.getAllHomes(filters);
    }

    @Get(":id")
    getHomeById(@Param('id',ParseIntPipe) id : number) : Promise<HomeResponseDto> {
        return this.homeService.getHomeById(id)
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
