import { Controller, UseInterceptors, UseGuards, NotFoundException, UnauthorizedException, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { CreateUserDto } from '../dto/user.dto';
import { User } from '../interface/user.interface';
import { JwtAuthGuard } from '../middleware/jwtAuthGuard';
import { MailService } from 'middleware/mail.service';
import { LoggingInterceptor } from '../middleware/interceptor'


@Controller('user')
@UseInterceptors(LoggingInterceptor) 
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly mailService: MailService
  ) { }


  @Post()
  async register(@Body() createUserDto: CreateUserDto): Promise<User> {
    const newUser = await this.userService.create(createUserDto);

    const welcomeEmailText = `Welcome to our application, ${newUser.name}!`;
    await this.mailService.sendEmail(newUser.email, 'Welcome to Our App', welcomeEmailText);

    return newUser;
  }

  @Post('login')
  async login(@Body() loginData: { email: string, password: string }): Promise<{ token: string }> {
    console.log(loginData)
    const user = await this.userService.findByEmail(loginData.email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const passwordsMatch = await this.userService.comparePasswords(loginData.password, user.password);
    if (!passwordsMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const token = await this.userService.generateJwtToken(user);
    console.log("log", token)
    return { token };
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Body() updateUserDto: CreateUserDto): Promise<User> {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string): Promise<User> {
    return this.userService.remove(id);
  }
}