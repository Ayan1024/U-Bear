import mongoose from "mongoose";

const blacklistTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },
    blacklistedAt: {
        type: Date,
        default: Date.now,
        expires: (24*3600), //token stay for 7 days in seconds
    }
});

const blacklistToken = mongoose.model('BlacklistToken', blacklistTokenSchema);
export default  blacklistToken