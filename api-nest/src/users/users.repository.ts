import { Injectable } from '@nestjs/common';
import { User } from '@users/entities/user.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class UsersRepository extends Repository<User> {
    constructor(private dataSource: DataSource) {
        super(User, dataSource.createEntityManager());
    }

    async createUser(userData: {
        email: string;
        password: string;
        roles?: string[];
    }): Promise<User> {
        const user = this.create({
            email: userData.email,
            password: userData.password,
            roles: userData.roles || ['user'],
        });

        await this.save(user);
        return user;
    }

    // Métodos adicionais podem ser incluídos aqui
    async findByEmail(email: string): Promise<User | undefined> {
        return (await this.findOne({ where: { email } })) ?? undefined;
    }

    async findById(id: string): Promise<User | undefined> {
        return (await this.findOne({ where: { id } })) ?? undefined;
    }
}