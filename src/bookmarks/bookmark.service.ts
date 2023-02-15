import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { randomUUID } from 'crypto';
import BookMarkStore from 'src/core/bookmark.store';
import { UserStore } from 'src/core/user.store';
import UserEntity from 'src/users/user.entity';
import BookMarkEntity from './bookmark.entity';
import BookMarkDTO from './dto/bookmark.dto';

@Injectable()
export default class BookMarkService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userStore: UserStore,
    private readonly bookMarkStore: BookMarkStore,
  ) {}

  private getUserFromAuthorizationHeader(
    authorizationHeader: string,
  ): UserEntity {
    if (!authorizationHeader) {
      throw new UnauthorizedException('Access Denied!');
    }
    const [, token] = authorizationHeader.split(' ');
    if (!token) {
      throw new UnauthorizedException('Access Denied!');
    }
    const user = this.jwtService.decode(token);
    if (typeof user === 'string' || (user && !user.id)) {
      throw new BadRequestException('Please Login Again!');
    }
    return this.userStore.findUserById(user.id);
  }

  addBookMark(bookMarkData: BookMarkDTO, headers: Headers) {
    const { description, name, url } = bookMarkData;
    const foundUser: UserEntity = this.getUserFromAuthorizationHeader(
      headers['authorization'],
    );

    const newBookMark: BookMarkEntity = {
      description,
      id: randomUUID(),
      name,
      url,
      userId: foundUser.id,
    };
    this.bookMarkStore.addBookMark(newBookMark);
    return newBookMark;
  }

  getBookMarks(headers: Headers) {
    const foundUser = this.getUserFromAuthorizationHeader(
      headers['authorization'],
    );
    return this.bookMarkStore
      .getBookMarks()
      .filter((currBookMark) => currBookMark.userId === foundUser.id);
  }

  getBookMarkById(id: string, headers: Headers) {
    const foundUser = this.getUserFromAuthorizationHeader(
      headers['authorization'],
    );
    const foundBookMark = this.bookMarkStore.findBookMarkOfUserById(
      id,
      foundUser.id,
    );
    if (!foundBookMark) {
      throw new NotFoundException('BookMark not found!');
    }
    return foundBookMark;
  }

  deleteBookMark(id: string, headers: Headers) {
    const foundUser = this.getUserFromAuthorizationHeader(
      headers['authorization'],
    );
    const foundBookMark = this.bookMarkStore.findBookMarkOfUserById(
      id,
      foundUser.id,
    );
    if (!foundBookMark) {
      throw new NotFoundException('Bookmark Not Found!');
    }
    this.bookMarkStore.deleteBookMarkById(id, foundUser.id);
  }

  updateBookMark(id: string, headers: Headers, bookMarkData: BookMarkDTO) {
    const foundUser = this.getUserFromAuthorizationHeader(
      headers['authorization'],
    );
    const foundBookMark = this.bookMarkStore.findBookMarkOfUserById(
      id,
      foundUser.id,
    );
    if (!foundBookMark) {
      throw new NotFoundException('BookMark Not Found!');
    }
    const updatedBookMark = { ...foundBookMark, ...bookMarkData };
    return this.bookMarkStore.updateBookMarkById(
      id,
      foundUser.id,
      updatedBookMark,
    );
  }
}
