import { Controller, Get, Post, Body } from '@nestjs/common';
import { PostService } from '../service/post.service';
import { CreatePostDto } from '../dto/post.dto';
import { UserPost } from '../interface/post.interface';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  async create(@Body() createPostDto: CreatePostDto): Promise<UserPost> {
    return this.postService.create(createPostDto);
  }

  @Get()
  async findAll(): Promise<UserPost[]> {
    return this.postService.findAll();
  }
}
