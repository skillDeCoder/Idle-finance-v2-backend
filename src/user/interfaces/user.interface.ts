export interface IUser {
    id?: number;
    username?: string;
    email: string;
    password: string;
    otp?: string;
    otpExpiresAt?: Date;
    otpVerified?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}