import axios from 'axios'
import { config } from '../config/config'
import { useQuery } from '@tanstack/react-query'
import { ChevronRight } from 'lucide-react'
import type { Subject } from '../types/subject'
import { motion } from 'framer-motion'
import { Link } from 'react-router'

const Subjects = () => {
  const {
    data: subjects,
    error,
    isFetching,
  } = useQuery({
    queryKey: ['subjects'],
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const res = await axios.get<Subject[]>(
        `${config.baseUri}/api/load-subjects`
      )
      return res.data
    },
  })

  if (isFetching) {
    return (
      <div className="grid gap-6 p-4 sm:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="animate-pulse rounded-2xl border border-gray-200 shadow-md p-6"
          >
            <div className="h-6 w-2/3 bg-gray-300 rounded mb-4" />
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-full" />
              <div className="h-4 bg-gray-200 rounded w-5/6" />
              <div className="h-4 bg-gray-200 rounded w-4/6" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <span className="text-red-500 font-medium">
          ⚠️ Failed to load subjects
        </span>
      </div>
    )
  }

  return (
    <motion.div
      className="grid gap-8 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.15 },
        },
      }}
    >
      {subjects?.map((item) => (
        // card
        <motion.div
          key={item.id}
          className="rounded-2xl border border-gray-100 shadow-md bg-white overflow-hidden h-[400px] relative"
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          whileHover={{ scale: 1.03, boxShadow: '0px 8px 24px rgba(0,0,0,0.15)' }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-primary/80 p-4">
            <h3 className="text-lg font-bold text-white tracking-wide">
              <Link to={`/subject/search?key=&subj=${item.slug}&sh=`}>{item.subject}</Link>
            </h3>
          </div>

          {/* Body */}
          <div className="p-2">
            <ul className="">
              {item.subject_headings?.slice(0, 5).map((sh) => (
                <motion.li
                  key={sh.id}
                  className="flex text-sm items-start gap-2 group hover:bg-gray-200 rounded-md p-2 transition"
                >
                  <Link to={`/subject/search?key=&subj=${item.slug}&sh=${sh.slug}`} className='flex gap-2'>
                    <ChevronRight
                      size={18}
                      className="text-primary mt-[2px] group-hover:translate-x-1 transition"
                    />
                    <span className="flex-1 text-gray-700">
                      {sh.subject_heading}
                    </span>
                  </Link>
                </motion.li>
              ))}
            </ul>

            { item.subject_headings.length > 5 ? (
              <div>
                <button className='text-blue-900 hover:text-blue-700 hover:cursor-pointer px-4 py-4'>See more...</button>
              </div>
            ) : null }
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}

export default Subjects
