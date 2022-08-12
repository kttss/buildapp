"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContratModule = void 0;
const common_1 = require("@nestjs/common");
const contrat_service_1 = require("./contrat.service");
const contrat_controller_1 = require("./contrat.controller");
const contrat_entity_1 = require("./entities/contrat.entity");
const typeorm_1 = require("@nestjs/typeorm");
const agency_service_1 = require("../agency/agency.service");
const agency_module_1 = require("../agency/agency.module");
const user_service_1 = require("../user/user.service");
const agency_entity_1 = require("../agency/entities/agency.entity");
const email_entity_1 = require("../agency/entities/email.entity");
const telephone__entity_1 = require("../agency/entities/telephone..entity");
const fax_entity_1 = require("../agency/entities/fax.entity");
const user_entity_1 = require("../user/entities/user.entity");
const client_module_1 = require("../client/client.module");
const client_service_1 = require("../client/client.service");
const file_entity_1 = require("../car/entities/file.entity");
const client_entity_1 = require("../client/entities/client.entity");
const document_entity_1 = require("../car/entities/document.entity");
const car_module_1 = require("../car/car.module");
const car_service_1 = require("../car/car.service");
const car_entity_1 = require("../car/entities/car.entity");
const logger_service_1 = require("../logger/logger.service");
const logger_entity_1 = require("../logger/entities/logger.entity");
const jwt_1 = require("@nestjs/jwt");
let ContratModule = class ContratModule {
};
ContratModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                contrat_entity_1.Contrat,
                agency_entity_1.Agency,
                email_entity_1.Email,
                telephone__entity_1.Telephone,
                fax_entity_1.Fax,
                user_entity_1.User,
                client_entity_1.Client,
                file_entity_1.File,
                document_entity_1.Document,
                car_entity_1.Car,
                logger_entity_1.Logger,
            ]),
            agency_module_1.AgencyModule,
            client_module_1.ClientModule,
            car_module_1.CarModule,
        ],
        controllers: [contrat_controller_1.ContratController],
        providers: [
            contrat_service_1.ContratService,
            agency_service_1.AgencyService,
            user_service_1.UserService,
            client_service_1.ClientService,
            car_service_1.CarService,
            logger_service_1.LoggerService,
            jwt_1.JwtService,
        ],
    })
], ContratModule);
exports.ContratModule = ContratModule;
//# sourceMappingURL=contrat.module.js.map