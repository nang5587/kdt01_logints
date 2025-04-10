import "./font.css"
import TailButton from "../UI/TailButton"
import { useAtom } from "jotai";
import { useRef } from "react";
import { logAtom } from "../atoms/IsLogin";
import { useNavigate } from "react-router-dom";
import train from "../assets/subway.png"
export default function Login() {
  //사용할 변수 초기화
  const [login, setLogin] = useAtom(logAtom);
  const navigate = useNavigate();
  const emailref = useRef();
  const passref = useRef();

  //input에 입력된 값 확인 후 로컬스토리지 저장하는 함수
  const handleSubmit = (e) => {
    //url로 민감한 정보 전송 방지
    e.preventDefault();

    //이메일과 패스워드가 빈 상태인지 확인
    if(emailref.current.value == ""){
      alert("이메일을 입력해주세요.");
      emailref.current.focus();
      return;
    }
    if(passref.current.value == ""){
      alert("패스워드를 입력해주세요.");
      passref.current.focus();
      return;
    }

    //로컬스토리지에 저장
    localStorage.setItem('logEmail', emailref.current.value);
    localStorage.setItem('logPass', passref.current.value);

    //로그인 상태 변경
    setLogin(true);

    //홈으로 이동
    navigate("/");
  };

  return (
      <div className="flex w-full justify-start px-6 py-5 lg:px-8 mt-20">
        <div className="w-1/2 h-auto mt-10 flex justify-center items-center">
          <img src={train} id="rotated" className="w-4/5 ml-20"/>
        </div>

        <div className=" w-1/2 h-auto flex justify-center items-center">
          <form className="w-1/2 space-y-6 bg-white border-1 border-gray-200 shadow-md shadow-gray-300 rounded-2xl px-10 pt-10 pb-20 animate-fade-up" 
                onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold text-center mb-15 text-gray-700">Login</h2>
            
            {/* 이메일 input */}
            <div>
              <label htmlFor="email" className="block text-sm/6 font-bold text-gray-700">
                이메일
              </label>
              <div className="mt-2">
                <input
                  ref={emailref}
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 
                  outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 
                  focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 focus:bg-white"/>
              </div>
            </div>

            {/* 패스워드 input */}
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-bold text-gray-700">
                  패스워드
                </label>
              </div>
              <div className="mt-2">
                <input
                  ref={passref}
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 
                  outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2
                focus:outline-indigo-600 sm:text-sm/6 focus:bg-white"/>
              </div>
            </div>

            {/* 로그인 버튼 */}
            <div>
                <TailButton 
                    caption="Login"
                    color="lblue"
                    onClick={handleSubmit}
                />
            </div>
            
          </form>
        </div>
      </div>
  )
}
