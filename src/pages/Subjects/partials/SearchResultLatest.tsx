import { useQuery } from "@tanstack/react-query"
import { config } from "../../../config/config"
import axios from "axios"
import Skeleton from "../../../components/Skeleton"
import ReactPaginate from "react-paginate"
import { forwardRef, useEffect, useImperativeHandle, useState } from "react"
import SearchResultCard from "../../../components/SearchResultCard"

interface SearchResultProps {
    search: string
    subject: string | null
    sh: string | null
}

export interface SearchResultRefLatest {
    reload: (subject?: string) => void
}

const SearchResult = forwardRef<SearchResultRefLatest, SearchResultProps>(({ search, subject, sh }, ref) => {
    const [page, setPage] = useState<number>(1)

    useEffect(() => {
        setPage(1)
    }, [search, subject, sh])

    const { data = [], isFetching, error, refetch } = useQuery({
        queryKey: ["subjectFetchSearchLatest", search, page, subject, sh],
        queryFn: async () => {
            const res = await axios.get(
                `${config.baseUri}/api/subject/search-latest?key=${search}&subj=${subject}&sh=${sh}&page=${page}`
            )
            return res.data
        },
        refetchOnWindowFocus: false,
    })

    useImperativeHandle(ref, () => ({
        reload() {
            refetch()
        },
    }))

    if (error) {
        return <div className="rounded-xl bg-red-50 p-4 text-sm text-red-700">Failed to load latest results.</div>
    }

    if (isFetching) {
        return <Skeleton />
    }

    const handlePageChange = (pageNo: number) => {
        setPage(pageNo + 1)
    }

    return data?.data.length > 0 ? (
        <>
            <div className="my-4 flex items-center">
                <div className="h-px flex-grow bg-slate-200"></div>
                <span className="mx-4 text-xs font-semibold uppercase tracking-wide text-slate-500">Latest</span>
                <div className="h-px flex-grow bg-slate-200"></div>
            </div>

            <SearchResultCard data={data.data} />

            <div className="my-4 overflow-x-auto">
                <ReactPaginate
                    className="flex"
                    pageClassName="pagination-button"
                    pageLinkClassName="pagination-link"
                    activeClassName="active"
                    activeLinkClassName="active-link"
                    previousClassName="pagination-button"
                    nextClassName="pagination-button"
                    breakClassName="pagination-button"
                    breakLabel="..."
                    nextLabel=">"
                    previousLabel="<"
                    pageRangeDisplayed={5}
                    pageCount={data?.total ? Math.ceil(data.total / 10) : 0}
                    forcePage={page - 1}
                    onPageChange={(e) => handlePageChange(e.selected)}
                />
            </div>
        </>
    ) : (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white px-4 py-6 text-center text-sm text-slate-500">
            No latest results found.
        </div>
    )
})

export default SearchResult
