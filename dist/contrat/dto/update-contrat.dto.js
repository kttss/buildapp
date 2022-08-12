"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateContratDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_contrat_dto_1 = require("./create-contrat.dto");
class UpdateContratDto extends (0, mapped_types_1.PartialType)(create_contrat_dto_1.CreateContratDto) {
}
exports.UpdateContratDto = UpdateContratDto;
//# sourceMappingURL=update-contrat.dto.js.map