import { forwardRef, Module } from '@nestjs/common';
import { NodeService } from './providers/node.service';
import { HttpModule } from '@nestjs/axios';
import { NodeAutomationProvider } from './providers/node-automation.provider';
import { UserModule } from 'src/user/user.module';
import { NodeController } from './node.controller';

@Module({
  providers: [NodeService, NodeAutomationProvider],
  imports: [HttpModule, forwardRef(() => UserModule)],
  exports: [NodeService, NodeAutomationProvider],
  controllers: [NodeController]
})
export class NodeModule { }
