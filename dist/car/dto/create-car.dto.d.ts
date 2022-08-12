import { carburantEnum } from '../enums/carburant.enum';
export declare class CreateCarDto {
    agence: number;
    marque: string;
    model: string;
    matricule: string;
    carburant: carburantEnum;
    statut: string;
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
}
