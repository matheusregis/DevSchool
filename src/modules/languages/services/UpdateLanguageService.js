import AppError from '@shared/errors/AppError';
import LanguagesRepository from '../repositories/LanguagesRepository';

export default class UpdateLanguageService {
   async execute({ languageName, id }) {
      const languageRepository = new LanguagesRepository();

      const checkLanguageExist = await languageRepository.findOne({ languageName });

      if (checkLanguageExist) {
         throw new AppError('Language Already Created', 400);
      }

      const language = await languageRepository.findByIdAndUpdate({ languageName, id });
      return language;
   }
}
