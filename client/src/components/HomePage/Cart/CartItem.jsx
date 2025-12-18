import React from "react";
import { Trash2 } from "lucide-react";
import PropTypes from "prop-types";

export default function CartItem({ item, onToggle, onRemove }) {
  return (
    <div className="bg-[#E1EBDA] rounded-lg p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
      {/* Image */}
      <img
        src={item.image}
        alt={item.name}
        className="w-full sm:w-[136px] h-[136px] rounded-xl object-cover flex-shrink-0"
      />

      {/* Details */}
      <div className="flex-1 w-full">
        <h3 className="font-['Roboto'] text-lg text-black mb-1 font-medium">{item.name}</h3>
        <p className="font-['Roboto'] text-sm sm:text-base text-[rgba(78,78,78,0.73)] mb-3 line-clamp-2">
          {item.description}
        </p>

        <button
          onClick={() => onRemove(item.id)}
          className="flex items-center gap-2 font-['Roboto'] text-sm text-[rgba(78,78,78,0.7)] hover:text-red-600 transition-colors group"
        >
          <Trash2 className="w-4 h-4 group-hover:stroke-red-600" />
          Remove
        </button>
      </div>

      {/* Price & Checkbox */}
      <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-4 mt-2 sm:mt-0">
        <div className="text-left sm:text-right flex items-center gap-2">
          <span className="font-['Roboto'] text-xl sm:text-2xl font-bold text-black">
            {item.price} Points
          </span>
          <button
            onClick={() => onToggle(item.id)}
            className="w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0 focus:outline-none"
            aria-label={item.checked ? "Unselect item" : "Select item"}
          >
            {item.checked ? (
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/e4f0c985e8739ccd83ab7b5a8d673b02991bc895?width=80"
                alt="Checked"
                className="w-full h-full"
              />
            ) : (
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/bdbc7f5265ba0318da8bc9285960c2ce97607c75?width=80"
                alt="Unchecked"
                className="w-full h-full"
              />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
  }).isRequired,
  onToggle: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};
