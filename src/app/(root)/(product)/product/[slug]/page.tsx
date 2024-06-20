import React from 'react';
import { API_URL } from '@/utils/constants';
import axios from 'axios';
import { currentUser } from '@clerk/nextjs/server';

import DetailProduct from '@/module/DetailProduct';

const DetailPage = async (props: any) => {
  const slug = props.params?.slug;
  const apiProduct = `${API_URL.Product_Url}/${slug}`;

  const user = await currentUser();
  const res = await axios.post(apiProduct);

  const dataDetail = res.data;

  if (!dataDetail) return <div>loading</div>;

  return <DetailProduct data={dataDetail} ></DetailProduct>;
};

export default DetailPage;
