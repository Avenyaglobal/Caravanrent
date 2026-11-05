import { createServerFn } from "@tanstack/react-start";
import nodemailer from "nodemailer";

const TO = "info@caravanrent-alicante.com";

export const sendBooking = createServerFn({ method: "POST" })
  .inputValidator((input: { subject: string; message: string; replyTo: string }) => {
    const subject = String(input?.subject || "").replace(/[\r\n]/g, " ").trim().slice(0, 180);
    const message = String(input?.message || "").replace(/\u0000/g, "").slice(0, 4000);
    const replyTo = String(input?.replyTo || "").trim().slice(0, 80);
    if (subject.length < 4 || message.length < 8) throw new Error("empty");
    if (replyTo && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(replyTo)) throw new Error("email");
    return { subject, message, replyTo };
  })
  .handler(async ({ data }) => {
    const pass = process.env.SMTP_PASS;
    if (!pass) throw new Error("smtp");
    const transport = nodemailer.createTransport({
      host: "smtp.titan.email",
      port: 465,
      secure: true,
      auth: { user: TO, pass },
    });
    await transport.sendMail({
      from: `Caravan Rent Alicante <${TO}>`,
      to: TO,
      replyTo: data.replyTo || undefined,
      subject: data.subject,
      text: data.message,
    });
    return { ok: true as const };
  });
