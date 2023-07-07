import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Contact {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  surname: string;
  @Prop({ required: true })
  birthdayDate: string;
  @Prop({ required: true, unique: true })
  email: string;
  @Prop({ required: true, unique: true })
  phone: string;
  @Prop()
  male: string;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);
