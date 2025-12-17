import CategoryCard from "./CategoryCard";
import bgBanner from "../../../assets/images/bgtd.png";

// Tạo 12 category với ảnh random
const categories = Array.from({ length: 12 }).map((_, i) => ({
  name: `Clothing Men ${i + 1}`,
  img: `https://picsum.photos/400?random=${i + 100}`,
}));

export default function CategoryGrid() {
  return (
    <section className="w-full">
      {/* Banner full width */}
      <div
        className="w-full h-24 flex items-center justify-center
                   mt-[50px] mb-[50px]
                   bg-cover bg-center
                   text-4xl text-[#283645] font-semibold"
        style={{ backgroundImage: `url(${bgBanner})` }}
      >
        <i>Shop by Category</i>
      </div>

      {/* Grid content */}
      <div className="w-full max-w-7xl mx-auto px-4 mb-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {categories.map((c, i) => (
            <CategoryCard key={i} name={c.name} img={c.img} />
          ))}
        </div>
      </div>
    </section>
  );
}
