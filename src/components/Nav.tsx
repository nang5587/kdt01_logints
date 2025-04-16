import "./font.css"
import { FiUser } from "react-icons/fi";
import { RiLoginCircleLine } from "react-icons/ri";
import { RiLogoutCircleLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useAtom } from "jotai";
import { logAtom } from "../atoms/IsLogin";


export default function Nav() {
  //전역변수로 로그인 상태 관리
  const [login, setLogin] = useAtom(logAtom);

  //로그아웃 함수
  const handlelogout = () => {
    setLogin(false);
    localStorage.clear();
  };

  return (
    <div className="w-full flex justify-between items-center text-gray-700">
      <h2 id="title" className="text-3xl text-gray-800 font-bold ml-10 text-left">BUSAN <br/> <span className="text-2xl">지하철 실내공기정보</span></h2>
      <div className="flex justify-center items-center">

        {/* 로그인 시 myClock 제공 */}
        {login &&
          <Link to="/myClock" id="navcenter"
            className="inline-flex items-center justify-center text-xl text-gray-700
              mr-5 px-5 py-1 w-36 text-center hover:underline underline-offset-4">
            CLOCK
          </Link>}

        {/* 로그인 시 지하철 정보 제공 */}
        {login &&
          <Link to="/subway" id="navcenter"
            className="inline-flex items-center justify-center text-xl text-gray-700
              mr-5 px-5 py-1 w-36 text-center hover:underline underline-offset-4">
            SUBWAY
          </Link>}

        {/* 로그인 시 영화 정보 제공 */}
        {login &&
          <Link to="/movie" id="navcenter"
            className="inline-flex items-center justify-center text-xl text-gray-700
              mr-5 px-5 py-1 w-36 text-center hover:underline underline-offset-4">
            MOVIE
          </Link>}

        {/* 로그인 시 Food 정보 제공 */}
        {login &&
          <Link to="/food" id="navcenter"
            className="inline-flex items-center justify-center text-xl text-gray-700
              mr-5 px-5 py-1 w-36 text-center hover:underline underline-offset-4">
            FOOD
          </Link>}
          
          {/* 로그인 시 todoList 제공 */}
          {login &&
          <Link to="/todoList" id="navcenter"
            className="inline-flex items-center justify-center text-xl text-gray-700
              mr-5 px-5 py-1 w-36 text-center hover:underline underline-offset-4">
            TODOLIST
          </Link>}

          {/* 로그인 시 lotto 제공 */}
          {login &&
          <Link to="/lotto" id="navcenter"
            className="inline-flex items-center justify-center text-xl text-gray-700
              mr-5 px-5 py-1 w-36 text-center hover:underline underline-offset-4">
            LOTTO
          </Link>}
        </div>

        {/* 홈으로 이동 */}
        <div className="flex justify-end items-center">
          <Link to="/"
                    className="inline-flex items-center justify-center w-8 mr-3 text-gray-700
                    ">
                    <FiUser className="w-full h-full"/>
          </Link>

          {/* 로그인 상태에 따라 로그인/로그아웃 아이콘 변경 */}
          {login ? (
            <Link to="/login"
              onClick={handlelogout}
              className="inline-flex items-center justify-center w-8 mr-5 text-gray-700">
              <RiLogoutCircleLine className="w-full h-full"/>
            </Link>
          ) : (
            <Link to="/login" className="inline-flex items-center justify-center w-8 mr-5 text-gray-700">
            <RiLoginCircleLine className="w-full h-full"/>
            </Link>
          )}
      </div>
    </div>
  )
}
