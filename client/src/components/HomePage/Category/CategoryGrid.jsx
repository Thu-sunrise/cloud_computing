import CategoryCard from "./CategoryCard";
import bgBanner from "../../../assets/images/bgtd.png";

const categories = [
  {
    key: "Mobile Devices",
    displayName: "Mobile Devices",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80",
  },
  {
    key: "Computers",
    displayName: "Computers",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80",
  },
  {
    key: "Cameras",
    displayName: "Cameras",
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=400&q=80",
  },

  {
    key: "Home Furniture",
    displayName: "Home Furniture",
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=400&q=80",
  },
  {
    key: "Home Appliances",
    displayName: "Home Appliances",
    image:
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=400&q=80",
  },
  {
    key: "Books",
    displayName: "Books",
    image:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80",
  },
  {
    key: "Clothing",
    displayName: "Clothing",
    image:
      "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=400&q=80",
  },
  {
    key: "Footwear",
    displayName: "Footwear",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80",
  },
  {
    key: "Sports Equipment",
    displayName: "Sports Equipment",
    image:
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=400&q=80",
  },
  {
    key: "Toys and Games",
    displayName: "Toys & Games",
    image:
      "https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&w=400&q=80",
  },
  {
    key: "Vehicles",
    displayName: "Vehicles",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=400&q=80",
  },
  {
    key: "Collectibles",
    displayName: "Collectibles",
    image:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=400&q=80",
  },
];

export default function CategoryGrid() {
  return (
    <section className="w-full">
      {/* Banner */}
      <div
        className="w-full h-24 flex items-center justify-center
                   mt-[50px] mb-[50px]
                   bg-cover bg-center
                   text-4xl text-[#283645] font-semibold"
        style={{ backgroundImage: `url(${bgBanner})` }}
      >
        <i>Shop by Category</i>
      </div>

      {/* Grid */}
      <div className="w-full max-w-8xl mx-auto px-4 mb-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {categories.map((c) => (
            <CategoryCard key={c.key} name={c.displayName} category={c.key} img={c.image} />
          ))}
        </div>
      </div>
    </section>
  );
}
