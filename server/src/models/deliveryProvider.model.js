import mongoose from "mongoose";

const deliveryProviderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  contactInfo: {
    phone: {
      type: String,
    },
    email: {
      type: String,
    },
  },
});

export const DeliveryProvider = mongoose.model("DeliveryProvider", deliveryProviderSchema);
