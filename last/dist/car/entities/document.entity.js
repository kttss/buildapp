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
exports.Document = void 0;
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const client_entity_1 = require("../../client/entities/client.entity");
const car_entity_1 = require("./car.entity");
const file_entity_1 = require("./file.entity");
let Document = class Document {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Document.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], Document.prototype, "DateExpiration", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => file_entity_1.File, (file) => file.document, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Array)
], Document.prototype, "files", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => client_entity_1.Client, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", client_entity_1.Client)
], Document.prototype, "client", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => car_entity_1.Car, { onDelete: 'CASCADE', onUpdate: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", car_entity_1.Car)
], Document.prototype, "car", void 0);
Document = __decorate([
    (0, typeorm_1.Entity)()
], Document);
exports.Document = Document;
//# sourceMappingURL=document.entity.js.map