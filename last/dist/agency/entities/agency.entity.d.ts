import { Car } from '../../car/entities/car.entity';
import { Contrat } from '../../contrat/entities/contrat.entity';
import { User } from '../../user/entities/user.entity';
import { Email } from './email.entity';
import { Fax } from './fax.entity';
import { Telephone } from './telephone..entity';
export declare class Agency {
    id: number;
    name: string;
    description: string;
    adresse: string;
    logo: string;
    users: User[];
    emails: Email[];
    cars: Car[];
    telephones: Telephone[];
    faxs: Fax[];
    contrats: Contrat[];
}
