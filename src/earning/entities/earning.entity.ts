// import { User } from 'src/user/entities/user.entity';
// import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Unique, CreateDateColumn } from 'typeorm';

// @Entity('earnings')
// @Unique(['user', 'date'])
// export class Earnings {
//     @PrimaryGeneratedColumn('uuid')
//     id: string;

//     @ManyToOne(() => User, (user) => user.id, { onDelete: 'CASCADE' })
//     user: User;

//     @Column({ type: 'decimal', precision: 18, scale: 8, default: 0 })
//     amount: number;

//     @Column({ type: 'date' })
//     date: string;

//     @CreateDateColumn()
//     createdAt: Date;
// }