import React, { useState, useEffect, useRef } from "react"
import { FaArrowUp, FaArrowDown } from "react-icons/fa6"; 
import mv from "../assets/mvimg.png"

interface MovieT {
  audiAcc : string;
  audiChange : string;
  audiCnt: string;
  audiInten: string;
  movieCd: string;
  movieNm: string;
  openDt: string;
  rank: string;
  rankInten: string;
  rankOldAndNew: string;
  rnum: string;
  salesAcc: string;
  salesAmt: string;
  salesChange: string;
  salesInten: string;
  salesShare: string;
  scrnCnt: string;
  showCnt: string;
}

export default function BoxOffice() {
  //ref
  const refDt = useRef<HTMLInputElement>(null);
  
  //화면에 랜더링 될 상태 변수
  const [tags, setTags] = useState<React.ReactNode[]>([]);
  const [botton, setBotton] = useState<React.ReactNode>();
  const [ndt, setnDt] = useState<string>('');

  const getYesterday = ():string => {
    let dt = new Date();
    dt.setDate(dt.getDate() - 1);

    //년도
    let year = dt.getFullYear();

    //월
    let month = String(dt.getMonth() + 1).padStart(2, '0');
    // month = month < 10 ? '0' + month : month ;

    //일 
    let day = String(dt.getDate()).padStart(2, '0');

    return (year + '-' + month + '-' + day);
  }
   
    //일일 박스 오피스 정보 가져오기
    const getFetchData = async() => {
      const mvApiKey = import.meta.env.VITE_APP_MV_KEY ;
      let tmdt = ndt.replaceAll('-', '');
      let url = 'https://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?';
      url = `${url}key=${mvApiKey}&targetDt=${tmdt}`;
      console.log("url", url);
      // console.log(refDt.current.value);
      // console.log(url)
      const resp = await fetch(url);
      const data = await resp.json();
      const boxList = data.boxOfficeResult.dailyBoxOfficeList;
      console.log(boxList)
      
      let tm = boxList.map((item:MovieT) =>  <tr key={item.movieCd} onClick={() => handleClick(item)}
                                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200
                                                    hover:bg-gray-50 dark:hover:bg-gray-600 hover:cursor-pointer hover:font-bold">
                                      <td className=" px-6 p-4 text-center">
                                        {item.rank}
                                      </td>
                                      <td className=" px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {item.movieNm}
                                      </td>
                                      <td className=" px-6 py-4 text-right">
                                        {parseInt(item.salesAmt).toLocaleString()}
                                      </td>
                                      <td className=" px-6 py-4 text-right">
                                        {parseInt(item.audiCnt).toLocaleString()}
                                      </td>
                                      <td className=" px-6 py-4 text-right">
                                        {parseInt(item.salesAcc).toLocaleString()}
                                      </td>
                                      <td className=" px-6 py-4 text-right">
                                        {parseInt(item.audiAcc).toLocaleString()}
                                      </td>
                                      <td className="w-full px-6 py-4 text-center inline-flex justify-center items-center" >
                                        {parseInt(item.rankInten) > 0 ? <span className="text-red-600"><FaArrowUp /></span> 
                                          : parseInt(item.rankInten) < 0 ? <span className="text-blue-600"><FaArrowDown /></span> : ''}
                                        &nbsp;{item.rankInten == "0" ? '-' : Math.abs(parseInt(item.rankInten))}                                    
                                      </td>
                                    </tr>)
      setTags(tm);    
    }
    const handleClick = (item:MovieT) => {
      let bt:React.ReactNode = <tr className="border-b bg-gray-100 dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="px-6 p-4 text-center font-bold text-black" colSpan='7'>
                  [{item.rankOldAndNew} {item.openDt}] <span className="text-blue-600">{item.movieNm}</span>,  &nbsp;상영한 스크린 수: {item.scrnCnt},  &nbsp;상영횟수: {item.showCnt}
                </td>
              </tr>
      setBotton(bt);
    }
    const dateChng = ()=>{
      if(!refDt.current) return;
      setnDt(refDt.current?.value);
      setBotton('');
    }
    //컴포넌트가 실행 시 한 번 fetch
    useEffect(()=>{
        setnDt(getYesterday());
        if(refDt.current)
          refDt.current.max = getYesterday();
    }, []);

    useEffect(()=>{
      if(!ndt) return;
      if(refDt.current)
        refDt.current.value = ndt;
      
      getFetchData();
    }, [ndt]);



  return (
    <div className="w-11/12">
      <h2 className="text-3xl font-bold text-left ml-5 text-gray-700 flex flex-row justify-start items-center">
        <span className="w-15"><img src={mv} alt="mvimg" /></span>&nbsp;&nbsp;Box Office
      </h2>
      <div className="flex justify-end items-center font-bold text-gray-700">
      <input type="date" ref={refDt} onChange={dateChng} className="my-5 mx-5 px-4 py-1 bg-white border border-gray-200 rounded-lg shadow-sm 
                            focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-400 cursor-pointer"/>
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-sm text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <td className="w-20 font-bold px-6 py-3 text-center">
              순위
            </td>
            <th className="min-w-auto px-6 py-3 text-center">
              영화명
            </th>
            <th className="min-w-auto px-6 py-3 text-center w-1/7">
              매출액
            </th>
            <th className="min-w-auto  px-6 py-3 text-center w-1/7">
              관객수
            </th>
            <th className="min-w-auto  px-6 py-3 text-center w-1/7">
              누적 매출액
            </th>
            <th className="min-w-auto  px-6 py-3 text-center w-1/7">
              누적 관객수
            </th>
            <th className="min-w-auto  px-6 py-3 text-center w-24">
              증감율
            </th>
          </tr>
        </thead>
        <tbody>
          {tags}          
        </tbody>
        <tfoot>
          {botton}         
        </tfoot>
      </table>
    
  </div>
  )
}
