import { Body, Controller, Headers, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './providers/auth.service';
import { SignInDto } from './dtos/signin.dto';
import { errorResponse, successResponse } from 'src/common/utils/response';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Auth } from './decorators/auth.decorator';
import { AuthType } from './enums/auth-type.enum';
import { ValidatePasswordDto } from './dtos/validatePassworddto';
import { ActiveUser } from './decorators/active-user.decorator';
import { IUser } from 'src/user/interfaces/user.interface';
import { SignUpDto } from './dtos/signup.dto';
import { ForgotPasswordDto } from './dtos/forgotPassword.dto';
import { VerifyOtpDto } from './dtos/verifyOtp.dto';
import { ResetPasswordDto } from './dtos/resetPassword.dto';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ) { }

    @Post('sign-in')
    @Auth(AuthType.None)
    @ApiOperation({ summary: 'Sign in' })
    @ApiResponse({ status: 200, description: 'Sign in successful' })
    @ApiResponse({ status: 404, description: 'User not found' })
    @HttpCode(200)
    async signIn(@Body() data: SignInDto) {
        try {
            return successResponse("Sign in successful", await this.authService.signIn(data));
        } catch (error) {
            return errorResponse(error.message, "Error signing in", error.status || 500);
        }
    }

    @Post('sign-up')
    @Auth(AuthType.None)
    @ApiOperation({ summary: 'Sign up' })
    @ApiResponse({ status: 201, description: 'Sign up successful' })
    @ApiResponse({ status: 409, description: 'Email already exists' })
    async signUp(@Body() data: SignUpDto) {
        try {
            return successResponse("Sign up successful", await this.authService.signUp(data));
        } catch (error) {
            return errorResponse(error.message, "Error signing up", error.status || 500);
        }
    }

    @Post('refresh-token')
    @Auth(AuthType.None)
    @ApiOperation({ summary: 'Refresh access token' })
    @ApiResponse({ status: 201, description: 'Access token refreshed successfully' })
    @ApiResponse({ status: 401, description: 'Invalid or expired refresh token' })
    @HttpCode(200)
    async refreshToken(@Headers('authorization') authHeader: string) {
        try {
            const refreshToken = authHeader?.split(' ')[1];
            const newAccessToken = await this.authService.refreshAccessToken(refreshToken);

            return successResponse('Access token refreshed successfully', { accessToken: newAccessToken });
        } catch (error) {
            return errorResponse(error.message, 'Error refreshing token', error.status || 500);
        }
    }

    @Post('validate-password')
    @ApiBearerAuth('jwt-auth')
    @ApiOperation({ summary: 'Validate password' })
    @ApiResponse({ status: 200, description: 'Password is valid' })
    @ApiResponse({ status: 200, description: 'Password is invalid' })
    @HttpCode(200)
    async validatePassword(@ActiveUser() activeUser: IUser, @Body() data: ValidatePasswordDto) {
        try {
            const isValid = await this.authService.validatePassword(activeUser.id, data);
            if (isValid) {
                return successResponse("Password is valid", { isValid: true });
            } else {
                return successResponse("Password is invalid", { isValid: false });
            }
        } catch (error) {
            return errorResponse(error.message, "Error validating password", error.status || 500);
        }
    }

    @Post('forgot-password')
    @Auth(AuthType.None)
    @ApiOperation({ summary: 'Send OTP for password reset' })
    @ApiResponse({ status: 200, description: 'OTP sent successfully' })
    @ApiResponse({ status: 404, description: 'User not found' })
    @ApiResponse({ status: 500, description: 'Error sending OTP' })
    @HttpCode(200)
    async forgotPassword(@Body() data: ForgotPasswordDto) {
        try {
            await this.authService.sendPasswordResetOtp(data.email);
            return successResponse("OTP sent successfully");
        } catch (error) {
            return errorResponse(error.message, "Error sending OTP", error.status || 500);
        }
    }

    @Post('verify-otp')
    @Auth(AuthType.None)
    @ApiOperation({ summary: 'Verify OTP for password reset' })
    @ApiResponse({ status: 200, description: 'OTP verification result' })
    @ApiResponse({ status: 404, description: 'User not found' })
    @ApiResponse({ status: 500, description: 'Error verifying OTP' })
    @HttpCode(200)
    async verifyOtp(@Body() data: VerifyOtpDto) {
        try {
            const isValid = await this.authService.verifyOtp(data.email, data.otp);
            return successResponse("OTP verification result", { isValid });
        } catch (error) {
            return errorResponse(error.message, "Error verifying OTP", error.status || 500);
        }
    }

    @Post('reset-password')
    @Auth(AuthType.None)
    @ApiOperation({ summary: 'Reset password after OTP verification' })
    @ApiResponse({ status: 200, description: 'Password reset successful' })
    @ApiResponse({ status: 404, description: 'User not found' })
    @ApiResponse({ status: 400, description: 'OTP not verified' })
    @ApiResponse({ status: 500, description: 'Error resetting password' })
    @HttpCode(200)
    async resetPassword(@Body() data: ResetPasswordDto) {
        try {
            await this.authService.resetPassword(data.email, data.newPassword);
            return successResponse("Password reset successful");
        } catch (error) {
            return errorResponse(error.message, "Error resetting password", error.status || 500);
        }
    }
}
