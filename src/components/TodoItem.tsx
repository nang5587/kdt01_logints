import TailButton from "../UI/TailButton"


export default function TodoItem({id, text, completed, handleDelete, handleToggle}) {

  return (
    <div className="w-full flex items-center justify-between ps-4 border border-gray-200 rounded-2xl bg-white hover:bg-gray-50 mb-3">
        <div className="w-4/5 flex justify-start items-center">
            <div onClick={()=> handleToggle(id)} className="hover:cursor-pointer">
                {completed == "O" ? "✅" : "⬜" } {text}</div>
            </div>
        <div className="w-1/5 p-3 inline-flex justify-end items-center">
            <p className="w-1/3">
                <TailButton
                caption="삭제"
                color="lblue"
                onClick={()=>handleDelete(id)}
                />
            </p>
        </div>
    </div>
  )
}
