// pages/api/sendIdea.ts
import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

interface MessageSubmission {
  message: string;
  email?: string;
  name?: string;
  timestamp?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { message, email, name, timestamp } = req.body as MessageSubmission;

    // Validate message
    if (!message || !message.trim()) {
      return res.status(400).json({ message: 'Message is required' });
    }

    // Send email notification
    await sendEmailNotification({ 
      message: message.trim(), 
      email, 
      name, 
      timestamp: timestamp || new Date().toISOString() 
    });
    
    res.status(200).json({ 
      message: 'Message sent successfully',
      success: true 
    });

  } catch (error) {
    console.error('Error processing message:', error);
    res.status(500).json({ 
      message: 'Failed to send message. Please try again.',
      success: false 
    });
  }
}

async function sendEmailNotification(data: MessageSubmission) {
  try {
    // FIXED: createTransporter -> createTransport
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD
      }
    });

    const isGoogleSignIn = data.email && data.name;
    const subject = isGoogleSignIn 
      ? `💡 New Message from ${data.name}` 
      : '💭 New Anonymous Message';

    // FIXED: Added null checks for data.name and data.email
    const senderName = data.name || 'Anonymous';
    const senderEmail = data.email || 'no-reply@example.com';

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      replyTo: data.email || undefined,
      subject,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>New Message from Portfolio</title>
        </head>
        <body style="margin: 0; padding: 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f5f5f5;">
          <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
            
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
              <h1 style="margin: 0; color: white; font-size: 28px; font-weight: 600;">
                ${isGoogleSignIn ? '💡 New Message' : '💭 Anonymous Message'}
              </h1>
              <p style="margin: 10px 0 0 0; color: rgba(255,255,255,0.9); font-size: 16px;">
                From your portfolio Vim search
              </p>
            </div>
            
            <!-- Content -->
            <div style="padding: 30px;">
              
              ${isGoogleSignIn ? `
              <!-- Sender Info -->
              <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 25px; border-left: 4px solid #667eea;">
                <h3 style="margin: 0 0 15px 0; color: #1e293b; font-size: 18px;">From:</h3>
                <p style="margin: 0 0 8px 0; color: #334155; font-size: 16px; font-weight: 600;">${senderName}</p>
                <p style="margin: 0 0 8px 0; color: #64748b; font-size: 14px;">
                  <strong>Email:</strong> <a href="mailto:${senderEmail}" style="color: #667eea; text-decoration: none;">${senderEmail}</a>
                </p>
                <p style="margin: 0; color: #64748b; font-size: 14px;">
                  <strong>Sent:</strong> ${new Date(data.timestamp!).toLocaleString()}
                </p>
              </div>
              ` : `
              <!-- Anonymous Message Info -->
              <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 25px; border-left: 4px solid #94a3b8;">
                <h3 style="margin: 0 0 15px 0; color: #1e293b; font-size: 18px;">Anonymous Message</h3>
                <p style="margin: 0; color: #64748b; font-size: 14px;">
                  <strong>Sent:</strong> ${new Date(data.timestamp!).toLocaleString()}
                </p>
              </div>
              `}
              
              <!-- Message Content -->
              <div style="background: white; padding: 25px; border: 2px solid #e2e8f0; border-radius: 8px; margin-bottom: 25px;">
                <h3 style="margin: 0 0 15px 0; color: #1e293b; font-size: 18px; display: flex; align-items: center;">
                  <span style="margin-right: 8px;">💭</span> Their Message:
                </h3>
                <div style="color: #374151; line-height: 1.7; font-size: 16px; white-space: pre-wrap; background: #f9fafb; padding: 20px; border-radius: 6px; border-left: 4px solid #10b981; font-family: 'SF Mono', Monaco, 'Cascadia Code', monospace;">
                  ${data.message}
                </div>
              </div>
              
              ${isGoogleSignIn ? `
              <!-- Action Button -->
              <div style="text-align: center; margin-top: 30px;">
                <a href="mailto:${senderEmail}?subject=Re: Your message from my portfolio&body=Hi ${senderName.split(' ')[0]},%0D%0A%0D%0AThank you for reaching out through my portfolio!%0D%0A%0D%0ARegarding your message: "${data.message.substring(0, 100)}${data.message.length > 100 ? '...' : ''}",%0D%0A%0D%0ABest regards,%0D%0AArsalan" 
                   style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600;">
                  Reply to ${senderName.split(' ')[0]}
                </a>
              </div>
              ` : ''}
              
            </div>
            
            <!-- Footer -->
            <div style="background: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="margin: 0; color: #64748b; font-size: 14px;">
                ${isGoogleSignIn ? `💡 Message sent via Vim search with Google Sign-In` : `💭 Anonymous message via Vim search`}
              </p>
            </div>
            
          </div>
        </body>
        </html>
      `,
      text: `
${isGoogleSignIn ? `New Message from ${senderName}` : 'Anonymous Message'}

${isGoogleSignIn ? `From: ${senderName} (${senderEmail})` : 'Anonymous sender'}
Sent: ${new Date(data.timestamp!).toLocaleString()}

Message:
${data.message}

${isGoogleSignIn ? `Reply to this email to respond to ${senderName}.` : ''}
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');

  } catch (error) {
    console.error('Failed to send email:', error);
    throw error;
  }
}