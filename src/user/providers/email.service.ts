import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
    private transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASSWORD,
            },
        });
    }

    async sendOtpEmail(to: string, otp: string) {
        await this.transporter.sendMail({
            from: `Idle-Finance <${process.env.MAIL_USER}>`,
            to,
            subject: 'Your OTP Code',
            html: `
                <p>Hello,</p>
                <p>Your OTP code is:</p>
                <h2>${otp}</h2>
                <p>This code will expire in 10 minutes.</p>
                <p>If you didn't request this, ignore this email.</p>
            `,
        });
    }
}