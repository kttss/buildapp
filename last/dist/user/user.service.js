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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const user_entity_1 = require("./entities/user.entity");
const user_1 = require("../mock/user");
let UserService = class UserService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async create(createUserDto) {
        try {
            const { firstname, lastname, password, email, telephone, role } = createUserDto;
            const alreadyExist = await this.findByEmail(email);
            const salt = await bcrypt.genSalt();
            const passwordHash = await bcrypt.hash(password, salt);
            if (!alreadyExist) {
                const user = new user_entity_1.User();
                user.firstname = firstname;
                user.lastname = lastname;
                user.email = email;
                user.password = passwordHash;
                user.telephone = telephone;
                user.role = role;
                const res = await this.usersRepository.save(user);
                return res.id;
            }
            else {
                throw new common_1.BadRequestException('email already exist');
            }
        }
        catch (error) {
            throw new common_1.HttpException(error, 400);
        }
    }
    async findAll() {
        return await this.usersRepository.find();
    }
    async findOne(id) {
        return await this.usersRepository.findOne({
            where: [{ id: id }],
        });
    }
    async findByEmail(email) {
        return await this.usersRepository.findOne({
            where: [{ email: email }],
        });
    }
    async update(id, updateUserDto) {
        const { firstname, lastname, password, email, telephone, role } = updateUserDto;
        const user = await this.findOne(id);
        if (!user) {
            throw new common_1.NotFoundException('User is not found');
        }
        user.firstname = firstname;
        user.lastname = lastname;
        user.telephone = telephone;
        user.role = role;
        user.email = email;
        if (password) {
            const salt = await bcrypt.genSalt();
            const passwordHashed = await bcrypt.hash(password, salt);
            user.password = passwordHashed;
        }
        const res = await this.usersRepository.save(user);
        return res;
    }
    async remove(id) {
        return await this.usersRepository.delete(id);
    }
    async getUsersByIds(ids) {
        return await this.usersRepository
            .createQueryBuilder('user')
            .where('user.id IN (:...ids)', { ids: [...ids] })
            .getMany();
    }
    loadMockData() {
        const usersList = user_1.users;
        usersList.forEach((u) => {
            this.create(u);
        });
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map