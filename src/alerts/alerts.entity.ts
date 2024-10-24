import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Index(['chain', 'price'])
@Entity()
export class Alert {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'ethereum',
    description: 'The chain to retrieve the price for',
  })
  @Column({ nullable: false })
  chain: string;

  @ApiProperty({
    example: 123.45,
    description: 'The price in USD',
  })
  @Column({ nullable: false, type: 'float' })
  price: number;

  @ApiProperty({
    example: 'user@bclabs.co.kr',
    description: 'The email to send the alert to',
  })
  @Column({ nullable: false })
  email: string;
}
