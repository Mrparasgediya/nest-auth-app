import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import PrismaService from 'src/prisma/prisma.service';
import BookMarkDTO from './dto/bookmark.dto';

@Injectable()
export default class BookMarkService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
  ) {}

  async addBookMark(bookMarkData: BookMarkDTO, userId: string) {
    const { description, name, url } = bookMarkData;
    const foundUser = await this.prismaService.user.findFirst({
      where: { id: userId },
      select: { id: true },
    });
    if (!foundUser) {
      throw new NotFoundException('User not found!');
    }

    return this.prismaService.bookMark.create({
      data: {
        url,
        description,
        name,
        userId: foundUser.id,
      },
    });
  }

  async getBookMarks(userId: string) {
    const foundUser = await this.prismaService.user.findFirst({
      where: { id: userId },
    });
    if (!foundUser) {
      throw new NotFoundException('User not found!');
    }
    return this.prismaService.bookMark.findMany({
      where: {
        userId: foundUser.id,
      },
    });
  }

  async getBookMarkById(id: string, userId: string) {
    const foundUser = await this.prismaService.user.findFirst({
      where: { id: userId },
    });
    if (!foundUser) {
      throw new NotFoundException('User not found!');
    }
    const foundBookMark = await this.prismaService.bookMark.findFirst({
      where: {
        id,
        userId,
      },
    });
    if (!foundBookMark) {
      throw new NotFoundException('BookMark not found!');
    }
    return foundBookMark;
  }

  async deleteBookMark(id: string, userId: string) {
    const foundUser = await this.prismaService.user.findFirst({
      where: { id: userId },
    });
    if (!foundUser) {
      throw new NotFoundException('User not found!');
    }
    const foundBookMark = await this.prismaService.bookMark.findFirst({
      where: { id, userId },
    });
    if (!foundBookMark) {
      throw new NotFoundException('Bookmark Not Found!');
    }
    await this.prismaService.bookMark.delete({ where: { id } });
  }

  async updateBookMark(id: string, userId: string, bookMarkData: BookMarkDTO) {
    const foundUser = await this.prismaService.user.findFirst({
      where: { id: userId },
    });
    if (!foundUser) {
      throw new NotFoundException('User not found!');
    }
    const foundBookMark = await this.prismaService.bookMark.findFirst({
      where: {
        id,
        userId,
      },
    });
    if (!foundBookMark) {
      throw new NotFoundException('Bookmark not found!');
    }
    const { description, name, url } = bookMarkData;
    return this.prismaService.bookMark.update({
      where: {
        id: foundBookMark.id,
      },
      data: {
        description,
        name,
        url,
      },
    });
  }
}
