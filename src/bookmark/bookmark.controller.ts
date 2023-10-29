import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { BookmarkService } from './bookmark.service';
import { GetUser } from '../auth/decorator';
import { CreateBookmarkDto, EditBookmarkDto } from './dto';
import { User } from '@prisma/client';

@UseGuards(JwtGuard)
@Controller('bookmarks')
export class BookmarkController {
    constructor(private bookmarkService: BookmarkService) {}

    @Post()
    createBookmark(@GetUser() user: User, @Body() dto: CreateBookmarkDto) {
        return this.bookmarkService.createBookmark(user.id, dto);
    };

    @Get()
    getBookmarks(@GetUser() user: User) {
        return this.bookmarkService.getBookmarks(user.id);
    };

    @Get(':id')
    getBookmarkById(@GetUser() user: User, @Param('id', ParseIntPipe) bookmarkId: number) {
        return this.bookmarkService.getBookmarkById(user.id, bookmarkId);
    };

    @Patch(':id')
    editBookmarkById(@GetUser() user: User, @Body() dto: EditBookmarkDto,
                    @Param('id', ParseIntPipe) bookmarkId: number) {
        return this.bookmarkService.editBookmarkById(user.id, dto, bookmarkId);
    };

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    deleteBookmarkById(@GetUser() user: User, @Param('id', ParseIntPipe) bookmarkId: number) {
        return this.bookmarkService.deleteBookmarkById(user.id, bookmarkId);
    };
}
