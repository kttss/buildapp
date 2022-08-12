import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { LoginRequestDto } from './dto/login-request.dto';
export declare class AuthService {
    private readonly jwtService;
    private readonly userService;
    constructor(jwtService: JwtService, userService: UserService);
    login(loginFom: LoginRequestDto): Promise<any>;
}
