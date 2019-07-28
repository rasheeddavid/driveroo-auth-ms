import * as mongoose from "mongoose";
import * as bcrypt from "bcryptjs";
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        mobile: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        confirmed: {
            type: Boolean,
            required: true,
            default: false
        },
        forgotPasswordLock: {
            type: Boolean,
            required: true,
            default: false
        },
        avatar: {
            type: String
        }
    },
    { timestamps: true }
);

/**
 *   @BeforeInsert()
 */

const hashedPassword = async (password: string) => {
    return await bcrypt.hash(password, 10);
};

UserSchema.pre("save", async function() {
    if (this.isNew) {
        const newpassword = await hashedPassword((this as any).password);
        (this as any).password = newpassword;
    }
});

export const User = mongoose.model("users", UserSchema);

export default UserSchema;