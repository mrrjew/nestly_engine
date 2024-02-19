import { join, parse } from 'path';
import { IApartmentImage } from '../../types/apartment/image';
import IService, { IAppContext } from '../../types/app';
import { createWriteStream } from 'fs';

export default class ApartmentImagesService extends IService {
  constructor(props: IAppContext) {
    super(props);
  }

  async uploadImages(UploadImagesInput, userId: any) {
    try {
      const apartment = await this.models.Apartment.find({ owner: userId });

      if (!apartment) {
        throw new Error(`Apartment not found`);
      }

      let { filename, createReadStream } = await UploadImagesInput;

      const stream = createReadStream();

      let { ext, name } = parse(filename);

      name = name.replace(/([^a-z0-9 ]+)/gi, '_').replace(' ', '_');

      let serverFile = join(__dirname, `../../uploads/${name}-${Date.now()}${ext}`);

      const writeStream = await createWriteStream(serverFile);

      await stream.pipe(writeStream);

      serverFile = `${URL}${serverFile.split('uploads')[1]}`;

      return serverFile
    } catch (e) {
      throw new Error(`Error uploading images: ${e}`);
    }
  }
}
