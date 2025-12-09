import { useQuery } from '@tanstack/react-query'
import { config } from '../../../config/config'
import type { Subject } from '../../../types/subject'
import { Link } from 'react-router'
import { SearchX } from 'lucide-react'
import axios from 'axios'
import SkeletonNoBorder from '../../../components/SkeletonNoBorder'
import { forwardRef, useImperativeHandle } from 'react'

interface SubjectLabelProps {
    search: string | null | undefined;

}

export interface SubjectLabelRef {
    reload : (subject?: string) => void
}


const SubjectLabel = forwardRef<SubjectLabelRef, SubjectLabelProps>(( { search }, ref ) => {
     
    //const searchRef = useRef<SearchResultRef>(null)

    const { data, isFetching, error, refetch } = useQuery({
        queryKey: ['subjects'],
        queryFn: async () => {
            const res =  await axios.get(`${config.baseUri}/api/subject-labels/search?key=${search}&subj=all`)
            //const res =  await axios.get(`${config.baseUri}/api/search?key=${search}&subj=${subject}`)
            return res.data
        },

        refetchOnWindowFocus: false
    })

    useImperativeHandle(ref, ()=> ({
        reload() {
            refetch()
        }
    }))

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
                        to={`/search?key=${search}&subj=${subject.slug}&sh=all`}
                        className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition hover:cursor-pointer"
                    >
                        {subject.subject} ({subject.count})
                    </Link>
                ))
            ) : (
                <div className="flex items-center gap-2 text-gray-500 italic text-sm">
                    <SearchX size={16} /> No class found
                </div>
            )}
        </div>
    )
})

export default SubjectLabel