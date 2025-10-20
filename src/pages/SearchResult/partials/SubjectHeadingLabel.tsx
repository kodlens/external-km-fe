import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { config } from "../../../config/config"
import type { SubjectHeading } from "../../../types/subjectHeading"
import { Link } from "react-router"
import SkeletonNoBorder from "../../../components/SkeletonNoBorder"



const SubjectHeadingLabel = ( { search } : { search?:string | null } ) => {

    const { data, isFetching, error } = useQuery({
        queryKey: ['subjectHeadings'],
        queryFn: async () => {
            const res =  await axios.get(`${config.baseUri}/api/search-label-subject-headings/s?key=${search}`)

            return res.data
        },

        refetchOnWindowFocus: false
    })

    
    if (isFetching) {
        return (
            <SkeletonNoBorder/>
        );
    }
    

    if(error){
        <div>
            There is an error occured while fetching the data.
        </div>
    }
    


  return (
    <ul className="space-y-2 text-sm text-gray-600">
        { data?.map((subH:SubjectHeading, ix:number) => (
            <li
                key={ix}
                className="pl-2 border-l-2 border-blue-200 hover:border-blue-500 hover:text-blue-700 transition"
            >
                <Link to={`/subject-headings/${subH.slug}`}>{subH.subject_heading} ( {subH.count} )</Link>

            </li>
        ))}
    </ul>
  )
}

export default SubjectHeadingLabel