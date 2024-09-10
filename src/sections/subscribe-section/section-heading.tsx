interface SectionHeadingProps {
    title: string
}

const SectionHeading: React.FC<SectionHeadingProps> = ({title}) => {
  return (
    <h2 className="lg:text-[32px] text-[24px] font-[700] text-lightBlue">
        {title}
    </h2>
  )
}

export default SectionHeading