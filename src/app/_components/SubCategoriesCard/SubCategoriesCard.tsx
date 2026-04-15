import Link from "next/link";

type Props = {
  name: string;
  image: string;
  id: string;
  width?: number;
  height?: number;
  imageStyle?: React.CSSProperties;
  textStyle?: React.CSSProperties;
  roundnecess?: "full" | "md" | "none";
  homePage?: boolean;
};

export default function SubCategoriesCard({
  name,
  image,
  id,
  width = 96,
  height = 96,
  imageStyle,
  textStyle,
  roundnecess = "full",
}: Props) {
  return (
    <Link
      href={`/categoriesdetails/${id}`}
      className="bg-white rounded-xl shadow-sm p-6 flex flex-col items-center justify-center 
                 hover:shadow-lg hover:-translate-y-1 transition duration-300 group"
    >
      {/* image */}
      <div
        className=" overflow-hidden mb-4"
        style={{ width: width, height: height, borderRadius: roundnecess === "full" ? "50%" : roundnecess === "md" ? "0.5rem" : "none" }}
      >
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition duration-300 group-hover:scale-110"
          style={imageStyle}
        />
      </div>

      {/* title */}
      <h3
        className="text-lg font-medium text-gray-700 text-center group-hover:text-green-600 transition"
        style={textStyle}
      >
        {name}
      </h3>
    </Link>
  );
}