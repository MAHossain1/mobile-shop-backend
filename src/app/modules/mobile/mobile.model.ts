// mobile.model.ts
import { model, Schema } from 'mongoose';
import { TMobile } from './mobile.interface';

const mobileSchema = new Schema<TMobile>(
  {
    name: {
      type: String,
      required: [true, 'Mobile name is required.'],
      unique: true,
    },
    brand: {
      type: String,
      required: [true, 'Brand is required.'],
    },
    model: {
      type: String,
      required: [true, 'Model is required.'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required.'],
    },
    ratings: {
      type: Number,
      required: [true, 'Ratings are required.'],
      min: [0, 'Rating must be at least 0'],
      max: [5, 'Rating cannot exceed 5'],
    },
    imgUrl: {
      type: String,
      required: [true, 'Image URL is required.'],
    },
    features: {
      type: [String],
      required: [true, 'Features are required.'],
    },
  },
  {
    timestamps: true,
  }
);

export const Mobile = model<TMobile>('Mobile', mobileSchema);
