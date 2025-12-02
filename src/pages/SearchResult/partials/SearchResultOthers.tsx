import { useQuery } from "@tanstack/react-query";
import { config } from "../../../config/config";
import axios from "axios";
import { Link } from "react-router";
import { SearchX, View } from "lucide-react";
import Skeleton from "../../../components/Skeleton";
import ReactPaginate from "react-paginate";
import { forwardRef,  useImperativeHandle, useState } from "react";
//import { div } from "framer-motion/client";

interface InfoProps {
    title: string;
    description: string;
    description_text?: string;
    slug: string;
    source_url: string;
    publish_date: string
}


interface SearchResultProps {
    search: string;
    subject: string | null;
    sh: string | null;
}

export interface SearchResultOthersRef {
    reload: (subject?: string) => void;
}


const SearchResultOthers = forwardRef<SearchResultOthersRef, SearchResultProps>(( { search, subject, sh }, ref  ) => {
   
    const [page, setPage] = useState<number>(1)

    const { data = [], isFetching, error, refetch } = useQuery({
        queryKey: ['fetchSearchOthers', page, subject, sh],
        queryFn: async () => {
            const res =  await axios.get(`${config.baseUri}/api/search/others?key=${search}&subj=${subject}&sh=${sh}&page=${page}`)
            return res.data
        },

        refetchOnWindowFocus: false
    })

    useImperativeHandle(ref, () => ({
        reload() {
            refetch()
        }
    }))

    
    if(error){
        <div>
            There is an error occured while fetching the data.
        </div>
    }
    
    const redirection = (i: any) => {
        if (i.source_url) {
            return `${i.source_url}/article/${i.slug}`
        } else {
            return `view/article/${i.slug}`
        }
    }


    
    const MySkeleton = () => {
        return (
            <div className='min-h-screen max-w-7xl md:mx-auto mx-auto'>
                <div className=''>
                    <Skeleton />
                </div>
            </div>
        );
    }

    const handlePageChange = (pageNo:number) => {
        setPage(pageNo + 1);
    }

    return (
        <>
            { !isFetching ? (
                <>
                    { data?.data.length > 0 ? (
                        <div className="grid gap-6">
                            {data?.data.map((item: InfoProps, i:number) => (
                                <div
                                    key={i}
                                    className="p-6 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition bg-white"
                                >
                                    {/* Title */}
                                    <h3 className="text-lg font-semibold text-blue-600 mb-2">
                                        <Link
                                            to={`/view/article/${item.slug}`}
                                            
                                            target="_blank"
                                            className="hover:underline"
                                        >
                                            {item.title}
                                        </Link>
                                    </h3>

                                    {/* Description */}
                                    <div className="text-sm text-gray-700 mb-3 line-clamp-3">
                                        { item.description_text }
                                    </div>

                                    { item.description && (

                                        <div className="flex gap-2 items-center">
                                            <View size={12} />
                                            <Link
                                                to={redirection(item)}
                                                target="_blank"
                                                className="text-xs text-blue-500 hover:underline"
                                            >
                                                {item.source_url}/{item.slug}
                                            </Link>
                                        </div>
                                    )}

                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex items-center gap-2 text-gray-500 italic text-sm mt-6">
                            <SearchX size={18} /> No results found
                        </div>
                    )}
                </>
            ) : (
                <MySkeleton />
            )}
            

            <div className="my-4 overflow-x-auto">
                 <ReactPaginate
                    className="flex"
                    breakLabel="..."
                    activeClassName="pagination-button active"
                    pageClassName="pagination-button"
                    nextClassName="pagination-button"
                    previousClassName="pagination-button"
                    breakClassName="pagination-button"
                    nextLabel=">"
                    onPageChange={(num) => {
                       handlePageChange(num.selected)
                    }}
                    pageRangeDisplayed={5}
                    pageCount={data?.total ? Math.ceil(data.total / 10) : 0}
                    previousLabel="<"
                />
            </div>
        </>
    )
})


export default SearchResultOthers