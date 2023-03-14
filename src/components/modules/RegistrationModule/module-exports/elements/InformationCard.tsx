import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { Joystick, Question } from '@icons'
import { InformationCardProps } from '../../interface'

export const InformationCard: React.FC<InformationCardProps> = ({
  type,
  className,
  children,
}) => (
  <div
    className={`w-full rounded-md ${
      type === 'game'
        ? 'bg-cream-normal'
        : 'bg-orange-dark text-center font-poppins text-label-large text-background-light'
    } ${className} flex flex-col md:flex-row`}
  >
    <div
      className={`flex w-full items-center justify-center rounded-sm border-2 px-2 md:w-14  ${
        type === 'game'
          ? 'border-primaryContainer bg-green-dark'
          : 'm-1 border-none bg-orange-normal'
      }`}
    >
      {type === 'game' ? (
        <Joystick stroke="#C7CC70" />
      ) : (
        <ExclamationTriangleIcon className="text-orange-dark" />
      )}
    </div>
    {children}
  </div>
)
