"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgencyModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const jwt_1 = require("@nestjs/jwt");
const agency_service_1 = require("./agency.service");
const agency_controller_1 = require("./agency.controller");
const agency_entity_1 = require("./entities/agency.entity");
const email_entity_1 = require("./entities/email.entity");
const user_module_1 = require("../user/user.module");
const telephone__entity_1 = require("./entities/telephone..entity");
const fax_entity_1 = require("./entities/fax.entity");
const logger_service_1 = require("../logger/logger.service");
const logger_module_1 = require("../logger/logger.module");
const logger_entity_1 = require("../logger/entities/logger.entity");
let AgencyModule = class AgencyModule {
};
AgencyModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([agency_entity_1.Agency, email_entity_1.Email, telephone__entity_1.Telephone, fax_entity_1.Fax, logger_entity_1.Logger]),
            user_module_1.UserModule,
            logger_module_1.LoggerModule,
        ],
        controllers: [agency_controller_1.AgencyController],
        providers: [agency_service_1.AgencyService, jwt_1.JwtService, logger_service_1.LoggerService],
    })
], AgencyModule);
exports.AgencyModule = AgencyModule;
//# sourceMappingURL=agency.module.js.map