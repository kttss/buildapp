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
exports.AgencyController = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const swagger_1 = require("@nestjs/swagger");
const agency_service_1 = require("./agency.service");
const create_agency_dto_1 = require("./dto/create-agency.dto");
const update_agency_dto_1 = require("./dto/update-agency.dto");
let AgencyController = class AgencyController {
    constructor(agencyService, jwt) {
        this.agencyService = agencyService;
        this.jwt = jwt;
    }
    create(createAgencyDto) {
        return this.agencyService.create(createAgencyDto);
    }
    findAll(req) {
        return this.agencyService.findAll(req.headers.authorization);
    }
    loadData() {
        return this.agencyService.loadMockData();
    }
    getLogs() {
        return this.agencyService.getAlllogs();
    }
    findOne(id) {
        return this.agencyService.findOne(+id);
    }
    update(id, updateAgencyDto, req) {
        return this.agencyService.update(+id, updateAgencyDto, req.headers.authorization);
    }
    remove(id, req) {
        return this.agencyService.remove(+id, req.headers.authorization);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'The agencey has been successfully created.',
    }),
    (0, swagger_1.ApiBody)({
        description: 'agence',
        type: create_agency_dto_1.CreateAgencyDto,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_agency_dto_1.CreateAgencyDto]),
    __metadata("design:returntype", void 0)
], AgencyController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AgencyController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('load'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AgencyController.prototype, "loadData", null);
__decorate([
    (0, common_1.Get)('logs'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AgencyController.prototype, "getLogs", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AgencyController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Update user by ID',
    }),
    (0, swagger_1.ApiBody)({
        description: 'user',
        type: update_agency_dto_1.UpdateAgencyDto,
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_agency_dto_1.UpdateAgencyDto, Object]),
    __metadata("design:returntype", void 0)
], AgencyController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'delete agence by ID',
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AgencyController.prototype, "remove", null);
AgencyController = __decorate([
    (0, common_1.Controller)('agency'),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [agency_service_1.AgencyService,
        jwt_1.JwtService])
], AgencyController);
exports.AgencyController = AgencyController;
//# sourceMappingURL=agency.controller.js.map