import { JwtService } from '@nestjs/jwt';
import { CarService } from './car.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
export declare class CarController {
    private readonly carService;
    private jwt;
    constructor(carService: CarService, jwt: JwtService);
    create(createCarDto: CreateCarDto, req: any): Promise<number>;
    findAll(req: any): Promise<import("./entities/car.entity").Car[]>;
    loadData(): void;
    findOne(id: string): Promise<import("./entities/car.entity").Car>;
    update(id: string, updateCarDto: UpdateCarDto, req: any): Promise<number>;
    remove(id: string, req: any): Promise<import("typeorm").DeleteResult>;
}
