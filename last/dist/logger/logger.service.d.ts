import { Repository } from 'typeorm';
import { UserJwtDecoded } from '../auth/dto/user-jwt-decoded.dto';
import { Logger } from './entities/logger.entity';
export declare class LoggerService {
    private LoggerRepository;
    constructor(LoggerRepository: Repository<Logger>);
    create(user: UserJwtDecoded, value: string): void;
    getAll(): Promise<Logger[]>;
}
