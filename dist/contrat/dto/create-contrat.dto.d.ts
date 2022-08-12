import { PaiementTypeEnum } from '../enums/paiement-type.enum';
import { ReservationStatutEnum } from '../enums/reservation-statut.enum';
export declare class CreateContratDto {
    agence: number;
    client: number;
    car: number;
    satrtAt: Date;
    endAt: Date;
    creatAt: Date;
    backAt: Date;
    price: number;
    paiement: PaiementTypeEnum;
    statut: ReservationStatutEnum;
}
