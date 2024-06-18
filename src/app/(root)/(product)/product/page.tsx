import React from 'react';

import { API_URL } from '@/utils/constants';
import axios from 'axios';
import ListProduct from '@/components/product/ListProduct';

const ProductPage = async () => {
    const apiProduct = API_URL.Product_Url;
  
    const res = await axios.get(apiProduct);
    const data = res.data;
    
    return (
        <div>
            <ListProduct dataCard={data ? data : []}></ListProduct>
        </div>
    );
};

export default ProductPage;