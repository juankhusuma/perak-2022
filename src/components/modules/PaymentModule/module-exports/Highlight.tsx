import { HighlightProps } from '../interface'

export const Highlight: React.FC<HighlightProps> = ({
  title,
  children,
  className,
}) => (
  <div
    className={`flex flex-col rounded-xl bg-cream-light px-4 py-1 font-poppinsBold ${className}`}
  >
    <h2 className="text-label-large text-purple-dark"> {title} </h2>
    {children}
  </div>
)
