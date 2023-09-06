import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';


export const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    age: Number
});

UserSchema.pre('save', async function (next) {
    const user = this as any;

    if (!user.isModified('password')) {
        return next();
    }

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(user.password, salt);

    user.password = hashedPassword;
    next();
});