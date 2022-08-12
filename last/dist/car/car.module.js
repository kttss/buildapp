"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const jwt_1 = require("@nestjs/jwt");
const document_entity_1 = require("./entities/document.entity");
const car_service_1 = require("./car.service");
const car_controller_1 = require("./car.controller");
const car_entity_1 = require("./entities/car.entity");
const file_entity_1 = require("./entities/file.entity");
const agency_entity_1 = require("../agency/entities/agency.entity");
const agency_service_1 = require("../agency/agency.service");
const agency_module_1 = require("../agency/agency.module");
const email_entity_1 = require("../agency/entities/email.entity");
const telephone__entity_1 = require("../agency/entities/telephone..entity");
const fax_entity_1 = require("../agency/entities/fax.entity");
const user_service_1 = require("../user/user.service");
const user_entity_1 = require("../user/entities/user.entity");
const logger_service_1 = require("../logger/logger.service");
const logger_entity_1 = require("../logger/entities/logger.entity");
let CarModule = class CarModule {
};
CarModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                car_entity_1.Car,
                document_entity_1.Document,
                file_entity_1.File,
                agency_entity_1.Agency,
                email_entity_1.Email,
                telephone__entity_1.Telephone,
                fax_entity_1.Fax,
                user_entity_1.User,
                logger_entity_1.Logger,
            ]),
            agency_module_1.AgencyModule,
        ],
        controllers: [car_controller_1.CarController],
        providers: [
            car_service_1.CarService,
            agency_service_1.AgencyService,
            user_service_1.UserService,
            jwt_1.JwtService,
            logger_service_1.LoggerService,
        ],
    })
], CarModule);
exports.CarModule = CarModule;
//# sourceMappingURL=car.module.js.map