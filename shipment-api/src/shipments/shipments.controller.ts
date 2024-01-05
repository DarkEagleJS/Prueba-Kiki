import {Body,ConflictException, NotFoundException, Controller, Get, Param, Post, Delete, HttpCode, Put } from '@nestjs/common';
import { ShipmentsService } from '../shipments/shipments.service';
import { CreateShipmentDto } from '../dto/create_shipment.dto';
import { UpdateShipmentDto } from '../dto/update_shipment.dto';

@Controller('shipments')
export class ShipmentsController {
    constructor(private shipmentsService: ShipmentsService) {}
  
    @Get()
    async findAll() {
      return this.shipmentsService.findAll();
    }
  
    @Post()
    async create(@Body() body: CreateShipmentDto) {
      try {
        return await this.shipmentsService.create(body);
      } catch (error) {
        if (error.code === 11000) {
          throw new ConflictException('Shipment already exists');
        }
        throw error;
      }
    }
  
    @Get(':id')
    async findOne(@Param('id') id: string) {
      const shipment = await this.shipmentsService.findOne(id);
      if (!shipment) throw new NotFoundException('Shipment does not exist!');
      return shipment;
    }
  
    @Delete(':id')
    @HttpCode(204)
    async delete(@Param('id') id: string) {
      const shipment = await this.shipmentsService.delete(id);
      if (!shipment) throw new NotFoundException('Shipment does not exist!');
      return shipment;
    }
  
    @Put(':id')
    async update(@Param('id') id: string, @Body() body: UpdateShipmentDto) {
      const shipment = await this.shipmentsService.update(id, body);
      if (!shipment) throw new NotFoundException('Shipment does not exist!');
      return shipment;
    }
  }