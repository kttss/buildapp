import { RoleEnum } from '../enums/role.enum';
export declare class CreateUserDto {
    firstname: string;
    lastname: string;
    password: string;
    email: string;
    telephone: string;
    role: RoleEnum;
}
