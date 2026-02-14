import { useQuery } from "@tanstack/react-query"
import { config } from "../../../config/config"
import type { Subject } from "../../../types/subject"
import { Link } from "react-router"
import { SearchX } from "lucide-react"
import axios from "axios"
import SkeletonNoBorder from "../../../components/SkeletonNoBorder"
import { forwardRef, useImperativeHandle } from "react"

interface SubjectLabelProps {
    search: string | null | undefined
}

export interface SubjectLabelRef {
    reload: (subject?: string) => void
}

const SubjectLabel = forwardRef<SubjectLabelRef, SubjectLabelProps>(({ search }, ref) => {
    const { data, isFetching, error, refetch } = useQuery({
        queryKey: ["subjects", search],
        queryFn: async () => {
            const res = await axios.get(`${config.baseUri}/api/subject-labels/search?key=${search}&subj=all`)
            return res.data
        },
        refetchOnWindowFocus: false,
    })

    useImperativeHandle(ref, () => ({
        reload() {
            refetch()
        },
    }))

    if (isFetching) {
        return <SkeletonNoBorder />
    }

    if (error) {
        return <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700">Failed to load categories.</div>
    }

    return (
        <div className="flex flex-col gap-2">
            {Array.isArray(data) && data.length > 0 ? (
                data.map((subject: Subject, i: number) => (
                    <Link
                        key={i}
                        to={`/search?key=${search}&subj=${subject.slug}&sh=`}
                        className="rounded-lg px-2 py-1.5 text-sm text-sky-700 transition hover:bg-sky-50 hover:text-sky-800"
                    >
                        {subject.subject} ({subject.count})
                    </Link>
                ))
            ) : (
                <div className="flex items-center gap-2 text-sm italic text-slate-500">
                    <SearchX size={16} /> No category found
                </div>
            )}
        </div>
    )
})

export default SubjectLabel
