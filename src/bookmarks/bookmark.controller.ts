import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import JwtPayload from 'src/auth/dto/jwt.payload.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard/jwt-auth.guard';
import { User } from 'src/users/user.decerator';
import BookMarkService from './bookmark.service';
import BookMarkDTO from './dto/bookmark.dto';

@UseGuards(JwtAuthGuard)
@Controller('bookmarks')
export default class BookMarkController {
  constructor(private readonly bookMarkService: BookMarkService) {}

  @Get()
  getAllBookmarks(@User() user: JwtPayload) {
    return this.bookMarkService.getBookMarks(user.id);
  }

  @Post()
  addBookMark(@Body() bookMarkBody: BookMarkDTO, @User() user: JwtPayload) {
    return this.bookMarkService.addBookMark(bookMarkBody, user.id);
  }

  @Get(':id')
  getBookMarkById(@Param() params, @User() user: JwtPayload) {
    return this.bookMarkService.getBookMarkById(params.id, user.id);
  }

  @Put(':id')
  updateBookMarkById(
    @Param() params,
    @User() user: JwtPayload,
    @Body() bookMarkData: BookMarkDTO,
  ) {
    return this.bookMarkService.updateBookMark(
      params.id,
      user.id,
      bookMarkData,
    );
  }

  @Delete(':id')
  deleteBookMarkById(@Param() params, @User() user: JwtPayload) {
    return this.bookMarkService.deleteBookMark(params.id, user.id);
  }
}
