import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
export declare class ClientController {
    private readonly clientService;
    constructor(clientService: ClientService);
    create(createClientDto: CreateClientDto, req: any): Promise<number>;
    findAll(): Promise<import("./entities/client.entity").Client[]>;
    loadData(): void;
    findOne(id: string): Promise<import("./entities/client.entity").Client>;
    findDocument(id: string): Promise<import("../car/entities/document.entity").Document>;
    update(id: string, updateClientDto: UpdateClientDto, req: any): Promise<import("./entities/client.entity").Client>;
    remove(id: string, req: any): Promise<import("typeorm").DeleteResult>;
}
