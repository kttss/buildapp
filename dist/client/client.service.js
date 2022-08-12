"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const document_entity_1 = require("../car/entities/document.entity");
const file_entity_1 = require("../car/entities/file.entity");
const logger_service_1 = require("../logger/logger.service");
const client_1 = require("../mock/client");
const client_entity_1 = require("./entities/client.entity");
let ClientService = class ClientService {
    constructor(clientRepository, documentRepository, fileRepository, loggerService, jwt) {
        this.clientRepository = clientRepository;
        this.documentRepository = documentRepository;
        this.fileRepository = fileRepository;
        this.loggerService = loggerService;
        this.jwt = jwt;
    }
    async create(createClientDto, token) {
        const { firstname, adresse, birthday, lastname, telephone, lieuNaissance, cin, villeCin, villePermis, datePermis, cinImages, permisImages, permis, dateCin, } = createClientDto;
        const client = new client_entity_1.Client();
        client.adresse = adresse;
        client.lastname = lastname;
        client.firstname = firstname;
        client.telephone = telephone;
        client.lieuNaissance = lieuNaissance;
        client.cin = cin;
        client.villeCin = villeCin;
        client.villePermis = villePermis;
        client.datePermis = datePermis;
        client.birthday = birthday;
        client.permis = permis;
        client.dateCin = dateCin;
        const res = await this.clientRepository.save(client);
        const fileCinList = [];
        const cindoc = new document_entity_1.Document();
        cindoc.DateExpiration = null;
        cindoc.client = client;
        cinImages.forEach((f) => {
            const file = new file_entity_1.File();
            file.path = f;
            fileCinList.push(file);
        });
        await this.fileRepository.save([...fileCinList]);
        cindoc.files = [...fileCinList];
        await this.documentRepository.save(cindoc);
        client.cinFiles = cindoc;
        const filePermisList = [];
        const permisdoc = new document_entity_1.Document();
        permisdoc.DateExpiration = null;
        permisdoc.client = client;
        permisImages.forEach((f) => {
            const file = new file_entity_1.File();
            file.path = f;
            filePermisList.push(file);
        });
        await this.fileRepository.save([...filePermisList]);
        permisdoc.files = [...filePermisList];
        await this.documentRepository.save(permisdoc);
        client.permisFiles = permisdoc;
        await this.clientRepository.save(client);
        if (token) {
            const jwtDecoded = this.jwt.decode(token.split(' ')[1]);
            this.loggerService.create(jwtDecoded, 'a ajouter un client id:' + res.id);
        }
        return res.id;
    }
    findAll() {
        return this.clientRepository.find();
    }
    async findOne(id) {
        return await this.clientRepository
            .createQueryBuilder('client')
            .leftJoinAndSelect('client.cinFiles', 'cin')
            .leftJoinAndSelect('client.permisFiles', 'permisFiles')
            .where({ id: id })
            .getOne();
    }
    async findDocByID(id) {
        return await this.documentRepository
            .createQueryBuilder('document')
            .leftJoinAndSelect('document.files', 'files')
            .where({ id: id })
            .getOne();
    }
    async update(id, updateClientDto, token) {
        const { firstname, adresse, birthday, lastname, telephone, lieuNaissance, cin, villeCin, villePermis, datePermis, cinImages, permisImages, permis, dateCin, } = updateClientDto;
        const client = await this.findOne(id);
        if (!client) {
            throw new common_1.NotFoundException('Client is not found');
        }
        client.firstname = firstname;
        client.adresse = adresse;
        client.birthday = birthday;
        client.lastname = lastname;
        client.telephone = telephone;
        client.lieuNaissance = lieuNaissance;
        client.cin = cin;
        client.villeCin = villeCin;
        client.villePermis = villePermis;
        client.datePermis = datePermis;
        client.permis = permis;
        client.dateCin = dateCin;
        const docCin = await this.documentRepository.findOne({
            where: [{ id: client.cinFiles.id }],
        });
        const docPermis = await this.documentRepository.findOne({
            where: [{ id: client.permisFiles.id }],
        });
        this.fileRepository
            .createQueryBuilder()
            .delete()
            .from(file_entity_1.File)
            .where('file.documentId IN (:id)', { id: [docCin.id, docPermis.id] })
            .execute();
        const fileCinList = [];
        cinImages.forEach((f) => {
            const file = new file_entity_1.File();
            file.path = f;
            fileCinList.push(file);
        });
        await this.fileRepository.save([...fileCinList]);
        docCin.files = [...fileCinList];
        await this.documentRepository.save(docCin);
        const filePermisList = [];
        permisImages.forEach((f) => {
            const file = new file_entity_1.File();
            file.path = f;
            filePermisList.push(file);
        });
        await this.fileRepository.save([...filePermisList]);
        docPermis.files = [...filePermisList];
        await this.documentRepository.save(docPermis);
        await this.clientRepository.save(client);
        const jwtDecoded = this.jwt.decode(token.split(' ')[1]);
        this.loggerService.create(jwtDecoded, 'est modifier un client id:' + client.id);
        return client;
    }
    async remove(id, token) {
        const jwtDecoded = this.jwt.decode(token.split(' ')[1]);
        this.loggerService.create(jwtDecoded, 'a supprimer un client id:' + id);
        return this.clientRepository.delete(id);
    }
    loadMockData() {
        const list = client_1.ClIENTS;
        list.forEach((a) => {
            this.create(a);
        });
    }
};
ClientService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(client_entity_1.Client)),
    __param(1, (0, typeorm_1.InjectRepository)(document_entity_1.Document)),
    __param(2, (0, typeorm_1.InjectRepository)(file_entity_1.File)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        logger_service_1.LoggerService,
        jwt_1.JwtService])
], ClientService);
exports.ClientService = ClientService;
//# sourceMappingURL=client.service.js.map