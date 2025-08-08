import { ApiProperty } from '@nestjs/swagger';

export class SwapDto {
  @ApiProperty({
    type: String,
    required: true,
    example: '13',
    description: 'The amount of token to swap',
  })
  amount: string;

  @ApiProperty({
    type: String,
    required: true,
    example: '0xF6A600F27568795F7905B5Ef6Eac954D1605937a',
    description: 'The wallet address of the sender',
  })
  sender: string;
}
