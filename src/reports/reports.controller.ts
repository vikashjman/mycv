import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dtos/create-report.dto';
import { AuthGaurd } from 'src/guards/auth.guard';

@Controller('reports')
export class ReportsController {
    constructor(private reportsService : ReportsService){}

    @Post()
    @UseGuards(AuthGaurd)
    createReport(@Body() body: CreateReportDto){
        return this.reportsService.create(body)
    }
}
