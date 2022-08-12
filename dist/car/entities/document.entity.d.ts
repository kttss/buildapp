import { Client } from '../../client/entities/client.entity';
import { Car } from './car.entity';
import { File } from './file.entity';
export declare class Document {
    id: number;
    DateExpiration: Date;
    files: File[];
    client: Client;
    car: Car;
}
