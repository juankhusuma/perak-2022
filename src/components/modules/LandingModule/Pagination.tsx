import { AnimateSharedLayout, motion } from 'framer-motion'
import { DotProps, PaginationProps } from './interface'

export const Pagination = ({ currentPage, pages }: PaginationProps) => {
  return (
    <AnimateSharedLayout>
      <div className="mt-7 flex justify-center">
        {pages.map((page) => (
          <Dot
            key={page}
            // onClick={() => setPage(page)}
            isSelected={page === currentPage}
          />
        ))}
      </div>
    </AnimateSharedLayout>
  )
}

const Dot = ({ isSelected }: DotProps) => {
  return (
    <div className="p-5">
      <div className="relative h-[10px] w-[10px] rounded-full bg-orange-light">
        {isSelected && (
          <motion.div
            className="absolute -top-[2px] -bottom-[2px] h-[14px] w-[14px] rounded-full bg-orange-dark"
            layoutId="highlight"
          />
        )}
      </div>
    </div>
  )
}
