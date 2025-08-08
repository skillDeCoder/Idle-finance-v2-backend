import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AUTH_KEY } from 'src/auth/decorators/auth.decorator';
import { AuthType } from 'src/auth/enums/auth-type.enum';
import { JwtService } from 'src/user/providers/jwt.service';
import { UserService } from 'src/user/providers/user.service';
import { IS_PUBLIC_KEY } from 'src/common/decorators/public.decorator';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const requiredAuth = this.reflector.get<AuthType>(
      AUTH_KEY,
      context.getHandler(),
    );

    if (requiredAuth === AuthType.None) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing or invalid token');
    }

    const token = authHeader.replace('Bearer ', '');
    let payload;

    try {
      payload = this.jwtService.verifyAccessToken(token);
    } catch (e) {
      throw new UnauthorizedException('Invalid or expired token');
    }

    const user = await this.userService.findUser({ id: payload.sub });
    if (!user) {
      throw new UnauthorizedException('Invalid user');
    }

    request.user = user;
    return true;
  }
}
