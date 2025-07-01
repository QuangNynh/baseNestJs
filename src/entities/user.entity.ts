import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  address: string;

  @Column()
  phone_number: string;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  create_at: Date;

  @Column()
  update_at: Date;

  @Column({ nullable: true })
  refresh_token: string;
}
