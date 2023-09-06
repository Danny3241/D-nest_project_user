import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';


@Injectable()
export class MailService {
    private transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'sakhiyadenish33@gmail.com',
                pass: 'kjkmqrirbcykwlwk',
            },
        })
    }
    async sendEmail(to: string, subject: string, text: string): Promise<void> {
        await this.transporter.sendMail({
            from: 'sakhiyadenish33@gmail.com',
            to,
            subject,
            text,
        });
    }
}
