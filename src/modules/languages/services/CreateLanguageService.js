import AppError from '@shared/errors/AppError';
import LanguagesRepository from '../repositories/LanguagesRepository';

export default class CreateAccountService {
   async execute({ languageName }) {
      if (!languageName) {
         throw new AppError('Invalid Fields', 400);
      }
      const languageRepository = new LanguagesRepository();

      const checkLanguageExist = await languageRepository.findOne({ languageName });

      if (checkLanguageExist) {
         throw new AppError('Language Already Created', 400);
      }

      const language = await languageRepository.create({ languageName });
      return language;
   }
}
