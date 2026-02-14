import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { config } from "../../../config/config"
import type { SubjectHeading } from "../../../types/subjectHeading"
import { Link } from "react-router"
import SkeletonNoBorder from "../../../components/SkeletonNoBorder"
import { forwardRef, useImperativeHandle } from "react"
import { SearchX } from "lucide-react"

export interface SubjectHeadingRef {
    reload: () => void
}

interface SubjectHeadingProps {
    search: string | null | undefined
    subject?: string
}

const SubjectHeadingLabel = forwardRef<SubjectHeadingRef, SubjectHeadingProps>(
    ({ search, subject }, ref) => {
        const { data, isFetching, error, refetch } = useQuery({
            queryKey: ["subjectHeadings", search, subject],
            queryFn: async () => {
                const res = await axios.get(
                    `${config.baseUri}/api/subject-headings/search?key=${search}&subj=${subject}`
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

        if (isFetching) {
            return <SkeletonNoBorder />
        }

        if (error) {
            return (
                <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
                    Failed to load topics.
                </div>
            )
        }

        return data.length > 0 ? (
            <ul className="space-y-2 text-sm text-slate-600">
                {data?.map((subH: SubjectHeading, ix: number) => (
                    <li
                        key={ix}
                        className="rounded-r-md border-l-2 border-sky-200 pl-2 transition hover:border-sky-500"
                    >
                        <Link
                            className="transition hover:text-sky-700"
                            to={`/search?key=${search}&subj=${subject}&sh=${subH.subject_heading_slug}`}
                        >
                            {subH.subject_heading} ({subH.count})
                        </Link>
                    </li>
                ))}
            </ul>
        ) : (
            <div className="flex items-center gap-2 text-sm italic text-slate-500">
                <SearchX size={16} /> No topics found.
            </div>
        )
    }
)

export default SubjectHeadingLabel
