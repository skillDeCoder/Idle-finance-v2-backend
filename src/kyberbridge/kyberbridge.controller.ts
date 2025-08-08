import { Body, Controller, Post } from '@nestjs/common';
import { KyberbridgeService } from './providers/kyberbridge.service';
import { SwapDto } from './dtos/swap.dto';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('kyberbridge')
export class KyberbridgeController {
  constructor(private readonly kyberBridgeService: KyberbridgeService) {}

  @Post()
  @Public()
  @ApiOperation({ summary: 'Generate an encoded swap data' })
  @ApiBody({ type: SwapDto })
  @ApiResponse({ status: 201, description: 'encoded swap data generated' })
  swapData(@Body() dto: SwapDto) {
    return this.kyberBridgeService.buildSwapTransaction(dto);
  }

  @Post('/with-approval')
  @Public()
  @ApiOperation({
    summary: 'Generate an encoded swap data with a token approval tx',
  })
  @ApiBody({ type: SwapDto })
  @ApiResponse({ status: 201, description: 'encoded swap data generated' })
  swapDataWithApproval(@Body() dto: SwapDto) {
    return this.kyberBridgeService.buildSwapTransactionWithApproval(dto);
  }

  @Post('bridge')
  @Public()
  @ApiOperation({ summary: 'Generate a token bridge data with approval tx' })
  @ApiBody({ type: SwapDto })
  @ApiResponse({ status: 201, description: 'encoded swap data generated' })
  bridgeToken(@Body() dto: SwapDto) {
    return this.kyberBridgeService.bridgeTokentoBase(dto);
  }
}
