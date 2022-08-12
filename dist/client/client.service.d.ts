import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { Document } from '../car/entities/document.entity';
import { File } from '../car/entities/file.entity';
import { LoggerService } from '../logger/logger.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';
export declare class ClientService {
    private clientRepository;
    private documentRepository;
    private fileRepository;
    private readonly loggerService;
    private jwt;
    constructor(clientRepository: Repository<Client>, documentRepository: Repository<Document>, fileRepository: Repository<File>, loggerService: LoggerService, jwt: JwtService);
    create(createClientDto: CreateClientDto, token?: string): Promise<number>;
    findAll(): Promise<Client[]>;
    findOne(id: number): Promise<Client>;
    findDocByID(id: number): Promise<Document>;
    update(id: number, updateClientDto: UpdateClientDto, token: string): Promise<Client>;
    remove(id: number, token: string): Promise<import("typeorm").DeleteResult>;
    loadMockData(): void;
}
