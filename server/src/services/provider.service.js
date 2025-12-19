import { Provider } from "../models/provider.model.js";

export const ProviderService = {
  async calculateShippingFee(subtotal) {
    let shippingFee = 0;
    let providerName;

    if (subtotal >= 1000) {
      shippingFee = 0;
      providerName = "PrimeDelivery";
    } else if (subtotal >= 500) {
      shippingFee = 20;
    } else if (subtotal >= 200) {
      shippingFee = 30;
    } else {
      shippingFee = 50;
    }

    if (!providerName) {
      if (subtotal < 500) {
        providerName = ["FastExpress", "SwiftCourier"][Math.floor(Math.random() * 2)];
      } else {
        const providers = await Provider.find().lean();
        providerName = providers[Math.floor(Math.random() * providers.length)].name;
      }
    }

    const provider = await Provider.findOne({ name: providerName }).lean();
    return {
      providerId: provider._id,
      shippingFee,
    };
  },
};
