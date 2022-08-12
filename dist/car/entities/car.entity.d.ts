import { Agency } from '../../agency/entities/agency.entity';
import { Contrat } from '../../contrat/entities/contrat.entity';
import { Document } from './document.entity';
export declare class Car {
    id: number;
    marque: string;
    model: string;
    matricule: string;
    carburant: string;
    statut: string;
    description: string;
    carteGrise: Document;
    autorisationCirculation: Document;
    assurance: Document;
    vignette: Document;
    visite: Document;
    agence: Agency;
    contrats: Contrat[];
}
