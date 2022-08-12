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
exports.ContratService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const agency_service_1 = require("../agency/agency.service");
const car_service_1 = require("../car/car.service");
const client_service_1 = require("../client/client.service");
const logger_service_1 = require("../logger/logger.service");
const contrat_entity_1 = require("./entities/contrat.entity");
const car_statut_enum_1 = require("../car/enums/car-statut.enum");
const role_enum_1 = require("../user/enums/role.enum");
const jwt_1 = require("@nestjs/jwt");
let ContratService = class ContratService {
    constructor(contratRepository, agenceService, clientService, carService, loggerService, jwt) {
        this.contratRepository = contratRepository;
        this.agenceService = agenceService;
        this.clientService = clientService;
        this.carService = carService;
        this.loggerService = loggerService;
        this.jwt = jwt;
    }
    async create(createContratDto) {
        const { satrtAt, endAt, creatAt, backAt, price, paiement, statut, agence, client, car, } = createContratDto;
        const contrat = new contrat_entity_1.Contrat();
        const agenceEntity = await this.agenceService.findById(agence);
        const clientEntity = await this.clientService.findOne(client);
        const carEntity = await this.carService.findOne(car);
        contrat.satrtAt = satrtAt;
        contrat.endAt = endAt;
        contrat.creatAt = creatAt;
        contrat.backAt = backAt;
        contrat.paiement = paiement;
        contrat.price = Number(price);
        contrat.statut = statut;
        contrat.agence = agenceEntity;
        contrat.client = clientEntity;
        contrat.car = carEntity;
        const res = await this.contratRepository.save(contrat);
        return res.id;
    }
    async findAll(token) {
        const jwtDecoded = this.jwt.decode(token.split(' ')[1]);
        if (jwtDecoded.role === role_enum_1.RoleEnum.Admin) {
            return this.contratRepository.find();
        }
        else {
            return this.findAllByAdmin(jwtDecoded.id);
        }
    }
    async findAllByAdmin(id) {
        const agences = await this.agenceService.findAllByAdmin(id);
        const agencesIds = agences.map((a) => a.id);
        return this.contratRepository
            .createQueryBuilder('contrat')
            .where('contrat.agenceId IN (:...ids)', { ids: [...agencesIds] })
            .getMany();
    }
    async findOne(id) {
        return await this.contratRepository
            .createQueryBuilder('contrat')
            .leftJoinAndSelect('contrat.agence', 'agence')
            .leftJoinAndSelect('contrat.client', 'client')
            .leftJoinAndSelect('contrat.car', 'car')
            .where({ id: id })
            .getOne();
    }
    async update(id, updateContratDto) {
        const { satrtAt, endAt, creatAt, backAt, price, paiement, statut, agence, client, car, } = updateContratDto;
        const contrat = await this.findOne(id);
        if (!contrat) {
            throw new common_1.NotFoundException('reservation is not found');
        }
        const agenceEntity = await this.agenceService.findById(agence);
        const clientEntity = await this.clientService.findOne(client);
        const carEntity = await this.carService.findOne(car);
        contrat.satrtAt = satrtAt;
        contrat.endAt = endAt;
        contrat.creatAt = creatAt;
        contrat.backAt = backAt;
        contrat.paiement = paiement;
        contrat.price = Number(price);
        contrat.statut = statut;
        contrat.agence = agenceEntity;
        contrat.client = clientEntity;
        contrat.car = carEntity;
        const res = await this.contratRepository.save(contrat);
        return res.id;
    }
    async remove(id) {
        return await this.contratRepository.delete(id);
    }
    async getstatistique(token) {
        const date = new Date();
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        let agencesIds = null;
        const jwtDecoded = this.jwt.decode(token.split(' ')[1]);
        if (jwtDecoded.role !== role_enum_1.RoleEnum.Admin) {
            const agences = await this.agenceService.findAllByAdmin(jwtDecoded.id);
            agencesIds = agences.map((a) => a.id);
        }
        const totalOfReservationInThisMonth = agencesIds
            ? await this.contratRepository
                .createQueryBuilder('contrat')
                .where({ satrtAt: (0, typeorm_2.Between)(firstDay, lastDay) })
                .where('contrat.agenceId IN (:...ids)', { ids: [...agencesIds] })
                .getCount()
            : await this.contratRepository
                .createQueryBuilder('contrat')
                .where({ satrtAt: (0, typeorm_2.Between)(firstDay, lastDay) })
                .getCount();
        const totalOfReservationInThisYear = agencesIds
            ? await this.contratRepository
                .createQueryBuilder('contrat')
                .where({
                satrtAt: (0, typeorm_2.Between)(new Date('01-01-' + date.getFullYear()), new Date('12-31-' + date.getFullYear())),
            })
                .where('contrat.agenceId IN (:...ids)', { ids: [...agencesIds] })
                .getCount()
            : await this.contratRepository
                .createQueryBuilder('contrat')
                .where({
                satrtAt: (0, typeorm_2.Between)(new Date('01-01-' + date.getFullYear()), new Date('12-31-' + date.getFullYear())),
            })
                .getCount();
        const totalDisponible = await this.carService.getTotalCarsByStatut(car_statut_enum_1.CarStatutEnum.Disponible, agencesIds);
        const totalPanne = await this.carService.getTotalCarsByStatut(car_statut_enum_1.CarStatutEnum.Panne, agencesIds);
        const totalReserved = await this.carService.getTotalCarsByStatut(car_statut_enum_1.CarStatutEnum.Reserved, agencesIds);
        const top = await this.carService.getTop(agencesIds);
        return {
            totalMonth: totalOfReservationInThisMonth,
            totalYear: totalOfReservationInThisYear,
            totalDisponible,
            totalPanne,
            totalReserved,
            top,
        };
    }
    async generateContrat(id) {
        const contrat = await this.contratRepository
            .createQueryBuilder('contrat')
            .leftJoinAndSelect('contrat.agence', 'agence')
            .leftJoinAndSelect('contrat.client', 'client')
            .leftJoinAndSelect('contrat.car', 'car')
            .where({ id: id })
            .getOne();
        const data = {};
        data.first_name = contrat.client.firstname;
        data.last_name = contrat.client.lastname;
        data.num = contrat.id;
        data.adresse = contrat.client.adresse;
        data.tel = contrat.client.telephone;
        data.ville_permis = contrat.client.villePermis;
        data.cin = contrat.client.cin;
        data.date_cin = contrat.client.dateCin;
        data.permis = contrat.client.permis;
        data.marque = contrat.car.marque;
        data.model = contrat.car.model;
        data.matricule = contrat.car.matricule;
        data.carburant = contrat.car.carburant;
        data.birthday = contrat.client.birthday;
        data.birthdayPlace = contrat.client.lieuNaissance;
        data.cin_ville = contrat.client.villeCin;
        data.logo = contrat.agence.logo;
        data.agence_name = contrat.agence.name;
        data.agence_adresse = contrat.agence.adresse;
        const tels = await this.agenceService.getTelsByAgence(id);
        data.agence_tel = tels.map((e) => e.value).join(' / ');
        const faxs = await this.agenceService.getFaxsByAgence(id);
        data.agence_faxs = faxs.map((e) => e.value).join(' / ');
        const emails = await this.agenceService.getEmailsByAgence(id);
        data.agence_emails = emails.map((e) => e.value).join(' / ');
        data.price = contrat.price;
        data.start_at = contrat.satrtAt;
        data.end_at = contrat.endAt;
        data.paiement = contrat.paiement;
        data.date_ville = contrat.client.birthday;
        return data;
    }
    async getBase64FromUrl(url) {
        const data = await fetch(url);
        const blob = await data.blob();
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = () => {
                const base64data = reader.result;
                resolve(base64data);
            };
        });
    }
};
ContratService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(contrat_entity_1.Contrat)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        agency_service_1.AgencyService,
        client_service_1.ClientService,
        car_service_1.CarService,
        logger_service_1.LoggerService,
        jwt_1.JwtService])
], ContratService);
exports.ContratService = ContratService;
//# sourceMappingURL=contrat.service.js.map