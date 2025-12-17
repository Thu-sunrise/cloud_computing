import mongoose from "mongoose";

const deliveryProviderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

export const DeliveryProvider = mongoose.model("DeliveryProvider", deliveryProviderSchema);
