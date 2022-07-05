import { connection } from '../data/connection';

export const createProductRepository = async (product: {}) => {
   try {
      return await connection("labecommerce_products")
        .insert(product);
   } catch (error: any) {
      return error.message;
   };
};

export const readProductsRepository = async () => {
   try {
      return await connection('labecommerce_products').select();
   } catch (error: any) {
      return error.message;
   }
};