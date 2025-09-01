import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from '../../users/entities/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());

        // Se não houver roles requeridas, permite o acesso
        if (!requiredRoles) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const user: User = request.user;

        // Verifica se o usuário existe e tem roles
        if (!user?.roles) {
            return false;
        }

        // Verifica se o usuário tem pelo menos uma das roles requeridas
        return requiredRoles.some(role => user.roles.includes(role));
    }
}