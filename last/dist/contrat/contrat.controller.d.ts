import { ContratService } from './contrat.service';
import { CreateContratDto } from './dto/create-contrat.dto';
import { UpdateContratDto } from './dto/update-contrat.dto';
export declare class ContratController {
    private readonly contratService;
    constructor(contratService: ContratService);
    create(createContratDto: CreateContratDto): Promise<number>;
    findAll(req: any): Promise<import("./entities/contrat.entity").Contrat[]>;
    generatePdf(id: string): Promise<any>;
    getstatistique(req: any): Promise<{
        totalMonth: number;
        totalYear: number;
        totalDisponible: number;
        totalPanne: number;
        totalReserved: number;
        top: any[];
    }>;
    findOne(id: string): Promise<import("./entities/contrat.entity").Contrat>;
    update(id: string, updateContratDto: UpdateContratDto): Promise<number>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
