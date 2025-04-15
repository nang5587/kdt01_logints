// 반복적으로 쓰는 타입은 export 바깥에 내가 정의한 타입으로 선언
type nameT = [string, number] ;

// type personT = {name:string; age:number;} ; // ";" 이걸로 구분
interface personT {name:string; age:number;} ; // interface는 "=" 안 씀

export default function TsxTest() {
    let name:string = "PNU";
    let age:number = 20;

    // let names:string[] = ['Kim', 'Lee'];
    // let ages:Array<number> = [10,30];
    
    let nameTuple1:nameT = ['Kim', 10];
    let nameTuple2:nameT = ['Lee', 30];
    // 데이터 타입이 다른 것이 들어간 것이 튜플?
    // let nameTuple1:[string, number] = ['Kim', 10]; 위와 같음
    // let nameTuple2:[string, number] = ['Lee', 30];


    // let person1: {name:string, age:number} = {name : 'kim', age : 10}; 아래와 같음
    // let person2: {name:string, age:number} = {name : 'Lee', age : 30};
    let person1: personT = {name : 'kim', age : 10};
    let person2: personT = {name : 'Lee', age : 30};

    const handleOk1 = ():void => { // 인수 뒤에 return 값 타입 선언, void는 생략 가능
        alert("안녕하세요구르트.")
    }

    const handleOk2 = (name:string):void => { // 인수 데이터 타입 정의
        alert(`${name}님 안녕하세요.`)
    }

    const handleOk3 = (name:string):void => {
        const s:string = helloStr(name);
        alert(s);
    }

    const helloStr = (name:string):string => { // return 타입이 string인 함수
        return `${name}님 안녕하세요.`;
    }

    return (
    <div>
        <ul>
            <li>이름 : {name}, 나이 : {age}</li>
            {/* <li>
                {names.map((item:string, idx:number) =>
                    <span key={`item${idx}`}>{item}</span>)}
            </li> */}
            {/* <li>
                {ages.map((item:number) => 
                    <span key={item}>{item}</span>)}
            </li> */}
            <li>
                이름 : {nameTuple1[0]}, 나이 : {nameTuple1[1]}
            </li>
            <li>
                이름 : {nameTuple2[0]}, 나이 : {nameTuple2[1]}
            </li>
            <li>
                이름 : {person1.name}, 나이 : {person1.age}
            </li>
            <li>
                이름 : {person2.name}, 나이 : {person2.age}
            </li>
        </ul>
        <div className="grid grid-cols-3">
            <button onClick={handleOk1}
                    className="p-1 m-1 bg-amber-100 rounded-md font-bold 
                                hover:cursor-pointer hover:bg-amber-500 hover:text-white">
                함수예제1
            </button>
            <button onClick={()=>handleOk2('Kim')}
                    className="p-1 m-1 bg-amber-100 rounded-md font-bold 
                                hover:cursor-pointer hover:bg-amber-500 hover:text-white">
                함수예제2
            </button>
            <button onClick={()=>handleOk3('Lee')}
                    className="p-1 m-1 bg-amber-100 rounded-md font-bold 
                                hover:cursor-pointer hover:bg-amber-500 hover:text-white">
                함수예제3
            </button>
        </div>
    </div>
    )
}
