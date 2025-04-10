
export default function TailSelect({id, refSel, items, handleChange}) {

  return (
      <select id={id} ref={refSel} onChange={handleChange}
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 
                focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                 dark:focus:ring-blue-500 dark:focus:border-blue-500
                 my-5">
        {items.map(item => <option key={item} value={item}>{item}</option>)}
      </select>
  )
}
