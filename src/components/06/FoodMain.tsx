import FoodCard from './FoodCard';
import foodData from './fooddata.json'
import React, { useState } from "react";
import TailButton from "../../UI/TailButton";
import { FoodDataInter } from '../../types/FoodT';

export default function  FoodMain(){
    const[tags, setTags] = useState<React.ReactNode[]>([]);
    let category = foodData.map((item:FoodDataInter) => item["운영주체 분류"].replace(/ /g, ''));
    category = [...new Set(category)];

    const handleCategory = (c:string) => {
        console.log("handleCategory", c);
        let tm = foodData.filter((item:FoodDataInter) => item["운영주체 분류"].replace(/ /g, '') == c);
        setTags(tm.map((item:FoodDataInter) => <FoodCard 
                                key={item['사업장명']}
                                obj={item}/>));
    }
    const bts = category.map(item =><div className='w-1/5 mx-10'>
                                    <TailButton 
                                    key={item}
                                    caption={item.split('.')[1]}
                                    color={"lblue"}
                                    onClick={() => handleCategory(item)}/>
                                    </div>)

    return (
    <div className="w-11/12 flex flex-col justify-center items-center">
        <div className="w-full h-15 flex justify-center items-center mb-10">
            {bts}
        </div>
        <div className="w-11/12 grid grid-cols-1 lg:grid-cols-2 gap-7 place-items-center">
            {tags}
        </div>
    </div>
    )
}
