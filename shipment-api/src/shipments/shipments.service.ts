import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Shipment } from '../shemas/shipment.schema';
import { CreateShipmentDto } from '../dto/create_shipment.dto';
import { UpdateShipmentDto } from '../dto/update_shipment.dto';

@Injectable()
export class ShipmentsService {
  constructor(@InjectModel(Shipment.name) private shipmentModel: Model<Shipment>) {}

      async create(createShipmentDto: CreateShipmentDto): Promise<Shipment> {
        const createdShipment = new this.shipmentModel(createShipmentDto);
        return createdShipment.save();
      }

      async findAll(): Promise<Shipment[]> {
        return this.shipmentModel.find().exec();
      }
    
      async findOne(id: string): Promise<Shipment> {
        return this.shipmentModel.findById(id).exec();
      }

      async delete(id: string) {
        return this.shipmentModel.findByIdAndDelete(id);
      }

      async update(id: string, createShipmentDto: UpdateShipmentDto): Promise<Shipment> {
        return this.shipmentModel.findByIdAndUpdate(id, createShipmentDto, { new: true });
      }
}
