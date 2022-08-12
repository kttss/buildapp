import { AuthService } from './auth.service';
import { LoginRequestDto } from './dto/login-request.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginForm: LoginRequestDto): any;
}
