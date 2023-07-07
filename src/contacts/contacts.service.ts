import { Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Contact } from './entities/contact.entity';
import { Model } from 'mongoose';

@Injectable()
export class ContactsService {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(
    @InjectModel(Contact.name) private contactModel: Model<Contact>,
  ) {}

  async create(createContactDto: CreateContactDto) {
    try {
      const newContact = new this.contactModel(createContactDto);
      await newContact.save();

      return newContact;
    } catch (error) {
      console.log(error);
    }
  }

  findAll() {
    return `This action returns all contacts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} contact`;
  }

  update(id: number, updateContactDto: UpdateContactDto) {
    return `This action updates a #${id} contact`;
  }

  remove(id: number) {
    return `This action removes a #${id} contact`;
  }
}
