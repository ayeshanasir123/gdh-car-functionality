import Image from "next/image";
import SectionHeading from "./section-heading";

interface FeaturedSectionProps {
  title: string;
  images: string[];
}

const FeaturedSection: React.FC<FeaturedSectionProps> = ({ title, images }) => {
  const [image1, image2, image3, image4, image5, image6] = images;
  return (
    <section className="mx-auto min-h-[90vh] max-w-[1400px] px-4 py-10 lg:px-10 2xl:px-0">
      <SectionHeading title={title} />
      <div className="grid grid-cols-1 gap-x-0 gap-y-3  sm:grid-cols-2 lg:grid-cols-12 lg:gap-x-5 lg:gap-y-5">
        <div className="col-span-3 grid grid-cols-1 gap-x-3 gap-y-3 sm:grid-cols-2 lg:grid-cols-1 lg:gap-x-5 lg:gap-y-5">
          <div className="h-52 w-full lg:h-auto">
            <Image
              src={image1}
              alt="Destination image"
              width={1000}
              height={1000}
              className="h-full w-full rounded-lg object-cover object-center"
            />
          </div>
          <div className="h-52 w-full lg:h-auto">
            <Image
              src={image2}
              alt="Destination image"
              width={1000}
              height={1000}
              className="h-full w-full rounded-lg object-cover object-center"
            />
          </div>
        </div>
        <div className="col-span-9 grid grid-cols-1 gap-x-3 gap-y-3 sm:grid-cols-2 lg:gap-x-5 lg:gap-y-5 ">
          <div className="h-52 w-full lg:h-auto">
            <Image
              src={image3}
              alt="Destination image"
              width={1000}
              height={1000}
              className="h-full w-full rounded-lg object-cover object-center"
            />
          </div>
          <div className="grid grid-cols-1 gap-y-3 lg:gap-y-5">
            <div className="h-52 w-full lg:h-auto">
              <Image
                src={image4}
                alt="Destination image"
                width={1000}
                height={1000}
                className="h-full w-full rounded-lg object-cover object-center"
              />
            </div>
            {image6 ? (
              <div className="grid grid-cols-1 gap-x-3 gap-y-3 sm:hidden lg:grid lg:grid-cols-2 lg:gap-x-5 lg:gap-y-5">
                <div className="h-52 w-full">
                  <Image
                    src={image5}
                    alt="Destination image"
                    width={1000}
                    height={1000}
                    className="h-full w-full rounded-lg object-cover object-center"
                  />
                </div>
                <div className="h-52 w-full">
                  <Image
                    src={image6}
                    alt="Destination image"
                    width={1000}
                    height={1000}
                    className="h-full w-full rounded-lg object-cover object-center"
                  />
                </div>
              </div>
            ) : (
              <div className=" hidden h-52 w-full lg:flex">
                <Image
                  src={image5}
                  alt="Destination image"
                  width={1000}
                  height={1000}
                  className="h-full w-full rounded-lg object-cover object-center"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
