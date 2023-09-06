import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserController } from '../controller/user.control';
import { UserService } from '../service/user.service';
import { UserSchema } from '../schema/user.schema';
import { PostController } from '../controller/post.control';
import { PostService } from '../service/post.service';
import { PostSchema } from '../schema/post.schema';
import { JwtStrategy } from '../middleware/jwtstrategy';
import { MailService } from 'middleware/mail.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1/property', {}),
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Post', schema: PostSchema },
    ]),
    PassportModule,
    JwtModule.register({
      secret: 'yourSecretKey',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [UserController, PostController],
  providers: [UserService, PostService, JwtStrategy, MailService],
})
export class AppModule {}
