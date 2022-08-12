import { CarStatutEnum } from '../car/enums/car-statut.enum';
import { carburantEnum } from '../car/enums/carburant.enum';
export declare const CARS: {
    marque: string;
    model: string;
    matricule: string;
    carburant: carburantEnum;
    statut: CarStatutEnum;
    description: string;
    carteGriseImages: string[];
    carteGriseDateExpertation: Date;
    autorisationCirculationImages: string[];
    autorisationCirculationDateExpertation: Date;
    assuranceImages: string[];
    assuranceDateExpertation: Date;
    vignetteImages: string[];
    vignetteDateExpertation: Date;
    visiteImages: string[];
    visiteeDateExpertation: Date;
    agence: number;
}[];
