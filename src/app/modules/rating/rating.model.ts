// rating.model.ts
import { model, Schema, Document } from 'mongoose';

export interface IRating extends Document {
  productId: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
  orderId?: Schema.Types.ObjectId;
  ratings: number;
  review: string;
}

const ratingSchema = new Schema<IRating>(
  {
    productId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Mobile', // Refers to your existing Mobile model
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User', // Refers to your existing User model
    },
    orderId: {
      type: Schema.Types.ObjectId,
      required: false,
      ref: 'Order', // Refers to your existing User model
    },
    ratings: {
      type: Number,
      required: true,
      min: [0, 'Rating must be at least 0'],
      max: [5, 'Rating cannot exceed 5'],
    },
    review: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Rating = model<IRating>('Rating', ratingSchema);
