# ✉️ EmailJS Templates for Portfolio Website

Copy and paste the template details below into your [EmailJS Dashboard](https://dashboard.emailjs.com/admin/templates).

---

## 📩 Template 1: Admin Notification (Email to Pinnika Manoj)
This email notifies you whenever someone submits a message on your portfolio website.

### 🔹 Subject Line
```text
New Portfolio Message: {{subject}}
```

### 🔹 Email Body (HTML / Text)
```html
<div style="font-family: Arial, sans-serif; background-color: #f4f6f9; padding: 20px; color: #333;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 30px; border-radius: 10px; border-top: 4px solid #6366f1; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
        
        <h2 style="color: #6366f1; margin-top: 0;">📬 New Contact Form Submission</h2>
        <p style="font-size: 14px; color: #666;">You have received a new inquiry from your portfolio website.</p>
        
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
        
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr>
                <td style="padding: 8px 0; font-weight: bold; width: 120px; color: #555;">Name:</td>
                <td style="padding: 8px 0;">{{from_name}}</td>
            </tr>
            <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #555;">Email:</td>
                <td style="padding: 8px 0;"><a href="mailto:{{from_email}}" style="color: #6366f1;">{{from_email}}</a></td>
            </tr>
            <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #555;">Subject:</td>
                <td style="padding: 8px 0;">{{subject}}</td>
            </tr>
        </table>
        
        <div style="margin-top: 20px; background-color: #f8fafc; padding: 15px; border-left: 4px solid #6366f1; border-radius: 4px;">
            <p style="margin: 0; font-weight: bold; color: #475569; margin-bottom: 8px;">Message:</p>
            <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #334155; white-space: pre-wrap;">{{message}}</p>
        </div>
        
        <hr style="border: none; border-top: 1px solid #eee; margin: 25px 0 15px 0;" />
        <p style="font-size: 12px; color: #94a3b8; text-align: center; margin: 0;">Sent via Pinnika Manoj Portfolio Contact Form</p>
    </div>
</div>
```

### 🔹 Envelope Settings (Right Sidebar in EmailJS)
* **To Email**: `manojpinnika2002@gmail.com` *(or your preferred email)*
* **From Name**: `Portfolio Contact Form`
* **Reply-To**: `{{from_email}}` *(Allows you to hit 'Reply' in Gmail to directly reply to the sender)*

---

## ✉️ Template 2: Visitor Confirmation (Auto-Reply to Sender)
This automated reply is sent back to the visitor to confirm their message was received.

### 🔹 Subject Line
```text
Thank you for reaching out, {{from_name}}!
```

### 🔹 Email Body (HTML / Text)
```html
<div style="font-family: Arial, sans-serif; background-color: #f4f6f9; padding: 20px; color: #333;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 30px; border-radius: 10px; border-top: 4px solid #10b981; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
        
        <h2 style="color: #059669; margin-top: 0;">Hello {{from_name}},</h2>
        
        <p style="font-size: 15px; line-height: 1.6; color: #334155;">
            Thank you for visiting my portfolio website and getting in touch! I have successfully received your message regarding <strong>"{{subject}}"</strong>.
        </p>
        
        <div style="background-color: #f0fdf4; border-left: 4px solid #10b981; padding: 15px; border-radius: 4px; margin: 20px 0;">
            <p style="margin: 0; font-size: 14px; color: #166534;">
                I review all incoming messages carefully and will respond to you at <strong>{{from_email}}</strong> as soon as possible.
            </p>
        </div>
        
        <p style="font-size: 14px; line-height: 1.6; color: #475569;">
            In the meantime, feel free to check out my GitHub profile or connect with me on LinkedIn.
        </p>
        
        <br />
        <p style="margin: 0; font-weight: bold; color: #1e293b;">Best regards,</p>
        <p style="margin: 4px 0 0 0; font-size: 15px; color: #059669; font-weight: 600;">Pinnika Manoj</p>
        <p style="margin: 2px 0 0 0; font-size: 13px; color: #64748b;">Python & Django Developer</p>
        
        <hr style="border: none; border-top: 1px solid #eee; margin: 25px 0 15px 0;" />
        <p style="font-size: 12px; color: #94a3b8; text-align: center; margin: 0;">Automated confirmation from pinnikamanoj.github.io</p>
    </div>
</div>
```

### 🔹 Envelope Settings (Right Sidebar in EmailJS)
* **To Email**: `{{from_email}}`
* **From Name**: `Pinnika Manoj`
* **From Email**: *(Your connected Gmail service)*

---

### 🚀 How to Apply These Templates in EmailJS
1. Open **[https://dashboard.emailjs.com/admin/templates](https://dashboard.emailjs.com/admin/templates)**
2. Click **Create New Template**.
3. Copy and paste the **Subject Line**, **Email Body**, and **Envelope Settings** from above.
4. Click **Save** in top right.
5. Copy the generated **Template ID** (e.g. `template_abcdef`).