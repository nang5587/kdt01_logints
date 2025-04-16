
import clockimg from './clock2.png'
function MyClockImage(){
    return(
        <div className='w-70 h-70'>
        <img src={clockimg} className="tilt-animation w-full h-full" alt="Clock"/>
        </div>
    )
}

export default MyClockImage