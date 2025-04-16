import { useEffect, useState } from "react";
import styles from "./MyClockTime.module.css";
function MyClockTime(){
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(()=>{
        //1초에 한 번씩 실행됨
        let tm = setInterval(()=>{
            setCurrentTime(new Date());
        }, 1000);

        return ()=>{
            clearInterval(tm)
        } 

    }, []);

    return(
        <div className="w-full p-5 
                        font-bold text-xl text-gray-600 text-center">
            <p className="mt-10">
                현재 시각 :
            </p>
            <p className={styles.pst}>
                {currentTime.toLocaleTimeString()}
            </p>
        </div>
    )
}

export default MyClockTime