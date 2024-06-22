import Banner from '@/components/banner/Banner';

import { API_URL } from '@/utils/constants';
import axios from 'axios';



export default async function Home() {
  const apiBaner = API_URL.Banner_url;
  
  const res = await axios.get(apiBaner);
  const data = res.data;
  

  return (
    <div className='container py-20'>
      <Banner data={data ? data : []}></Banner>

    </div>
  );
}
