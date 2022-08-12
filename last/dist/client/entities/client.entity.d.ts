import { Document } from '../../car/entities/document.entity';
import { Contrat } from '../../contrat/entities/contrat.entity';
export declare class Client {
    id: number;
    firstname: string;
    lastname: string;
    adresse: string;
    telephone: string;
    birthday: Date;
    lieuNaissance: string;
    cin: string;
    villeCin: string;
    dateCin: Date;
    permis: string;
    villePermis: string;
    datePermis: Date;
    cinFiles: Document;
    permisFiles: Document;
    contrats: Contrat[];
}
