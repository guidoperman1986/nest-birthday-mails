import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
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
    return this.contactModel.find();
  }

  findOne(id: string) {
    return this.contactModel.findById({ _id: id });
  }

  async findAllPaginated(skip: number, limit: number) {
    const countItems = await this.contactModel.countDocuments({}).exec();
    const totalPages = (await Math.floor((countItems - 1) / limit)) + 1;

    const contacts = await this.contactModel
      .find()
      .sort({ birthdayDate: -1 })
      .skip(skip)
      .limit(limit);

    return {
      contacts,
      countItems,
      totalPages,
    };
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

  async update(id: string, updateContactDto: UpdateContactDto) {
    try {
      const contactToUpdate = await this.findOne(id);
      const udpatedContact = await contactToUpdate.updateOne(updateContactDto);

      return udpatedContact;
    } catch (error) {
      console.log(error);

      throw new InternalServerErrorException();
    }
  }

  remove(id: string) {
    try {
      const contact = this.findOne(id);
      return this.contactModel.deleteOne(contact);
    } catch (error) {
      throw new NotFoundException(`Contact with id ${id} was not found`);
    }
  }
}
