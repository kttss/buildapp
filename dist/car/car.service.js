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
exports.CarService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const agency_service_1 = require("../agency/agency.service");
const agency_entity_1 = require("../agency/entities/agency.entity");
const logger_service_1 = require("../logger/logger.service");
const car_1 = require("../mock/car");
const role_enum_1 = require("../user/enums/role.enum");
const car_entity_1 = require("./entities/car.entity");
const document_entity_1 = require("./entities/document.entity");
const file_entity_1 = require("./entities/file.entity");
let CarService = class CarService {
    constructor(carRepository, agenceRepository, documentRepository, fileRepository, agenceService, loggerService, jwt) {
        this.carRepository = carRepository;
        this.agenceRepository = agenceRepository;
        this.documentRepository = documentRepository;
        this.fileRepository = fileRepository;
        this.agenceService = agenceService;
        this.loggerService = loggerService;
        this.jwt = jwt;
    }
    async create(createCarDto, token) {
        const { agence, marque, model, matricule, carburant, statut, description, carteGriseImages, carteGriseDateExpertation, autorisationCirculationImages, autorisationCirculationDateExpertation, assuranceImages, assuranceDateExpertation, vignetteImages, vignetteDateExpertation, visiteImages, visiteeDateExpertation, dateVidange, } = createCarDto;
        const car = new car_entity_1.Car();
        const ageneceEnti = await this.agenceService.findOne(agence);
        car.agence = ageneceEnti;
        car.carburant = carburant;
        car.description = description;
        car.marque = marque;
        car.matricule = matricule;
        car.model = model;
        car.statut = statut;
        car.dateVidange = dateVidange;
        await this.carRepository.save(car);
        const carteGrise = this.saveDocument(car, carteGriseDateExpertation, carteGriseImages);
        const autorisationCirculation = this.saveDocument(car, autorisationCirculationDateExpertation, autorisationCirculationImages);
        const assurance = this.saveDocument(car, assuranceDateExpertation, assuranceImages);
        const vignette = this.saveDocument(car, vignetteDateExpertation, vignetteImages);
        car.carteGrise = await carteGrise;
        car.autorisationCirculation = await autorisationCirculation;
        car.assurance = await assurance;
        car.vignette = await vignette;
        if (visiteeDateExpertation || (visiteImages && visiteImages.length)) {
            const visite = this.saveDocument(car, visiteeDateExpertation, visiteImages);
            car.visite = await visite;
        }
        const res = await this.carRepository.save(car);
        ageneceEnti.cars.push(car);
        await this.agenceRepository.save(ageneceEnti);
        if (token) {
            const jwtDecoded = this.jwt.decode(token.split(' ')[1]);
            this.loggerService.create(jwtDecoded, 'a ajouter une voiture id:' + res.id);
        }
        return res.id;
    }
    async findAll(token) {
        const jwtDecoded = this.jwt.decode(token.split(' ')[1]);
        if (jwtDecoded.role === role_enum_1.RoleEnum.Admin) {
            return this.carRepository
                .createQueryBuilder('car')
                .leftJoinAndSelect('car.carteGrise', 'carteGrise')
                .leftJoinAndSelect('car.autorisationCirculation', 'autorisationCirculation')
                .leftJoinAndSelect('car.assurance', 'assurance')
                .leftJoinAndSelect('car.vignette', 'vignette')
                .leftJoinAndSelect('car.visite', 'visite')
                .getMany();
        }
        else {
            return this.findAllByAdmin(jwtDecoded.id);
        }
    }
    async findAllByAdmin(id) {
        const agences = await this.agenceService.findAllByAdmin(id);
        const agencesIds = agences.map((a) => a.id);
        const result = await this.carRepository
            .createQueryBuilder('car')
            .leftJoinAndSelect('car.carteGrise', 'cart')
            .where('car.agenceId IN (:...ids)', { ids: [...agencesIds] })
            .getMany();
        return result;
    }
    async findOne(id) {
        return await this.carRepository
            .createQueryBuilder('car')
            .leftJoinAndSelect('car.carteGrise', 'carteGrise')
            .leftJoinAndSelect('car.autorisationCirculation', 'autorisationCirculation')
            .leftJoinAndSelect('car.assurance', 'assurance')
            .leftJoinAndSelect('car.vignette', 'vignette')
            .leftJoinAndSelect('car.visite', 'visite')
            .leftJoinAndSelect('car.agence', 'agence')
            .where({ id: id })
            .getOne();
    }
    async update(id, updateCarDto, token) {
        const { marque, model, matricule, carburant, statut, description, carteGriseImages, carteGriseDateExpertation, autorisationCirculationImages, autorisationCirculationDateExpertation, assuranceImages, assuranceDateExpertation, vignetteImages, vignetteDateExpertation, visiteImages, visiteeDateExpertation, agence, dateVidange, } = updateCarDto;
        const car = await this.findOne(id);
        if (!car) {
            throw new common_1.NotFoundException('car is not found');
        }
        const ageneceEnti = await this.agenceService.findOne(agence);
        car.carburant = carburant;
        car.description = description;
        car.marque = marque;
        car.matricule = matricule;
        car.model = model;
        car.statut = statut;
        car.agence = ageneceEnti;
        car.dateVidange = dateVidange;
        const carteGriseDoc = await this.documentRepository.findOne({
            where: [{ id: car.carteGrise.id }],
        });
        const autorisationCirculationDoc = await this.documentRepository.findOne({
            where: [{ id: car.autorisationCirculation.id }],
        });
        const assuranceDoc = await this.documentRepository.findOne({
            where: [{ id: car.assurance.id }],
        });
        const vignetteDoc = await this.documentRepository.findOne({
            where: [{ id: car.vignette.id }],
        });
        const idss = [
            carteGriseDoc.id,
            autorisationCirculationDoc.id,
            assuranceDoc.id,
            vignetteDoc.id,
        ];
        let visiteDoc;
        if (car.visite) {
            visiteDoc = await this.documentRepository.findOne({
                where: [{ id: car.visite.id }],
            });
            idss.push(visiteDoc.id);
        }
        this.fileRepository
            .createQueryBuilder()
            .delete()
            .from(file_entity_1.File)
            .where('file.documentId IN (:id)', {
            id: [...idss],
        })
            .execute();
        const carteGrise = this.saveDocument(car, carteGriseDateExpertation, carteGriseImages, carteGriseDoc);
        const autorisationCirculation = this.saveDocument(car, autorisationCirculationDateExpertation, autorisationCirculationImages, autorisationCirculationDoc);
        const assurance = this.saveDocument(car, assuranceDateExpertation, assuranceImages, assuranceDoc);
        const vignette = this.saveDocument(car, vignetteDateExpertation, vignetteImages, vignetteDoc);
        if (visiteDoc) {
            const visite = this.saveDocument(car, visiteeDateExpertation, visiteImages, visiteDoc);
        }
        else if (visiteeDateExpertation ||
            (visiteImages && visiteImages.length)) {
            const visite = this.saveDocument(car, visiteeDateExpertation, visiteImages);
            car.visite = await visite;
        }
        const res = await this.carRepository.save(car);
        ageneceEnti.cars.push(car);
        await this.agenceRepository.save(ageneceEnti);
        const jwtDecoded = this.jwt.decode(token.split(' ')[1]);
        this.loggerService.create(jwtDecoded, 'est modifier une voiture id:' + res.id);
        return res.id;
    }
    async remove(id, token) {
        const jwtDecoded = this.jwt.decode(token.split(' ')[1]);
        this.loggerService.create(jwtDecoded, 'a supprimer une voiture id:' + id);
        return this.carRepository.delete(id);
    }
    loadMockData() {
        const agenceList = car_1.CARS;
        agenceList.forEach((car) => {
            this.create(car);
        });
    }
    async saveDocument(car, date, files, document) {
        const fileList = [];
        const doc = document ? document : new document_entity_1.Document();
        doc.DateExpiration = date ? date : null;
        doc.car = car;
        files.forEach((f) => {
            const file = new file_entity_1.File();
            file.path = f;
            fileList.push(file);
        });
        await this.fileRepository.save([...fileList]);
        doc.files = [...fileList];
        return await this.documentRepository.save(doc);
    }
    async getTotalCarsByStatut(statut, agencesIds) {
        return agencesIds
            ? this.carRepository
                .createQueryBuilder('car')
                .where('car.agenceId IN (:...ids)', { ids: [...agencesIds] })
                .andWhere('car.statut = :s', { s: statut })
                .getCount()
            : this.carRepository.count({ where: { statut: statut } });
    }
    async getTop(agencesIds) {
        let cars = [];
        if (agencesIds) {
            cars = await this.carRepository
                .createQueryBuilder('car')
                .leftJoinAndSelect('car.contrats', 'contrats')
                .where('car.agenceId IN (:...ids)', { ids: [...agencesIds] })
                .getMany();
        }
        else {
            cars = await this.carRepository
                .createQueryBuilder('car')
                .leftJoinAndSelect('car.contrats', 'contrats')
                .getMany();
        }
        const data = [...cars].sort((a, b) => b.contrats.length - a.contrats.length);
        return data.slice(0, 5);
    }
};
CarService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(car_entity_1.Car)),
    __param(1, (0, typeorm_1.InjectRepository)(document_entity_1.Document)),
    __param(1, (0, typeorm_1.InjectRepository)(agency_entity_1.Agency)),
    __param(2, (0, typeorm_1.InjectRepository)(document_entity_1.Document)),
    __param(3, (0, typeorm_1.InjectRepository)(file_entity_1.File)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        agency_service_1.AgencyService,
        logger_service_1.LoggerService,
        jwt_1.JwtService])
], CarService);
exports.CarService = CarService;
//# sourceMappingURL=car.service.js.map