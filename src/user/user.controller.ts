import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { UserService } from './providers/user.service';
import { errorResponse, successResponse } from 'src/common/utils/response';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { ActiveUser } from 'src/auth/decorators/active-user.decorator';
import { IUser } from './interfaces/user.interface';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { AuthType } from 'src/auth/enums/auth-type.enum';

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) { }

  @Get("/:id")
  @ApiBearerAuth('jwt-auth')
  @ApiOperation({ summary: 'Get a user' })
  @ApiResponse({ status: 200, description: 'User fetched successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiParam({ name: 'id', type: 'number', required: true, example: 1 })
  async get(@Param() params: { id: number }) {
    try {
      const user = await this.userService.getUser({ id: params.id });
      return successResponse('User fetched successfully', {
        email: user.email
      });
    } catch (err) {
      return errorResponse(
        'Error fetching user',
        err.message,
        err.status
      );
    }
  }

  @Get("/username/:username")
  @Auth(AuthType.None)
  @ApiOperation({ summary: 'Check if username exists' })
  @ApiResponse({ status: 200, description: 'Username exists' })
  @ApiParam({ name: 'username', type: 'string', required: true, example: 'johndoe' })
  async checkUsername(@Param() params: { username: string }) {
    try {
      const user = await this.userService.findUser({ username: params.username });
      if (user) {
        return successResponse('Username exists', { exists: true });
      } else {
        return successResponse('Username does not exist', { exists: false });
      }
    } catch (err) {
      return errorResponse(
        'Error checking username',
        err.message,
        err.status
      );
    }
  }

  // @Patch("/username")
  // @ApiOperation({ summary: 'Update username' })
  // @ApiResponse({ status: 200, description: 'Username updated successfully' })
  // @ApiResponse({ status: 404, description: 'User not found' })
  // async updateUsername(@ActiveUser() user: IUser, @Body() updateUsernameDto: UpdateUsernameDto) {
  //   try {
  //     const updatedUser = await this.userService.updateUser(user.id, { username: updateUsernameDto.username });
  //     return successResponse('Username updated successfully', {
  //       id: updatedUser.id,
  //       username: updatedUser.username,
  //       email: updatedUser.email
  //     });
  //   } catch (err) {
  //     return errorResponse(
  //       'Error updating username',
  //       err.message,
  //       err.status || 500
  //     );
  //   }
  // }

  @Delete()
  @ApiBearerAuth('jwt-auth')
  @ApiOperation({ summary: 'Delete a user' })
  @ApiResponse({ status: 200, description: 'User deleted successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiParam({ name: 'id', type: 'number', required: true, example: 1 })
  async delete(@Param() params: { id: number }) {
    try {
      await this.userService.deleteUser(params.id);
      return successResponse('User deleted successfully');
    } catch (err) {
      return errorResponse(
        'Error deleting user',
        err.message,
        err.status
      );
    }
  }
}
