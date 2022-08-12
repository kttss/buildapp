import { Repository } from 'typeorm';
import { AgencyService } from '../agency/agency.service';
import { CarService } from '../car/car.service';
import { ClientService } from '../client/client.service';
import { LoggerService } from '../logger/logger.service';
import { CreateContratDto } from './dto/create-contrat.dto';
import { UpdateContratDto } from './dto/update-contrat.dto';
import { Contrat } from './entities/contrat.entity';
import { JwtService } from '@nestjs/jwt';
export declare class ContratService {
    private contratRepository;
    private agenceService;
    private clientService;
    private carService;
    private readonly loggerService;
    private jwt;
    constructor(contratRepository: Repository<Contrat>, agenceService: AgencyService, clientService: ClientService, carService: CarService, loggerService: LoggerService, jwt: JwtService);
    create(createContratDto: CreateContratDto): Promise<number>;
    findAll(token?: string): Promise<Contrat[]>;
    findAllByAdmin(id: number): Promise<Contrat[]>;
    findOne(id: number): Promise<Contrat>;
    update(id: number, updateContratDto: UpdateContratDto): Promise<number>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
    getstatistique(token?: string): Promise<{
        totalMonth: number;
        totalYear: number;
        totalDisponible: number;
        totalPanne: number;
        totalReserved: number;
        top: any[];
    }>;
    generateContrat(id: number): Promise<any>;
    getBase64FromUrl(url: any): Promise<unknown>;
}
