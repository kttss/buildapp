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
exports.Contrat = void 0;
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const agency_entity_1 = require("../../agency/entities/agency.entity");
const car_entity_1 = require("../../car/entities/car.entity");
const client_entity_1 = require("../../client/entities/client.entity");
const paiement_type_enum_1 = require("../enums/paiement-type.enum");
const reservation_statut_enum_1 = require("../enums/reservation-statut.enum");
let Contrat = class Contrat {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Contrat.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], Contrat.prototype, "satrtAt", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], Contrat.prototype, "endAt", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], Contrat.prototype, "creatAt", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], Contrat.prototype, "backAt", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], Contrat.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsEnum)(paiement_type_enum_1.PaiementTypeEnum),
    __metadata("design:type", String)
], Contrat.prototype, "paiement", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsEnum)(reservation_statut_enum_1.ReservationStatutEnum),
    __metadata("design:type", String)
], Contrat.prototype, "statut", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => client_entity_1.Client, { onDelete: 'CASCADE', onUpdate: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", client_entity_1.Client)
], Contrat.prototype, "client", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => agency_entity_1.Agency, (agence) => agence.contrats, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    __metadata("design:type", agency_entity_1.Agency)
], Contrat.prototype, "agence", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => car_entity_1.Car, (car) => car.contrats, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    __metadata("design:type", car_entity_1.Car)
], Contrat.prototype, "car", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEmpty)(),
    __metadata("design:type", String)
], Contrat.prototype, "file", void 0);
Contrat = __decorate([
    (0, typeorm_1.Entity)()
], Contrat);
exports.Contrat = Contrat;
//# sourceMappingURL=contrat.entity.js.map