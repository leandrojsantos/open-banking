import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const user = this.userRepository.create(createUserDto);
        return this.userRepository.save(user);
    }

    async findOne(id: string): Promise<User | undefined> {
        const user = await this.userRepository.findOneBy({ id });
        return user === null ? undefined : user;
    }

    async findOneByEmail(email: string): Promise<User | undefined> {
        const user = await this.userRepository.findOne({ where: { email } });
        return user === null ? undefined : user;
    }
}