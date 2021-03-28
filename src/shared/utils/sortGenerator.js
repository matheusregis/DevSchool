export default function sortGenerator(allowedSortParams, sort, sortType) {
   const allowedSorts = allowedSortParams;
   const validateSort = allowedSorts.some(item => item === sort);
   if (!validateSort || (Number(sortType) !== 1 && Number(sortType) !== -1)) {
      return null;
   }
   const sortFilter = {
      [sort]: Number(sortType),
   };

   return sortFilter;
}
