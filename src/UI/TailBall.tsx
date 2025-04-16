interface TailBallProps {
  n : number | string;
}

// 1. 첫번째 방법
// type BgColorT = {
//   "n0" : string,
//   "n1" : string,
//   "n2" : string,
//   "n3" : string,
//   "n4" : string
// }

// 2. 두번째 방법
type BgColorT = Record<`n${0|1|2|3|4}`, string>

export default function TailBall({n}:TailBallProps) {
    const bgColor:BgColorT = {
      "n0" : "bg-yellow-200",
      "n1" : "bg-green-200",
      "n2" : "bg-sky-300",
      "n3" : "bg-purple-300",
      "n4" : "bg-sky-500"
    }


    const num : number = typeof n === 'string' ? parseInt(n)  : n ;
    const strNum = "n" + String(Math.floor(num / 10))
    // keyof : strNum은 BgColorT의 key값만 올 수 있으니 해줘야 함
  return (
    <div className={
        `w-16 h-16 ${bgColor[strNum as keyof BgColorT]}
        flex justify-center items-center
        p-10 rounded-full mr-5
        text-3xl text-white font-bold`
    }>
      {n}
      <div className="bg-purple-300"></div>
    </div>
  )
}
