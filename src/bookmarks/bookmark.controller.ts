import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import BookMarkService from './bookmark.service';
import BookMarkDTO from './dto/bookmark.dto';

@Controller('/bookmarks')
export default class BookMarkController {
  constructor(private readonly bookMarkService: BookMarkService) {}

  @Get()
  getAllBookmarks(@Headers() headers) {
    return this.bookMarkService.getBookMarks(headers);
  }

  @Post()
  addBookMark(@Body() bookMarkBody, @Headers() headers) {
    return this.bookMarkService.addBookMark(bookMarkBody, headers);
  }

  @Get(':id')
  getBookMarkById(@Param() params, @Headers() headers) {
    return this.bookMarkService.getBookMarkById(params.id, headers);
  }

  @Put(':id')
  updateBookMarkById(
    @Param() params,
    @Headers() headers,
    @Body() bookMarkData: BookMarkDTO,
  ) {
    return this.bookMarkService.updateBookMark(
      params.id,
      headers,
      bookMarkData,
    );
  }

  @Delete(':id')
  deleteBookMarkById(@Param() params, @Headers() headers) {
    return this.bookMarkService.deleteBookMark(params.id, headers);
  }
}
