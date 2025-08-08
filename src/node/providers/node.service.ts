import { Injectable } from '@nestjs/common';
import { NodeAutomationProvider } from './node-automation.provider';

@Injectable()
export class NodeService {
    constructor(
        private automation: NodeAutomationProvider
    ) { }

}
