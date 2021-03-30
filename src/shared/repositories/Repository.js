/* eslint-disable radix */
export default class Repository {
   constructor(model) {
      this.model = model;
   }

   async findOne(where) {
      const result = await this.model.findOne(this.model.translateAliases(where));

      return result;
   }

   async findById(id) {
      const result = await this.model.findById(id);

      return result?.toObject();
   }

   async findAll({ where, sort, limit }) {
      const data = await this.model
         .find(this.model.translateAliases(where))
         .sort(this.model.translateAliases(sort))
         .limit(parseInt(limit) || null)
         .exec();

      return data;
   }

   async findAndPaginate({ where, sort, skip, limit }) {
      const data = await this.model
         .find(this.model.translateAliases(where))
         .sort(this.model.translateAliases(sort))
         .skip(this.model.translateAliases(skip))
         .limit(this.model.translateAliases(limit))
         .exec();

      return data;
   }

   async updateOne(data) {
      const { id } = data;

      const result = await this.model.updateOne({ _id: id }, this.model.translateAliases(data));

      return result;
   }

   async findByIdAndUpdate(data) {
      const { id } = data;

      const result = await this.model.findByIdAndUpdate(id, this.model.translateAliases(data), { new: true });

      return result;
   }

   async create(data) {
      const result = await this.model.create(this.model.translateAliases(data));

      return result?.toObject();
   }

   async delete(_id) {
      await this.model.deleteOne({ _id });
   }

   async deleteAll() {
      await this.model.deleteMany({});
   }

   async insertMany(data) {
      const result = await this.model.insertMany(data);
      return result;
   }

   async findUpdate({ filter, data }) {
      const result = await this.model.updateOne(this.model.translateAliases(filter), this.model.translateAliases(data), {
         upsert: true,
      });

      return result;
   }

   async deleteMany(filter) {
      await this.model.deleteMany(this.model.translateAliases(filter));
   }

   async countWithFilter(where) {
      const result = await this.model.countDocuments(this.model.translateAliases(where));

      return result;
   }

   async countDocuments() {
      const result = await this.model.estimatedDocumentCount();

      return result;
   }

   async findAllPopulate({ where, sort, limit, populate }) {
      const data = await this.model
         .find(this.model.translateAliases(where))
         .sort(this.model.translateAliases(sort))
         .limit(parseInt(limit) || null)
         .populate(populate)
         .exec();

      return data;
   }
}
