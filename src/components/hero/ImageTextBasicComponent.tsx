import Image from "next/image";

interface IImageTextBasicComponent {
  img: string;
  text: string;
  width: number;
  height: number;
  gap: number;
  font?: number;
}

const ImageTextBasicComponent = ({
  img,
  text,
  height,
  width,
  gap,
  font,
}: IImageTextBasicComponent) => {
  return (
    <div className={`flex gap-${gap}`}>
      <Image src={img} alt="great-icon" width={width} height={height} className="w-auto h-auto"/>
      <p className={` font-${font}`}>{text}</p>
    </div>
  );
};

export default ImageTextBasicComponent;
