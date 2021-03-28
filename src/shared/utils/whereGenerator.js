import AppError from '../errors/AppError';

const generateFilters = (arrObjects) => {
  const valueArray = arrObjects.map((item) => {
    const key = Object.keys(item)[0];
    return item[key];
  });

  const filters1 = arrObjects.filter((_, index) => Boolean(valueArray[index]));
  return filters1.map((item) => {
    const key = Object.keys(item)[0];
    // eslint-disable-next-line no-useless-escape
    const format = /[`!@#$%^&*()_\-=\[\]{};':"\\|,.<>\/?~]/;
    if (item.search) {
      if (format.test(item[key]) === true) {
        throw new AppError('Invalid characters');
      }
      return {
        [key]: new RegExp(`^${item[key]}`, 'i'),
      };
    }
    return {
      ...item,
    };
  });
};

export default function whereGenerator(allowedFilters) {
  const generatedFilters = generateFilters(allowedFilters);
  const where = generatedFilters.reduce((item, pv) => {
    return {
      ...pv,
      ...item,
    };
  }, {});
  return where;
}
