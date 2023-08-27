import {ViewStyle} from 'react-native';
import {ICategory} from '../../../../redux/slices/static/static.type';

export interface CategoryItemProps {
  category: ICategory;
  wrapperStyle?: ViewStyle;
  imageStyle?: ViewStyle;
}
