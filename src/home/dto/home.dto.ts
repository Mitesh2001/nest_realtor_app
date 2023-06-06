import { PropertyType } from "@prisma/client";
import { Exclude, Expose } from "class-transformer";

export class HomeResponseDto {
    id: number;
    address: string;
    
    @Exclude()
    @Expose({name : 'numberOfBadrooms'})
    numberOfBadrooms = () => {
        return this.number_of_bathrooms
    }
    number_of_bedrooms: number;

    @Exclude()
    @Expose({name : 'numberOfBathrooms'})
    numberOfBathrooms = () => {
        return this.number_of_bathrooms
    }
    number_of_bathrooms: number;

    city: string ;

    @Exclude()
    @Expose({name : 'listedDate'})
    listedDate = () => {
        return this.listed_date
    }
    listed_date: Date;

    price: number;

    @Exclude()
    @Expose({name : 'landSize'})
    landSize = () => {
        return this.land_size
    }
    land_size: number;

    propertyType: PropertyType;

    @Exclude()
    created_at: number;
    
    @Exclude()
    updated_at: number;

    @Exclude()
    realtor_id: number

    constructor(partial: Partial<HomeResponseDto>) {
        Object.assign(this, partial);
    }

}