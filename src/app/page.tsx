import Banner from "@/components/banner/Banner";
import { API_URL } from "@/utils/constants";
import axios from "axios";
import { useState } from "react";

export default async function Home() {
  
  const api = API_URL.Banner_url
  const res = await axios.get(api)
  const data = res.data
  
  
  return (
  <div className="">
    <Banner data={data ? data : []}></Banner>
  </div>
  );
}
