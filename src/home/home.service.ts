import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { HomeResponseDto } from './dto/home.dto';

@Injectable()
export class HomeService {

    constructor(private prismaService : PrismaService){}

    getAllHomes = async () : Promise<HomeResponseDto[]> => {
        const homes = await this.prismaService.home.findMany();
        return homes.map(home => new HomeResponseDto(home));
    }

}
