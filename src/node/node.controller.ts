import {
    Controller,
    Post,
    Get,
    Patch,
    Body,
    HttpCode,
} from '@nestjs/common';
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiSecurity,
} from '@nestjs/swagger';
import { NodeService } from './providers/node.service';
import { errorResponse, successResponse } from 'src/common/utils/response';
import { EditGolemDto } from './dtos/editGolem.dto';

@ApiTags('Nodes')
@Controller('nodes')
@ApiSecurity('jwt-auth')
export class NodeController {
    constructor(private nodeService: NodeService) { }

    // Get request to check a users system requirements if it can run a node
    @Get('check-requirements')
    @ApiOperation({ summary: 'Check system requirements' })
    @ApiResponse({
        status: 200,
        description: 'System requirements check successful'
    })
    @ApiResponse({
        status: 500,
        description: 'Error checking system requirements'
    })
    checkRequirements() {
        try {
            return successResponse('System requirements check successful', { canRunNode: true });
        } catch (err) {
            return errorResponse(err.message, 'Error checking system requirements', err.status);
        }
    }

    // endpoint to bootstrap the node service
    @Post('bootstrap')
    @HttpCode(200)
    @ApiOperation({ summary: 'Bootstrap service' })
    @ApiResponse({
        status: 200,
        description: 'Service bootstrapped successfully'
    })
    bootstrap() {
        try {
            return successResponse('Service bootstrapped successfully');
        } catch (err) {
            return errorResponse(err.message, 'Error bootstrapping service', err.status);
        }
    }

    // endpoint to verify bootstrapped installation
    @Get('verify-installation')
    @ApiOperation({ summary: 'Verify installation' })
    @ApiResponse({
        status: 200,
        description: 'Installation verified successfully',
    })
    verifyInstallation() {
        try {
            return successResponse('Installation verified successfully', { installed: true });
        } catch (err) {
            return errorResponse(err.message, 'Error verifying installation', err.status);
        }
    }

    // endpoint to fetch deployed node
    @Get()
    @ApiOperation({ summary: 'Fetch deployed node' })
    @ApiResponse({
        status: 200,
        description: 'Node fetched successfully',
    })
    get() {
        try {
            return successResponse('Node fetched successfully', {
                name: "Golem1",
                status: 'running',
                uptime: 7456,
                cpu: 3,
                memory: "10.597627609968185 GiB",
                disk: "103.45567321777344 GiB",
                earnings: {
                    totalAmount: "0.5 GLM",
                    amountPolygon: "0.5 GLM",
                    amountOnchain: "0.5 GLM",
                    pending: "0.5 GLM",
                    issued: "0.5 GLM"
                },
                presets: {
                    forStart: 0.13,
                    perHour: 0.005,
                    perCpuHour: 0.025
                },
                nodeId: "0x8b250d3af7abb2f165ad0191101fc8c1d7bf4e8e",
                verifyNodeLink: "https://stats.golem.network/network/provider/0x8b250d3af7abb2f165ad0191101fc8c1d7bf4e8e?node_id=0x8b250d3af7abb2f165ad0191101fc8c1d7bf4e8e"
            });
        } catch (err) {
            return errorResponse(err.message, 'Error fetching node', err.status);
        }
    }

    @Patch('/stop')
    @ApiOperation({ summary: 'Stop a specific node' })
    @ApiResponse({
        status: 200,
        description: 'Node stopped successfully',
    })
    stop() {
        try {
            return successResponse('Node stopped successfully', {
                name: "Golem1",
                status: 'stopped',
                uptime: 7456,
                cpu: 3,
                memory: "10.597627609968185 GiB",
                disk: "103.45567321777344 GiB",
                earnings: {
                    totalAmount: "0.5 GLM",
                    amountPolygon: "0.5 GLM",
                    amountOnchain: "0.5 GLM",
                    pending: "0.5 GLM",
                    issued: "0.5 GLM"
                },
                presets: {
                    forStart: 0.13,
                    perHour: 0.005,
                    perCpuHour: 0.025
                },
                nodeId: "0x8b250d3af7abb2f165ad0191101fc8c1d7bf4e8e",
                verifyNodeLink: "https://stats.golem.network/network/provider/0x8b250d3af7abb2f165ad0191101fc8c1d7bf4e8e?node_id=0x8b250d3af7abb2f165ad0191101fc8c1d7bf4e8e"
            });
        } catch (err) {
            return errorResponse(err.message, 'Error stopping node', err.status);
        }
    }

    @Patch('/start')
    @ApiOperation({ summary: 'Restart a specific node that has been stopped' })
    @ApiResponse({
        status: 200,
        description: 'Node started successfully',
    })
    start() {
        try {
            return successResponse('Node started successfully', {
                name: "Golem1",
                status: 'running',
                uptime: 7456,
                cpu: 3,
                memory: "10.597627609968185 GiB",
                disk: "103.45567321777344 GiB",
                earnings: {
                    totalAmount: "0.5 GLM",
                    amountPolygon: "0.5 GLM",
                    amountOnchain: "0.5 GLM",
                    pending: "0.5 GLM",
                    issued: "0.5 GLM"
                },
                presets: {
                    forStart: 0.13,
                    perHour: 0.005,
                    perCpuHour: 0.025
                },
                nodeId: "0x8b250d3af7abb2f165ad0191101fc8c1d7bf4e8e",
                verifyNodeLink: "https://stats.golem.network/network/provider/0x8b250d3af7abb2f165ad0191101fc8c1d7bf4e8e?node_id=0x8b250d3af7abb2f165ad0191101fc8c1d7bf4e8e"
            });
        } catch (err) {
            return errorResponse(err.message, 'Error starting node', err.status);
        }
    }

    @Get('system-resources')
    @ApiOperation({ summary: 'Fetch system resources' })
    @ApiResponse({
        status: 200,
        description: 'System resources fetched successfully',
    })
    async getSystemResources() {
        try {
            return successResponse('Disk space fetched successfully', {
                "disk_space": {
                    "all_filesystems": [
                        {
                            "filesystem": "/dev/sda1",
                            "type": "ext4",
                            "size": "500G",
                            "used": "200G",
                            "available": "300G",
                            "usage_percent": "40%",
                            "mounted_on": "/"
                        }
                    ],
                    "root_filesystem": {
                        "filesystem": "/dev/sda1",
                        "type": "ext4",
                        "size": "500G",
                        "used": "200G",
                        "available": "300G",
                        "usage_percent": "40%",
                        "mounted_on": "/"
                    },
                    "golem_usage": {
                        "total_size_bytes": 2147483648,
                        "total_size_human": "2.00 GB",
                        "usage_percent_of_total": "0.40%",
                        "directory_breakdown": {
                            "~/.local/share/yagna": "1.2G",
                            "~/.local/share/ya-provider": "800M",
                            "~/.local/bin": "50M",
                            "~/.config/yagna": "10M"
                        }
                    }
                },
                "cpu": {
                    "total_cores": 8,
                    "model": "Intel(R) Core(TM) i7-9700K CPU @ 3.60GHz",
                    "usage_percent": "25.3%"
                },
                "ram": {
                    "total_ram_gb": "16.0",
                    "used_ram_gb": "8.5",
                    "available_ram_gb": "7.5",
                    "usage_percent": "53.1%"
                },
                "golem_resource_usage": {
                    "total_cpu_percent": "12.5%",
                    "total_mem_percent": "8.2%",
                    "processes": [
                        {
                            "pid": "12345",
                            "cpu_percent": "8.5%",
                            "mem_percent": "5.2%",
                            "command": "golemsp run"
                        },
                        {
                            "pid": "12346",
                            "cpu_percent": "4.0%",
                            "mem_percent": "3.0%",
                            "command": "ya-provider"
                        }
                    ]
                }
            });
        } catch (err) {
            return errorResponse(err.message, 'Error fetching disk space', err.status);
        }
    }

    @Patch("edit-golem")
    @ApiOperation({ summary: 'Edit Golem node settings' })
    @ApiResponse({
        status: 200,
        description: 'Golem settings updated successfully',
    })
    async updateGolemSettings(@Body() settings: EditGolemDto) {
        try {
            return successResponse('Golem settings updated successfully');
        } catch (err) {
            throw new Error('Failed to update Golem settings');
        }
    }
}
