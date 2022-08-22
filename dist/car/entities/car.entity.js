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
exports.Car = void 0;
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const agency_entity_1 = require("../../agency/entities/agency.entity");
const contrat_entity_1 = require("../../contrat/entities/contrat.entity");
const car_statut_enum_1 = require("../enums/car-statut.enum");
const carburant_enum_1 = require("../enums/carburant.enum");
const document_entity_1 = require("./document.entity");
let Car = class Car {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Car.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Car.prototype, "marque", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Car.prototype, "model", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Car.prototype, "matricule", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsEnum)(carburant_enum_1.carburantEnum),
    __metadata("design:type", String)
], Car.prototype, "carburant", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsEnum)(car_statut_enum_1.CarStatutEnum),
    __metadata("design:type", String)
], Car.prototype, "statut", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Car.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], Car.prototype, "dateVidange", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => document_entity_1.Document, { onDelete: 'CASCADE', onUpdate: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", document_entity_1.Document)
], Car.prototype, "carteGrise", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => document_entity_1.Document, { onDelete: 'CASCADE', onUpdate: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", document_entity_1.Document)
], Car.prototype, "autorisationCirculation", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => document_entity_1.Document, { onDelete: 'CASCADE', onUpdate: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", document_entity_1.Document)
], Car.prototype, "assurance", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => document_entity_1.Document, { onDelete: 'CASCADE', onUpdate: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", document_entity_1.Document)
], Car.prototype, "vignette", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => document_entity_1.Document, { onDelete: 'CASCADE', onUpdate: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", document_entity_1.Document)
], Car.prototype, "visite", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => agency_entity_1.Agency, (agence) => agence.cars, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    __metadata("design:type", agency_entity_1.Agency)
], Car.prototype, "agence", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => contrat_entity_1.Contrat, (contrat) => contrat.car, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    __metadata("design:type", Array)
], Car.prototype, "contrats", void 0);
Car = __decorate([
    (0, typeorm_1.Entity)()
], Car);
exports.Car = Car;
//# sourceMappingURL=car.entity.js.map