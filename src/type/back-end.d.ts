export default interface IBanner {
  _id: string;
  name_product: string;
  image_product: string;
  slug: string;
  banner: boolean;
}
export default interface IProduct {
  created_by: {
    created_at: Date;
  };
  _id: string;
  name_product: string;
  price_product: number;
  image_product: string;
  product_category: string;
  status: string;
  deleted: boolean;
  position: number;
  sale: number;
  quantity: number;
  description: string;
  slug: string;

  banner: boolean;
  details: [
    {
      color: string;
      size: string;
      price: number;
      _id: string;
    }
  ];
}
export default interface IUser {
  id: string;
  banned: boolean;
  username: string;
  firstName: string;
  lastName: string;
  imageUrl: string;
}
