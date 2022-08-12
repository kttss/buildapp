"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAgencyDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_agency_dto_1 = require("./create-agency.dto");
class UpdateAgencyDto extends (0, swagger_1.PartialType)(create_agency_dto_1.CreateAgencyDto) {
}
exports.UpdateAgencyDto = UpdateAgencyDto;
//# sourceMappingURL=update-agency.dto.js.map