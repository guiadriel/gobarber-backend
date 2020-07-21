import handlebars from 'handlebars';
import fs from 'fs';
import IMailTemplateProvider from '../models/IMailTemplateProvider';
import IParceMailTemplateDTO from '../dtos/IParseMailTemplateDTO';

class HandlebarsMailTemplateProvider implements IMailTemplateProvider {
  public async parse({
    file,
    variables,
  }: IParceMailTemplateDTO): Promise<string> {
    const templateFileContent = await fs.promises.readFile(file, {
      encoding: 'utf-8',
    });
    const parseTempalte = handlebars.compile(templateFileContent);

    return parseTempalte(variables);
  }
}

export default HandlebarsMailTemplateProvider;
