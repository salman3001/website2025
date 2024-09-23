import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import ValidatorPipe from 'src/utils/pipes/ValidatorPipe';
import CustomRes from 'src/utils/CustomRes';
import { confirmEmailDto } from './dto/confirmEmail.dto';
import { forgotPasswordOtpDto } from './dto/forgotPasswordOtp.dto';
import { resetPasswordDto } from './dto/resetPassword.dto';
import { ConfigService } from '@nestjs/config';
import { IEnvConfig } from 'src/config/env.config';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private config: ConfigService,
  ) {}

  @Post('login')
  async login(
    @Body(new ValidatorPipe()) dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.authService.login(dto);

    const token = this.authService.getToken({
      tokenType: 'auth',
      id: user.id,
      userType: user.userType,
    });

    res.cookie('auth_token', token, {
      httpOnly: true,
      sameSite: true,
      secure:
        this.config.get<IEnvConfig>('env').nodeEnv !== 'prod' ? false : true,
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userPayload } = user;

    res.cookie('user', JSON.stringify(userPayload), {
      sameSite: true,
      secure:
        this.config.get<IEnvConfig>('env')?.nodeEnv !== 'prod' ? false : true,
    });

    return CustomRes({
      data: null,
      code: HttpStatus.OK,
      message: 'Login Successfully',
      success: true,
    });
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('auth_token');
    res.clearCookie('user');

    return CustomRes({
      data: null,
      code: HttpStatus.OK,
      message: 'Logout Successfully',
      success: true,
    });
  }

  @Post('register')
  async register(@Body(new ValidatorPipe()) dto: RegisterDto) {
    await this.authService.register(dto);

    return CustomRes({
      code: HttpStatus.OK,
      message: 'Account created. Please verify email',
      data: null,
      success: true,
    });
  }

  @Post('confirm-email')
  async confirmEmail(
    @Body(new ValidatorPipe()) dto: confirmEmailDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.authService.confirmEmail(dto);

    const token = this.authService.getToken({
      tokenType: 'auth',
      id: user.id,
      userType: user.userType,
    });

    res.cookie('auth_token', token, {
      httpOnly: true,
      sameSite: true,
      secure:
        this.config.get<IEnvConfig>('env')?.nodeEnv !== 'prod' ? false : true,
    });

    res.cookie('user', JSON.stringify(user), {
      sameSite: true,
      secure:
        this.config.get<IEnvConfig>('env')?.nodeEnv !== 'prod' ? false : true,
    });

    return CustomRes({
      code: HttpStatus.OK,
      message: 'Account activated',
      data: user,
      success: true,
    });
  }

  @Post('forgot-password')
  async forgotPasswordOtp(
    @Body(new ValidatorPipe()) dto: forgotPasswordOtpDto,
  ) {
    await this.authService.forgotPasswordOtp(dto);

    return CustomRes({
      code: HttpStatus.OK,
      message: 'OTP Sent',
      success: true,
    });
  }

  @Post('reset-password')
  async resetPassword(@Body(new ValidatorPipe()) dto: resetPasswordDto) {
    const user = await this.authService.resetPassword(dto);

    return CustomRes({
      code: HttpStatus.OK,
      message: 'Password reset successfully',
      data: user,
      success: true,
    });
  }
}
