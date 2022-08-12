import { Agency } from '../../agency/entities/agency.entity';
import { RoleEnum } from '../enums/role.enum';
export declare class User {
    id: number;
    firstname: string;
    lastname: string;
    password: string;
    isActive: boolean;
    email: string;
    role: RoleEnum;
    telephone: string;
    agencys: Agency[];
}
