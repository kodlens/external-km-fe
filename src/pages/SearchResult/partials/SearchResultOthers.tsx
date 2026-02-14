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

export interface SearchResultOthersRef {
    reload: (subject?: string) => void
}

const SearchResultOthers = forwardRef<SearchResultOthersRef, SearchResultProps>(
    ({ search, subject, sh }, ref) => {
        const [page, setPage] = useState<number>(1)

        useEffect(() => {
            setPage(1)
        }, [search, subject, sh])

        const { data = [], isFetching, error, refetch } = useQuery({
            queryKey: ["fetchSearchOthers", search, page, subject, sh],
            queryFn: async () => {
                const res = await axios.get(
                    `${config.baseUri}/api/search/others?key=${search}&subj=${subject}&sh=${sh}&page=${page}`
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
            return (
                <div className="rounded-xl bg-red-50 p-4 text-sm text-red-700">
                    Failed to load additional results.
                </div>
            )
        }

        const handlePageChange = (pageNo: number) => {
            setPage(pageNo + 1)
        }

        return (
            <>
                {!isFetching ? (
                    Array.isArray(data?.data) && data?.data.length > 0 ? (
                        <>
                            <SearchResultCard data={data?.data} />

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
                            No additional results found.
                        </div>
                    )
                ) : (
                    <Skeleton />
                )}
            </>
        )
    }
)

export default SearchResultOthers
