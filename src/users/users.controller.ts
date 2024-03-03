import { Body, Controller, Post, Get, Patch, Param, Query, Delete, NotFoundException, Session } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UdpateUserDto } from './dtos/update-user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';


@Controller('auth')
@Serialize(UserDto)
export class UsersController {
    constructor(
        private usersService: UsersService,
        private authService: AuthService
    ) { }

    @Post('/signup')
    async createUser(@Body() body: CreateUserDto, @Session() session: any) {
        const user = await this.authService.signup(body.email, body.password);
        session.userId = user.id;
        return user;
    }

    @Post('/signout')
    signOut(@Session() session:any){
        session.userId = null;
    }

    @Post('/signin')
    async signin(@Body() body: CreateUserDto, @Session() session:any) {
        const user = await this.authService.signin(body.email, body.password);
        session.userId = user.id;
        return user;
    }

    @Get('/whoami')
    WhoAmI(@Session() session:any){
        return this.usersService.findOne(session.userId);
    }


    @Get('/:id')
    async findUser(@Param('id') id: string) {
        const user = await this.usersService.findOne(parseInt(id));
        if (!user) throw new NotFoundException('user not found')
        return user;
    }

    @Get()
    findAllUsers(@Query('email') email: string) {
        return this.usersService.find(email);
    }

    @Patch('/:id')
    updateUser(@Param('id') id: string, @Body() body: UdpateUserDto) {
        return this.usersService.update(parseInt(id), body);
    }

    @Delete('/:id')
    removeUser(@Param('id') id: string) {
        return this.usersService.remove(parseInt(id))
    }


    @Get('/colors/:color')
    setColor(@Param('color') color: string, @Session() session: any) {
        session.color = color;
    }

    @Get('/colors')
    getColor(@Session() session: any) {
        return session.color;
    }

}
