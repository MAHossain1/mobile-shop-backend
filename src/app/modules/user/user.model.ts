/* eslint-disable @typescript-eslint/no-this-alias */
import bcrypt from 'bcrypt';
import { model, Schema } from 'mongoose';
import config from '../../config';
import { Roles } from './user.constant';
import { TUser, UserModel } from './user.interface';

const userSchema = new Schema<TUser, UserModel>(
  {
    name: {
      type: String,
      required: [true, 'User name is required.'],
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'email is required.'],
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: 'user',
      enum: {
        values: Roles,
        message: `{VALUE} is not a valid role.`,
      },
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  const user = this;

  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcyrpt_salt_rounds)
  );

  next();
});

userSchema.set('toJSON', {
  transform: function (doc, ret) {
    delete ret.password;
    return ret;
  },
});

// use toObject to hide the password field
userSchema.set('toObject', {
  transform: function (doc, ret) {
    delete ret.password;
    return ret;
  },
});

userSchema.statics.isUserExistsByEmail = async function (email: string) {
  return await User.findOne({ email: email });
};

userSchema.statics.isPasswordMatch = async function (
  plainTextPassword,
  hashedPassword
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

export const User = model<TUser, UserModel>('User', userSchema);
