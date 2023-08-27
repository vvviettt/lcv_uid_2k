import {IProduct} from '../../../../redux/slices/category/category.type';

export interface ProductItemProps {
  product: IProduct;
  addWishListHandle?: () => void;
}
