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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Agency = void 0;
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const car_entity_1 = require("../../car/entities/car.entity");
const contrat_entity_1 = require("../../contrat/entities/contrat.entity");
const user_entity_1 = require("../../user/entities/user.entity");
const email_entity_1 = require("./email.entity");
const fax_entity_1 = require("./fax.entity");
const telephone__entity_1 = require("./telephone..entity");
let Agency = class Agency {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Agency.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.MaxLength)(50),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Agency.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Agency.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Agency.prototype, "adresse", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Agency.prototype, "logo", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => user_entity_1.User, (user) => user.agencys, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Agency.prototype, "users", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => email_entity_1.Email, (email) => email.agence, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    __metadata("design:type", Array)
], Agency.prototype, "emails", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => car_entity_1.Car, (car) => car.agence, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    __metadata("design:type", Array)
], Agency.prototype, "cars", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => telephone__entity_1.Telephone, (telephone) => telephone.agence, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    __metadata("design:type", Array)
], Agency.prototype, "telephones", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => fax_entity_1.Fax, (fax) => fax.agence, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    __metadata("design:type", Array)
], Agency.prototype, "faxs", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => contrat_entity_1.Contrat, (contrat) => contrat.agence, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    __metadata("design:type", Array)
], Agency.prototype, "contrats", void 0);
Agency = __decorate([
    (0, typeorm_1.Entity)()
], Agency);
exports.Agency = Agency;
//# sourceMappingURL=agency.entity.js.map