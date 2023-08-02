import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Contact {
  @Prop({ unique: true, required: true })
  email: string;
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  surname: string;
  @Prop({ type: Date })
  birthdayDate: Date;
  @Prop({ required: true })
  phone: string;
  @Prop({ type: Boolean, required: true })
  male: boolean;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);
