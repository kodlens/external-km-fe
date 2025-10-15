import { useParams } from 'react-router'

const SubjectHeadingIndex = () => {
    const { subjectHeading } = useParams< { subjectHeading:string } >()
    
  return (
    <div className='mt-20 p-6 bg-red-200 mx-auto max-w-7xl'>
        <div className=''>
                {subjectHeading}
        </div>
    </div>
  )
}

export default SubjectHeadingIndex