export default function CategoryCard({ name, img }) {
  return (
    <div className="flex flex-col w-full overflow-hidden bg-white rounded-md shadow-sm hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 cursor-pointer">
      {/* Image with hover zoom */}
      <div className="overflow-hidden">
        <img
          src={img}
          alt={name}
          className="w-full h-48 object-cover transition-transform duration-300 transform hover:scale-105"
        />
      </div>

      {/* Colored bar */}
      <div
        className="w-full py-3 flex justify-center transition-colors duration-300 hover:bg-green-600"
        style={{ backgroundColor: "rgba(125, 172, 140, 0.7)" }}
      >
        <span className="text-white font-semibold text-lg">{name}</span>
      </div>
    </div>
  );
}
