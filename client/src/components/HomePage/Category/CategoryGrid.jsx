import CategoryCard from "./CategoryCard";
import bgBanner from "../../../assets/images/bgtd.png";

// Tạo 12 category với ảnh random
const categories = Array.from({ length: 12 }).map((_, i) => ({
  name: `Clothing Men ${i + 1}`,
  img: `https://picsum.photos/400?random=${i + 100}`, // random khác ProductGrid
}));

export default function CategoryGrid() {
  return (
    <section className="w-full mt-12">
      {/* Banner full width */}
      <div
        className="w-full h-24 flex items-center justify-center mb-6 bg-cover bg-center text-4xl text-[#283645] font-semibold"
        style={{ backgroundImage: `url(${bgBanner})` }}
      >
        <i>Shop by Category</i>
      </div>

      {/* Grid content với max width */}
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {categories.map((c, i) => (
            <CategoryCard key={i} name={c.name} img={c.img} />
          ))}
        </div>
      </div>
    </section>
  );
}
