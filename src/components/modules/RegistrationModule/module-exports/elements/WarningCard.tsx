import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { Joystick, Question } from '@icons'
import { InformationCardProps } from '../../interface'

export const WarningCard: React.FC<InformationCardProps> = ({
  type,
  className,
  children,
}) => (
  <div
    className={`w-full rounded-md ${
      type === 'game'
        ? 'bg-cream-normal'
        : 'bg-orange-dark text-center font-poppins text-label-large text-background-light'
    } ${className} flex`}
  >
    <div
      className={`flex w-fit items-center justify-center rounded-sm border-2 px-2 md:w-14  ${
        type === 'game'
          ? 'border-primaryContainer bg-green-dark'
          : 'm-1 border-none bg-orange-normal'
      }`}
    >
      <ExclamationTriangleIcon className="h-10 w-10 text-orange-dark" />
    </div>
    {children}
  </div>
)
