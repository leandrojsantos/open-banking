import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Account } from '../../accounts/entities/account.entity';

@Entity()
export class User {                           // Export obrigatório!
    @ApiProperty({ description: 'User unique identifier', example: '123e4567-e89b-12d3-a456-426614174000' })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({ description: 'User email address', example: 'user@example.com' })
    @Column({ unique: true })                   // Email único
    email: string;

    @ApiProperty({ description: 'User password (hashed)', example: 'hashedPassword123' })
    @Column()
    password: string;

    @ApiProperty({ description: 'User accounts', type: () => [Account] })
    @OneToMany(() => Account, (account) => account.user)
    accounts: Account[];

    @ApiProperty({ description: 'User roles', example: ['user', 'admin'] })
    @Column("simple-array", { default: "" })
    roles: string[];
}