import PropTypes from "prop-types";

export default function ProductCard({ product }) {
  return (
    <div
      className={`rounded-[20px] w-full p-8 flex gap-6 hover:shadow-lg transition-shadow md:flex-row ${
        product.state === "up" ? "bg-[#E1EBDA]" : "bg-gray-500"
      }`}
    >
      <div className="flex-shrink-0">
        <img
          src={product.image}
          alt={product.title}
          className="w-[168px] h-[194px] object-cover rounded-lg"
        />
      </div>

      <div className="flex-1">
        <h3 className="font-montserrat text-4xl font-medium text-black mb-2">{product.title}</h3>
        <p className="font-montserrat text-xl font-bold text-black mb-4">{product.points} points</p>
        {product.state === "up" && (
        <div className="space-y-1 font-roboto text-xl text-black">
          <p>
            <span className="font-medium">Shipping via:</span>{" "}
            <span className="font-light">{product.shippingVia}</span>
          </p>
          <p>
            <span className="font-medium">Tracking ID:</span>{" "}
            <span className="font-light">{product.trackingId}</span>
          </p>
          <p>
            <span className="font-medium">Status:</span>{" "}
            <span className="font-light">{product.status}</span>
          </p>
          <p>
            <span className="font-medium">ETA:</span>{" "}
            <span className="font-light">{product.eta}</span>
          </p>
          <p>
            <span className="font-medium">Last update:</span>{" "}
            <span className="font-light">{product.lastUpdate}</span>
          </p>
        </div>)}
        {product.state !== "up" && (
          <p className="font-roboto text-xl text-black">This item is {product.state}.</p>
        )}
      </div>

    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    points: PropTypes.number.isRequired,
    shippingVia: PropTypes.string.isRequired,
    trackingId: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    eta: PropTypes.string.isRequired,
    lastUpdate: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired
  })
}