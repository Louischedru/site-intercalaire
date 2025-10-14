import { createTransport } from 'nodemailer';
import { Request, Response } from 'express';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

const transportOptions = {
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: process.env.EMAIL_PORT == '465',
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASSWORD },
} as SMTPTransport.Options;

const transporter = createTransport(transportOptions);

console.log(transportOptions);

export async function sendMail(req: Request, res: Response) {
  const { name, firstname, email, subject, message } = req.body;

  try {
    const info = await transporter.sendMail({
      from: `"Intercalaire Productions - Demande de contact <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_RECEIVER,
      text: `Une demande de contact a été formulée par ${firstname} ${name}. \n\n
        Message :\n ${message}\n\n
        Adresse email : ${email}`,
      subject,
    });
    res.status(200).json({ message: 'Message envoyé' });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
}
