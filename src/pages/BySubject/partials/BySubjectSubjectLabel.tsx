import { useQuery } from '@tanstack/react-query'
import { config } from '../../../config/config'
import type { Subject } from '../../../types/subject'
import { Link } from 'react-router'
import { SearchX } from 'lucide-react'
import axios from 'axios'
import SkeletonNoBorder from '../../../components/SkeletonNoBorder'
import { forwardRef, useImperativeHandle } from 'react'


interface Props {
    search: string | null | undefined;
    subject: string |  null;
}

export interface BySubjectSubjectLabelRef {
    reload : () => void

}
const BySubjectSubjectLabel = forwardRef<BySubjectSubjectLabelRef, Props>(( { search, subject }, ref ) => {

    const { data, isFetching, error, refetch } = useQuery({
        queryKey: ['subjects', subject],
        queryFn: async () => {
            console.log('usequery: ', search);

            const res =  await axios.get(`${config.baseUri}/api/by-subject/search-label-subjects?key=${search}&subj=${subject}`)
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
                    to={`/by-subject?subj=${subject.slug}&key=${search}`}
                    className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition"
                >
                    {subject.subject} ({subject.count})
                </Link>
            ))
        ) : (
            <div className="flex items-center gap-2 text-gray-500 italic text-sm">
                <SearchX size={16} /> No subjects found
            </div>
        )}
    </div>
  )
})

export default BySubjectSubjectLabel