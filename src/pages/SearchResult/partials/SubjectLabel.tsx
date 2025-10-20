import { useQuery } from '@tanstack/react-query'
import { config } from '../../../config/config'
import type { Subject } from '../../../types/subject'
import { Link } from 'react-router'
import { SearchX } from 'lucide-react'
import axios from 'axios'
import SkeletonNoBorder from '../../../components/SkeletonNoBorder'

const SubjectLabel = ( { search } : { search?:string | null } ) => {

    const { data, isFetching, error } = useQuery({
        queryKey: ['subjects'],
        queryFn: async () => {
            const res =  await axios.get(`${config.baseUri}/api/search-label-subjects/s?key=${search}`)

            return res.data
        },

        refetchOnWindowFocus: false
    })

    if (isFetching) {
        return (
            <SkeletonNoBorder />
        );
    }
    

    if(error){
        <div>
            There is an error occured while fetching the data.
        </div>
    }

  return (
    <div className="flex flex-col gap-3">
        {data.length > 0 ? (
            data.map((subject:Subject, i:number) => (
                <Link
                    key={i}
                    target='_blank'
                    to={`/subjects/${subject.slug}/${search}`}
                    className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition"
                >
                    {subject.subject} ({subject.count})
                </Link>
            ))
        ) : (
            <div className="flex items-center gap-2 text-gray-500 italic text-sm">
                <SearchX size={16} /> No topics found
            </div>
        )}
    </div>
  )
}

export default SubjectLabel