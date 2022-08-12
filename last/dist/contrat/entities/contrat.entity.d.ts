import { Agency } from '../../agency/entities/agency.entity';
import { Car } from '../../car/entities/car.entity';
import { Client } from '../../client/entities/client.entity';
import { PaiementTypeEnum } from '../enums/paiement-type.enum';
import { ReservationStatutEnum } from '../enums/reservation-statut.enum';
export declare class Contrat {
    id: number;
    satrtAt: Date;
    endAt: Date;
    creatAt: Date;
    backAt: Date;
    price: number;
    paiement: PaiementTypeEnum;
    statut: ReservationStatutEnum;
    client: Client;
    agence: Agency;
    car: Car;
    file: string;
}
