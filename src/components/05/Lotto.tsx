import TailBall from "../../UI/TailBall";
import TailButton from "../../UI/TailButton";
import React, { ReactNode, useState } from "react"
export default function Lotto() {
    const [lottoTags, setLottoTags] = useState<ReactNode[]>([]);
    
    const handleLottoNum = () => {
        let lottoNum:(number|string)[] = [];
        while(lottoNum.length < 7){
            let n = Math.floor(Math.random()*45) +1; //1~45까지
            //랜덤수를 배열에 넣기
            if(!lottoNum.includes(n)){
                lottoNum.push(n)
            }
        }
        //마지막 보너스 번호 => 배열임
        let bonus = lottoNum.splice(-1);
        //로또 번호 정렬
        lottoNum.sort((a:number|string, b:number|string) => {
          if(typeof a === 'string') a = parseInt(a)
          if(typeof b === 'string') b = parseInt(b)
          return a-b
        });
        //로또 배열 다시 생성
        lottoNum = [...lottoNum, '+', ...bonus]
        // setLottoTags = lottoNum; state 변수는 이렇게 못씀
        //TailBall 만들기
        let tm = lottoNum.map((item:number|string) => item === '+' ? <span className="w-16 h-16 text-4xl font-bold mr-5
                                                    flex justify-center items-center">{item}</span> 
                                        : <TailBall key={'n' + item} n={item}/>);
        setLottoTags(tm);
        console.log(lottoNum);
    }
  return (
    <div className="w-11/12 flex flex-col justify-center items-center">
      <div className="w-full flex justify-center items-center mb-10">
        {lottoTags}
      </div>
      <div className="mt-10 flex">
        <TailButton caption="로또번호생성" color="lblue" onClick={handleLottoNum}/>     
      </div>
    </div>
  )
}
