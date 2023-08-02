import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Contact } from './entities/contact.entity';
import { Model } from 'mongoose';
import { DateTime } from 'luxon';

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
      if (error.code === 11000) {
        throw new BadRequestException('User already exists');
      }

      throw new InternalServerErrorException();
    }
  }

  findAll() {
    return `This action returns all contacts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} contact`;
  }

  async findByDate(): Promise<Contact[]> {
    const month = DateTime.now().month;
    const day = DateTime.now().day;

    const stringMonth = month < 10 ? '0' + month.toString() : month;
    const stringDay = day < 10 ? '0' + day.toString() : day;

    const contacts = await this.contactModel.aggregate([
      {
        $match: {
          $expr: {
            $regexMatch: {
              input: {
                $toString: '$birthdayDate',
              },
              regex: `${stringMonth}-${stringDay}`,
            },
          },
        },
      },
    ]);
    console.log(contacts);
    return contacts;
  }

  update(id: number, updateContactDto: UpdateContactDto) {
    return `This action updates a #${id} contact`;
  }

  remove(id: number) {
    return `This action removes a #${id} contact`;
  }
}
