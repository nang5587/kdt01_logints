interface TailButtonProps {
  caption:string;
  color:"blue" | "red" | "emerald" | "orange" | "lorange" | "lblue" | "gray" | "white" | "yellow";
  onClick?:(e:MouseEvent<HTMLButtonElement>)=>void; // "?" 붙이면 onClick 반드시 안 써도 됨
}

import { MouseEvent } from "react"; // e.preventDefault 안 해도 됨

type BgT = {
  "blue":string;
  "red":string;
  "emerald":string;
  "orange" :string;
  "lorange":string;
  "lblue":string;
  "gray":string;
  "white":string;
  "yellow":string;
}


export default function TailButton({caption, color, onClick}:TailButtonProps) {
    const bg:BgT = {
        "blue" : "bg-blue-700 text-white",
        "red" : "bg-red-700 text-white",
        "emerald" : "bg-emerald-800 text-white",
        "orange" : "bg-orange-600 text-white",
        "lorange" : "bg-orange-300 text-white",
        "lblue" : "bg-blue-400 text-white",
        "gray" : "bg-gray-100 text-white",
        "white" : "bg-white text-gray-600 font-bold",
        "yellow" : "bg-yellow-200 text-white",
    }
    const bgHover:BgT = {
        "blue" : "hover:bg-blue-500 text-white",
        "red" : "hover:bg-red-500 text-white",
        "emerald" : "hover:bg-emerald-600 text-white",
        "orange" : "hover:bg-orange-500 text-white",
        "lorange" : "hover:bg-orange-200 text-white",
        "lblue" : "hover:bg-blue-700 text-white",
        "yellow" : "hover:bg-yellow-400 text-white",
        "white" : "hover:bg-white text-gray-600 font-bold",
        "gray" : "hover:bg-gray-100 text-white",
    }
  return (
    <button type="button" onClick={onClick} className={`w-full py-2 px-4 text-base
                    flex justify-center items-center
                    ${bgHover[color]} hover:font-bold
                    ${bg[color]} rounded-lg 
                    `}>
      {caption}
    </button>
  )
}
