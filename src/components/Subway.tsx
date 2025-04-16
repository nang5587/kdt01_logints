import TailSelect from "../UI/TailSelect"
import React, { useEffect, useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { useAtom } from "jotai"
import { logAtom } from "../atoms/IsLogin"
import scode from "../db/scode.json"
import sarea from "../db/sarea.json"

interface Tdata {
  [key:string] : string;
}

interface Sarea {
  "코드":string;
  "측정소":string;
}

interface Scode {
  [key:string]: {
    "name": string;
    "unit": string;
    "description": string;
  }
}

export default function Subway() {
  const [login] = useAtom(logAtom);
  const navigate = useNavigate();

  useEffect(() => {
    if (!login) {
      navigate("/");
    }
  }, [login, navigate]);

  const [tags, setTags] = useState<React.ReactNode[]>([]);
  const [tags1, setTags1] = useState<React.ReactNode[]>([]);
  const [data, setData] = useState<Tdata[]>([]);
  const [, setCode] = useState<string | undefined>();
  const refSel = useRef<HTMLSelectElement>(null);

  const selList = sarea.map(
      item => item["측정소"]
    );
    const getYesterday = () => {
      let dt = new Date();
      dt.setDate(dt.getDate() - 1);
  
      //년도
      let year = String(dt.getFullYear());
      year = year.slice(2);
      //월
      let month = String(dt.getMonth() + 1).padStart(2, '0');
      // month = month < 10 ? '0' + month : month ;
  
      //일 
      let day = String(dt.getDate()).padStart(2, '0');
      
      return (year +  month + day);
    }
    


  const getFetchData = async () => {
      const apiKey = import.meta.env.VITE_APP_API_KEY;

      let url = "https://apis.data.go.kr/6260000/IndoorAirQuality/getIndoorAirQualityByStation?serviceKey=";
      url = `${url}${apiKey}&pageNo=1&numOfRows=104&resultType=json&controlnumber=${getYesterday()}10`
      const resp = await fetch(url);
      const data = await resp.json();
    
      let subwayData = data.response.body.items.item;
      setData(subwayData);
  }

  const handleChange = () => {
      const selected = refSel.current?.value;

      const codes = (sarea as Sarea[]).map((item:Sarea) => `${item["측정소"]},${item["코드"]}`); // json은 ":" 말고 "as"
      const test = codes.find(item => item.split(',')[0] === selected) || "";
      const selectedCode:string = test.split(',')[1] || "";
      console.log(selectedCode)
      setCode(selectedCode);

      const data2 = data.filter((item:Tdata) => item.areaIndex === selectedCode);
      // console.log("data2",data);
      const tm = data2.map((item:Tdata, idx:number) => 
          <tr key={`${item}${idx}`}
          className="bg-white border-b border-gray-200
                  hover:bg-gray-50 hover:cursor-pointer hover:font-bold" >

            <td className="px-6 p-4 text-center">
            {item["pm10"]}
            </td>
            <td className=" px-6 py-4 text-center ">
            {item["co2"]}
            </td>
            <td className=" px-6 py-4 text-center">
            {item["co"]}
            </td>
            <td className=" px-6 py-4 text-center">
            {item["no2"]}
            </td>
            <td className=" px-6 py-4 text-center">
            {item["no"]}
            </td>
            <td className=" px-6 py-4 text-center">
            {item["nox"]}
            </td>
            <td className=" px-6 py-4 text-center">
            {item["o3"]}
            </td>
            <td className=" px-6 py-4 text-center">
            {item["pm25"]}
            </td>
            <td className=" px-6 py-4 text-center">
            {item["fad"]}
            </td>
            </tr>);
      setTags(tm);
  }

  useEffect(()=>{
      getFetchData();
  }, []);

  useEffect(()=>{
    if(!data) return;
    const itemKeys:string[] = Object.keys(scode as Scode);
    const scodeT = scode as Scode;

    let tm = itemKeys.map((item:string) => 
          <th key={item} className="font-bold px-6 py-3 text-center w-1/9">
          {scodeT[item]["name"]}<br/>({item})
          </th>
    )
    setTags1(tm)
    handleChange();
  }, [data]);

  return (
    <div className="w-9/10">
        <div className="w-full flex justify-between items-center">
            <h2 id="kakaoMid" className="text-lg text-gray-700 font-bold my-10 px-5 py-2 rounded-lg bg-white
                          border-1 border-gray-100 shadow-md shadow-gray-300">측정소 선택</h2>
            <div id="kakaoNomal" className="w-1/3"><TailSelect 
                id="sel"
                refSel={refSel}
                items={selList}
                handleChange={handleChange}
            />
            </div>
        </div>
        <table id="kakaoNomal" className="w-full text-sm text-left rtl:text-right text-gray-700">
        <thead className="text-sm text-gray-700 uppercase bg-gray-100 dark:bg-gray-700">
          <tr>
            {tags1}
          </tr>
        </thead>
        <tbody>
          {tags}
        </tbody>
      </table>    
    </div>
  )
}
