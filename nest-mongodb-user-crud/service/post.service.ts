import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserPost } from '../interface/post.interface';
import { CreatePostDto } from '../dto/post.dto';

@Injectable()
export class PostService {
    constructor(@InjectModel('Post') private readonly postModel: Model<UserPost>) { }

    async create(createPostDto: CreatePostDto): Promise<UserPost> {
        const createdPost = new this.postModel(createPostDto);
        return createdPost.save();
    }

    async findAll(): Promise<UserPost[]> {
        return this.postModel.find().populate('author').exec();
    }
}