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
    subject: string | null;
}


const SubjectHeadingLabel = forwardRef<SubjectHeadingRef, SubjectHeadingProps>(({ search, subject }, ref) => {

    const { data, isFetching, error, refetch } = useQuery({
        queryKey: ['subjectHeadings', subject],
        queryFn: async () => {
            const res = await axios.get(`${config.baseUri}/api/search-label-subject-headings/s?key=${search}&subj=${subject}`)

            return res.data
        },

        refetchOnWindowFocus: false
    })

    useImperativeHandle(ref, () => ({
        reload() {
            refetch()
        }
    }))


    if (isFetching) {
        return (
            <SkeletonNoBorder />
        );
    }


    if (error) {
        <div>
            There is an error occured while fetching the data.
        </div>
    }



    return (
        data.length > 0 ? (
            <ul className="space-y-2 text-sm text-gray-600">
                { data?.map((subH:SubjectHeading, ix:number) => (
                    <li
                        key={ix}
                        className="pl-2 border-l-2 border-blue-200 hover:border-blue-500 hover:text-blue-700 transition"
                    >
                        <Link 
                            to={`/search?key=${search}&subj=${subject}&sh=${subH.slug}`}>
                                {subH.subject_heading} ( {subH.count} )
                        </Link>
                        {/* <Link to={`/by-sh?sh=${subH.slug}`}>{subH.subject_heading} ( {subH.count} )</Link> */}

                    </li>
                ))}
            </ul>
        ) : (
             <div className="flex items-center gap-2 text-gray-500 italic text-sm">
                <SearchX size={16} /> No subject headings found
            </div>
        ) 
    )

})

export default SubjectHeadingLabel