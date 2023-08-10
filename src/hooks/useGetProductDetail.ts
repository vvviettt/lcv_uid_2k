import {useEffect} from 'react';
import {API_PROCESS} from '../redux/enum';

const useGetProductDetail = (productId: string) => {
  useEffect(() => {}, []);
  return {
    isLoading: API_PROCESS.LOADING,
  };
};

export default useGetProductDetail;
