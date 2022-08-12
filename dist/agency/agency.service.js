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
exports.AgencyService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const logger_service_1 = require("../logger/logger.service");
const agence_1 = require("../mock/agence");
const role_enum_1 = require("../user/enums/role.enum");
const user_service_1 = require("../user/user.service");
const agency_entity_1 = require("./entities/agency.entity");
const email_entity_1 = require("./entities/email.entity");
const fax_entity_1 = require("./entities/fax.entity");
const telephone__entity_1 = require("./entities/telephone..entity");
let AgencyService = class AgencyService {
    constructor(agenceRepository, emailRepository, telphoneRepository, faxRepository, userService, loggerService, jwt) {
        this.agenceRepository = agenceRepository;
        this.emailRepository = emailRepository;
        this.telphoneRepository = telphoneRepository;
        this.faxRepository = faxRepository;
        this.userService = userService;
        this.loggerService = loggerService;
        this.jwt = jwt;
    }
    async create(createAgencyDto, token) {
        const { name, description, adresse, logo, users, emails, telephones, faxs, } = createAgencyDto;
        const agence = new agency_entity_1.Agency();
        agence.name = name;
        agence.description = description;
        agence.logo = logo;
        agence.adresse = adresse;
        const result = await this.userService.getUsersByIds(users);
        agence.users = [...result];
        const res = await this.agenceRepository.save(agence);
        emails.forEach((row) => {
            const email = new email_entity_1.Email();
            email.value = row;
            email.agence = res;
            this.emailRepository.save(email);
        });
        telephones.forEach((row) => {
            const tel = new telephone__entity_1.Telephone();
            tel.value = row;
            tel.agence = res;
            this.telphoneRepository.save(tel);
        });
        faxs.forEach((row) => {
            const fax = new telephone__entity_1.Telephone();
            fax.value = row;
            fax.agence = res;
            this.faxRepository.save(fax);
        });
        if (token) {
            const jwtDecoded = this.jwt.decode(token.split(' ')[1]);
            this.loggerService.create(jwtDecoded, 'a ajouter une agence id:' + res.id);
        }
        return res.id;
    }
    async findAll(token) {
        const jwtDecoded = this.jwt.decode(token.split(' ')[1]);
        if (jwtDecoded.role === role_enum_1.RoleEnum.Admin) {
            return this.agenceRepository
                .createQueryBuilder('agency')
                .leftJoinAndSelect('agency.users', 'user')
                .leftJoinAndSelect('agency.emails', 'email')
                .leftJoinAndSelect('agency.telephones', 'telephone')
                .leftJoinAndSelect('agency.faxs', 'fax')
                .getMany();
        }
        else {
            return this.findAllByAdmin(jwtDecoded.id);
        }
    }
    async findAllByAdmin(id) {
        const agences = await this.agenceRepository
            .createQueryBuilder('agency')
            .leftJoinAndSelect('agency.users', 'user')
            .leftJoinAndSelect('agency.emails', 'email')
            .leftJoinAndSelect('agency.telephones', 'telephone')
            .leftJoinAndSelect('agency.faxs', 'fax')
            .where('user.id = (:id)', {
            id: id,
        })
            .getMany();
        return agences;
    }
    async findOne(id) {
        return await this.agenceRepository
            .createQueryBuilder('agency')
            .leftJoinAndSelect('agency.users', 'user')
            .leftJoinAndSelect('agency.emails', 'email')
            .leftJoinAndSelect('agency.telephones', 'telephone')
            .leftJoinAndSelect('agency.faxs', 'fax')
            .leftJoinAndSelect('agency.cars', 'cars')
            .where({ id: id })
            .getOne();
    }
    async update(id, updateAgencyDto, token) {
        const { name, description, adresse, logo, users, emails, telephones, faxs, } = updateAgencyDto;
        const agence = await this.findById(id);
        if (!agence) {
            throw new common_1.NotFoundException('Agency is not found');
        }
        agence.name = name;
        agence.description = description;
        agence.logo = logo;
        agence.adresse = adresse;
        this.emailRepository
            .createQueryBuilder()
            .delete()
            .from(email_entity_1.Email)
            .where('email.agenceId = :id', { id: id })
            .execute();
        emails.forEach((row) => {
            const email = new email_entity_1.Email();
            email.value = row;
            email.agence = agence;
            this.emailRepository.save(email);
        });
        this.telphoneRepository
            .createQueryBuilder()
            .delete()
            .from(telephone__entity_1.Telephone)
            .where('telephone.agenceId = :id', { id: id })
            .execute();
        telephones.forEach((row) => {
            const tel = new telephone__entity_1.Telephone();
            tel.value = row;
            tel.agence = agence;
            this.telphoneRepository.save(tel);
        });
        this.faxRepository
            .createQueryBuilder()
            .delete()
            .from(fax_entity_1.Fax)
            .where('fax.agenceId = :id', { id: id })
            .execute();
        faxs.forEach((row) => {
            const fax = new telephone__entity_1.Telephone();
            fax.value = row;
            fax.agence = agence;
            this.faxRepository.save(fax);
        });
        const result = await this.userService.getUsersByIds(users);
        agence.users = [...result];
        const res = await this.agenceRepository.save(agence);
        const jwtDecoded = this.jwt.decode(token.split(' ')[1]);
        this.loggerService.create(jwtDecoded, 'est modifier une agence id:' + res.id);
        return this.findById(id);
    }
    async remove(id, token) {
        const jwtDecoded = this.jwt.decode(token.split(' ')[1]);
        this.loggerService.create(jwtDecoded, 'a supprimer une agence id:' + id);
        return this.agenceRepository.delete(id);
    }
    async findById(id) {
        return await this.agenceRepository.findOne({
            where: [{ id: id }],
        });
    }
    loadMockData() {
        const agenceList = agence_1.AGENCES;
        agenceList.forEach((a) => {
            this.create(a);
        });
    }
    getAlllogs() {
        return this.loggerService.getAll();
    }
    getTelsByAgence(id) {
        return this.telphoneRepository
            .createQueryBuilder('telephones')
            .where('telephones.agence.id = (:id)', {
            id: id,
        })
            .getMany();
    }
    getFaxsByAgence(id) {
        return this.faxRepository
            .createQueryBuilder('fax')
            .where('fax.agence.id = (:id)', {
            id: id,
        })
            .getMany();
    }
    getEmailsByAgence(id) {
        return this.emailRepository
            .createQueryBuilder('email')
            .where('email.agence.id = (:id)', {
            id: id,
        })
            .getMany();
    }
};
AgencyService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(agency_entity_1.Agency)),
    __param(1, (0, typeorm_1.InjectRepository)(email_entity_1.Email)),
    __param(2, (0, typeorm_1.InjectRepository)(telephone__entity_1.Telephone)),
    __param(3, (0, typeorm_1.InjectRepository)(fax_entity_1.Fax)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        user_service_1.UserService,
        logger_service_1.LoggerService,
        jwt_1.JwtService])
], AgencyService);
exports.AgencyService = AgencyService;
//# sourceMappingURL=agency.service.js.map