import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ShipmentDocument = HydratedDocument<Shipment>;

@Schema({
  timestamps: true,
})
export class Shipment {
  @Prop({ unique: true, trim: true, required: true })
  addressee: string;

  @Prop({ unique: true, trim: true, required: true })
  sender: string;

  @Prop({ unique: true, trim: true, required: true })
  content: string;

  @Prop({ unique: true, trim: true, required: true })
  send_date: string;

  @Prop({ unique: true, trim: true, required: true })
  distance: string;

  @Prop({ unique: true, trim: true, required: true })
  rate: string;

  @Prop({ default: false })
  send: boolean;
}

export const ShipmentSchema = SchemaFactory.createForClass(Shipment);