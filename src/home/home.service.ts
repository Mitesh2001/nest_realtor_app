import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { HomeResponseDto } from './dto/home.dto';
import { PropertyType } from '@prisma/client';

interface GetHomesParam {
    city? : string,
    price? : {
        gte? :number,
        lte? :number
    },
    propertyType? : PropertyType
}

@Injectable()
export class HomeService {

    constructor(private prismaService : PrismaService){}

    getAllHomes = async (filters : GetHomesParam) : Promise<HomeResponseDto[]> => {

        const homes = await this.prismaService.home.findMany({
            select : {
                id : true,
                address : true,
                city : true,
                price : true,
                propertyType : true,
                number_of_bedrooms : true,
                number_of_bathrooms : true,
                listed_date : true,
                images : {
                    select : {url : true},
                    take : 1
                }
            },
            where : filters       
        });

        (!homes.length === true) && ((message) => { throw new NotFoundException(message) })("Sorry, Any Home not Found !");
        
        return homes.map(home => {
            const fetchHome = {...home,image : home.images[0].url}
            delete fetchHome.images;
            return new HomeResponseDto(fetchHome)
        });

    }
    
    getHomeById = async (id : number) => {
        const home = await this.prismaService.home.findUnique({
           where : {id}
        })

        return new HomeResponseDto(home);
    }

}
