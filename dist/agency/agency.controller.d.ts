import { JwtService } from '@nestjs/jwt';
import { AgencyService } from './agency.service';
import { CreateAgencyDto } from './dto/create-agency.dto';
import { UpdateAgencyDto } from './dto/update-agency.dto';
export declare class AgencyController {
    private readonly agencyService;
    private jwt;
    constructor(agencyService: AgencyService, jwt: JwtService);
    create(createAgencyDto: CreateAgencyDto): Promise<number>;
    findAll(req: any): Promise<import("./entities/agency.entity").Agency[]>;
    loadData(): void;
    getLogs(): Promise<import("../logger/entities/logger.entity").Logger[]>;
    findOne(id: string): Promise<import("./entities/agency.entity").Agency>;
    update(id: string, updateAgencyDto: UpdateAgencyDto, req: any): Promise<import("./entities/agency.entity").Agency>;
    remove(id: string, req: any): Promise<import("typeorm").DeleteResult>;
}
