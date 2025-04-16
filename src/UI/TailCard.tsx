interface TailCardProps {
    title : string;
    subtitle : string;
    imgurl : string;
    kws : string;
}
export default function TailCard({title, subtitle, imgurl, kws}:TailCardProps) {
    return (
        <div className="w-full
                    max-w-sm bg-white border border-gray-200 rounded-lg
                        shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <div className="w-full h-48">
                <img className="rounded-t-lg w-full h-full object-cover" src={imgurl} alt={title}/>
            </div>
            <div className="p-5 flex flex-col justify-between">
                <h5 className="mb-2 text-xl font-bold tracking-tight truncate text-gray-700 dark:text-white">
                    {title}
                </h5>
                <p className="mb-10 text-md font-bold text-gray-600 dark:text-gray-400">
                    {subtitle}
                </p>
                <p>{kws && kws.split(',').map((item:string) =>
                            <span key={item} className=" bg-gray-100 font-bold rounded-xl text-sm text-gray-500
                                            w-fit px-3 py-0.5 m-1 inline-flex justify-center items-center">
                                {item}
                            </span>
                            )}
                </p>
            </div>
        </div>  
    )
}
