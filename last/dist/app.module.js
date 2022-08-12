"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const user_entity_1 = require("./user/entities/user.entity");
const user_module_1 = require("./user/user.module");
const client_module_1 = require("./client/client.module");
const car_module_1 = require("./car/car.module");
const contrat_module_1 = require("./contrat/contrat.module");
const auth_module_1 = require("./auth/auth.module");
const agency_module_1 = require("./agency/agency.module");
const agency_entity_1 = require("./agency/entities/agency.entity");
const client_entity_1 = require("./client/entities/client.entity");
const email_entity_1 = require("./agency/entities/email.entity");
const telephone__entity_1 = require("./agency/entities/telephone..entity");
const fax_entity_1 = require("./agency/entities/fax.entity");
const car_entity_1 = require("./car/entities/car.entity");
const document_entity_1 = require("./car/entities/document.entity");
const file_entity_1 = require("./car/entities/file.entity");
const upload_module_1 = require("./upload/upload.module");
const contrat_entity_1 = require("./contrat/entities/contrat.entity");
const logger_module_1 = require("./logger/logger.module");
const logger_entity_1 = require("./logger/entities/logger.entity");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: 'localhost',
                port: 3306,
                username: 'root',
                password: '',
                database: 'cars',
                entities: [
                    user_entity_1.User,
                    agency_entity_1.Agency,
                    client_entity_1.Client,
                    email_entity_1.Email,
                    telephone__entity_1.Telephone,
                    fax_entity_1.Fax,
                    client_entity_1.Client,
                    car_entity_1.Car,
                    document_entity_1.Document,
                    file_entity_1.File,
                    contrat_entity_1.Contrat,
                    logger_entity_1.Logger,
                ],
                synchronize: true,
                dropSchema: false,
            }),
            user_module_1.UserModule,
            client_module_1.ClientModule,
            car_module_1.CarModule,
            contrat_module_1.ContratModule,
            auth_module_1.AuthModule,
            agency_module_1.AgencyModule,
            upload_module_1.UploadModule,
            logger_module_1.LoggerModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map