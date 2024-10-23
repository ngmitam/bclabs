import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Price {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'ethereum',
    description: 'The chain to retrieve the price for',
  })
  @Index()
  @Column({ nullable: false })
  chain: string;

  @ApiProperty({
    example: 123.45,
    description: 'The price in USD',
  })
  @Column({ nullable: false, type: 'float' })
  price: number;

  @ApiProperty({
    example: 1234567890,
    description: 'The unix timestamp of the price',
  })
  @Column({ nullable: false })
  timestamp: number; // unix timestamp
}
