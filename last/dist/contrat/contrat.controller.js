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
exports.ContratController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const contrat_service_1 = require("./contrat.service");
const create_contrat_dto_1 = require("./dto/create-contrat.dto");
const update_contrat_dto_1 = require("./dto/update-contrat.dto");
let ContratController = class ContratController {
    constructor(contratService) {
        this.contratService = contratService;
    }
    create(createContratDto) {
        return this.contratService.create(createContratDto);
    }
    findAll(req) {
        return this.contratService.findAll(req.headers.authorization);
    }
    generatePdf(id) {
        return this.contratService.generateContrat(+id);
    }
    getstatistique(req) {
        return this.contratService.getstatistique(req.headers.authorization);
    }
    findOne(id) {
        return this.contratService.findOne(+id);
    }
    update(id, updateContratDto) {
        return this.contratService.update(+id, updateContratDto);
    }
    remove(id) {
        return this.contratService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_contrat_dto_1.CreateContratDto]),
    __metadata("design:returntype", void 0)
], ContratController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ContratController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('pdf/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ContratController.prototype, "generatePdf", null);
__decorate([
    (0, common_1.Get)('statistique'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ContratController.prototype, "getstatistique", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ContratController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_contrat_dto_1.UpdateContratDto]),
    __metadata("design:returntype", void 0)
], ContratController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ContratController.prototype, "remove", null);
ContratController = __decorate([
    (0, common_1.Controller)('contrat'),
    (0, swagger_1.ApiTags)('Contrat'),
    __metadata("design:paramtypes", [contrat_service_1.ContratService])
], ContratController);
exports.ContratController = ContratController;
//# sourceMappingURL=contrat.controller.js.map