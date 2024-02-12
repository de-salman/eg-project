import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide a username"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please provide a email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    validate: {
      validator: function (value) {
        const passwordRegex =
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        return passwordRegex.test(value);
      },
      message: "Password must meet the specified requirements",
    },
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
