import bank from '../../assets/bank.png'
import busan from '../../assets/busan.png'
import market from '../../assets/market.png'
import { useState } from 'react'
import { FoodDataInter } from '../../types/FoodT'

interface FoodCardProps {
  obj: FoodDataInter;
}

interface imggubunT {
  "광역지원센터" : string;
  "기초푸드뱅크" : string;
  "기초푸드마켓" : string;
}

export default function FoodCard({obj}:FoodCardProps) {
    const imgs:imggubunT = {
        "광역지원센터" : busan,
        "기초푸드뱅크" : bank,
        "기초푸드마켓" : market,
    }
    const [isShow, setIsShow] = useState(false);
    const handleShow = () => {
        setIsShow(!isShow);
    }

  return (
    <div className="w-full h-58  rounded-2xl text-gray-600 bg-white flex justify-start items-start text-left
                    shadow-md">
      <div className="w-1/4 flex justify-center pt-3 pl-3">
        <img src={imgs[obj["구분"] as keyof imggubunT]} alt= {obj["구분"]} />
      </div>
      <div className="w-3/4 h-full flex flex-col px-4 py-5">
        <div className="h-1/5 mb-1">
            <p className='text-xl font-bold'>{obj["사업장명"]}</p> 
        </div>
        <div className="h-1/5 mb-1">
            <p className='text-base font-bold'>{obj["운영주체명"]}</p>
        </div>
        <div className="h-2/5">
            <p className='text-xs text-gray-500'>{obj["사업장 소재지"]}</p>
        </div>
        <div className="h-1/5 " onClick={handleShow}>
            <p className='h-11/12 text-xs bg-white shadow-lg shadow-gray-400 border-4 border-gray-200 rounded-md font-bold text-gray-500 flex items-center px-3 py-0.5
                        cursor-pointer'>{isShow && `연락처(대표번호) : ${obj["연락처(대표번호)"]}, 팩스 : ${obj["팩스번호"]}`}</p>
        </div>
      </div>
    </div>
  )
}
