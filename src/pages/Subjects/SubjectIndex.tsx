import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router'
import { config } from '../../config/config';
import axios from 'axios';
//import { article } from 'framer-motion/client';
import type { Article } from '../../types/article';
import { Link } from 'react-router';
import Skeleton from '../../components/Skeleton';
import SubjectLabel from '../SearchResult/partials/SubjectLabel';
import SubjectHeadingLabel from '../SearchResult/partials/SubjectHeadingLabel';
import ReactPaginate from 'react-paginate';
import { useState } from 'react';
import { Search } from 'lucide-react';

const SubjectIndex = () => {

    const { subject, search } = useParams<{ subject: string, search: string }>();
    const [page, setPage] = useState<number>(1)


    const { data, isFetching, error } = useQuery({
        refetchOnWindowFocus: false,
        queryKey: ['article', page],
        queryFn: async () => {
            const res = await axios.get(`${config.baseUri}/api/subject/articles-by-subject?subject=${subject}&search=${search}`)

            return res.data
        }
    })

    const MySkeleton = () => {
        return (
            <div className='w-7xl md:mx-auto mx-2'>
                <Skeleton />
            </div>
        )
    }

    if (error) {
        return (
            <div className='min-h-screen'>
                Error!!
            </div>
        )
    }

    const redirection = (i: any) => {
        if (i.source_url) {
            return `${i.source_url}/article/${i.slug}`
        } else {
            return `view/article/${i.slug}`
        }
    }


    return (
        <div className='mt-20 p-6 flex max-w-7xl mx-auto min-h-screen'>

            <div className="flex flex-col lg:flex-row gap-6">

                <aside className="lg:w-64 w-full bg-white shadow rounded-xl border border-gray-100 p-6 space-y-6">
                    {/* Topics */}
                    <div>
                        <h2 className="font-semibold text-gray-800 mb-4">📂 Subjects</h2>
                        <SubjectLabel search={search} />
                    </div>

                    {/* Subtopics */}
                    <div>
                        <h2 className="font-semibold text-gray-800 mb-4">📑 Subject Headings</h2>
                        <SubjectHeadingLabel search={search} />
                    </div>
                </aside>

                <main className="flex flex-col gap-6 flex-1">

                    <div className="flex flex-col sm:flex-row rounded-3xl overflow-hidden border border-gray-200 shadow-md bg-white">
                        <input
                            type="text"
                            placeholder="Search collections, innovations, technology, news & events, topics, trends..."
                            className="flex-1 px-4 py-3 md:px-6 md:py-4 text-gray-700 outline-none placeholder:text-gray-400"
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {

                                }
                            }}
                            autoComplete="off"
                        />
                        <button
                            type="button"
                            onClick={() => {
                                
                            }}
                            className="flex items-center justify-center gap-2 bg-danger px-6 py-3 md:py-4 text-white font-medium transition-all hover:bg-red-500 active:bg-red-600"
                        >
                            <Search size={18} />
                            <span>Search</span>
                        </button>
                    </div>

                    <div className='flex-1'>
                        <h2 className="mb-4 text-xl font-bold text-gray-800">
                            📚 Digital Collections
                        </h2>

                        <div className='my-4'>
                            <div>
                                Subject: {data ? data?.data[0]?.subject : ''}
                            </div>

                            <div className=''>
                                Search: {search}
                            </div>
                        </div>


                        {!isFetching ? (
                            <div className='grid gap-6'>
                                {data?.data.map((item: Article, i: number) => (
                                    <div
                                        key={i}
                                        className="p-6 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition bg-white">
                                        {/* Title */}
                                        <h3 className="text-lg font-semibold text-blue-600 mb-2">
                                            <Link
                                                to={redirection(item)}
                                                target="_blank"
                                                className="hover:underline"
                                            >
                                                {item.title}
                                            </Link>
                                        </h3>

                                        {/* Description */}
                                        <div
                                            className="text-sm text-gray-700 mb-3 line-clamp-3"
                                            dangerouslySetInnerHTML={{ __html: item.description }}
                                        />

                                        {/* Source */}
                                        {item.source_url && (
                                            <Link
                                                to={item.source_url}
                                                target="_blank"
                                                className="text-xs text-blue-500 hover:underline"
                                            >
                                                {item.source_url}
                                            </Link>
                                        )}
                                    </div>
                                ))}
                            </div>

                        ) : (
                            <MySkeleton />
                        )}

                        <div className="my-4">
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
                                    setPage(num.selected);
                                }}
                                pageRangeDisplayed={5}
                                pageCount={data ? data?.total : 0}
                                previousLabel="<"
                            />
                        </div>

                    </div>

                </main>
            </div>
        </div>
    )
}

export default SubjectIndex