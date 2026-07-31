# Secure EmailJS Setup Guide for GitHub Pages

To make the contact form fully operational and secure on **GitHub Pages** (which is a static hosting platform that cannot run server-side Python files), you can use **EmailJS**. This guide explains how to configure EmailJS to securely receive notifications and send confirmation emails to your users without exposing your SMTP or email account passwords.

---

## 🛠️ Step 1: Create an EmailJS Account
1. Go to [https://www.emailjs.com](https://www.emailjs.com/) and click **Sign Up**.
2. Create a free account (the free tier allows up to 200 emails per month).

---

## 🔌 Step 2: Add an Email Service
1. In the EmailJS dashboard, click on **Email Services** in the left sidebar.
2. Click **Add New Service**.
3. Select your provider (e.g., **Gmail**, **Outlook**, etc.).
4. Click **Connect Account**, log in to your email, and grant EmailJS permission to send emails on your behalf.
5. Click **Create Service**.
6. Copy the **Service ID** (e.g., `service_abc123`). You will need this for your `script.js` file.

---

## 📝 Step 3: Create Email Templates

You will need to create **two email notifications**: 
- A notification to yourself containing the user's message.
- An automatic confirmation email to the user (handled dynamically by EmailJS auto-responders).

### Template 1: Notification to Yourself (Admin Alert)
1. Go to **Email Templates** in the left sidebar and click **Create New Template**.
2. Configure the **Content**:
   - **Subject**: `New Portfolio Message: {{subject}}`
   - **Body**:
     ```text
     You have received a new contact request from your portfolio website:

     Name: {{from_name}}
     Email: {{from_email}}
     Subject: {{subject}}

     Message:
     --------------------------------------------
     {{message}}
     --------------------------------------------
     ```
3. Configure the **Envelope** (right sidebar):
   - **To Email**: Your personal email (e.g., `manojpinnika2002@gmail.com`).
   - **From Name**: `Portfolio Contact Form`
   - **Reply-To**: `{{from_email}}` (this lets you reply directly to the sender).
4. Click **Save**.
5. Copy the **Template ID** (e.g., `template_xyz456`).

---

### Template 2: Automatic Confirmation to User (Auto-Reply)
You have two options for the user auto-reply:
* **Option A (EmailJS Auto-acknowledgment)**: In the template you created above, go to the **Auto-Reply** tab, enable it, and design a custom message sent to `{{from_email}}`.
* **Option B (Separate Template - Recommended for better control)**:
  1. Click **Create New Template** again.
  2. Configure the **Content**:
     - **Subject**: `Thanks for reaching out, {{from_name}}!`
     - **Body**:
       ```text
       Hi {{from_name}},

       Thank you for visiting my portfolio website and getting in touch! This is an automated confirmation to let you know that I have successfully received your message regarding "{{subject}}".

       I will review your message and get back to you shortly.

       Best regards,
       Pinnika Manoj
       Python & Django Developer
       ```
  3. Configure the **Envelope** (right sidebar):
     - **To Email**: `{{from_email}}` (sends the email back to the visitor).
     - **From Name**: `Pinnika Manoj`
     - **From Email**: Select your connected service email.
  4. Click **Save**.
  5. Copy this second **Template ID** if you choose to send it via script (alternatively, Option A is simpler as it triggers automatically with one API call).

---

## 🔑 Step 4: Retrieve API Keys
1. Go to **Integration** or **Account** -> **API Keys** in the bottom left corner.
2. Under **Public Key**, copy your public token (e.g., `user_xxxxx` or `abcd1234efgh`).
3. **⚠️ Security Warning**: Never expose your **Private Key**. The code only requires the **Public Key**, which is safe to leave in client-side code because it only allows sending emails to templates defined inside your secure dashboard.

---

## 💻 Step 5: Integrate into the Code

1. Open your [index.html](file:///c:/Users/91703/OneDrive/Documents/portifilio/index.html) file and ensure the EmailJS script is loaded before `script.js` (this has already been added):
   ```html
   <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
   ```

2. Open [script.js](file:///c:/Users/91703/OneDrive/Documents/portifilio/script.js) - EmailJS is configured as follows:
   ```javascript
   emailjs.init("x4EKl5UqcBl9TN7CB"); // Public Key
   ```

3. Form submission handler configuration:
   ```javascript
   const SERVICE_ID = "service_ga0j96j";
   const ADMIN_TEMPLATE_ID = "template_g49lm9n";
   ```
   - Service ID: `service_ga0j96j`
   - Template ID: `template_g49lm9n`
   - Public Key: `x4EKl5UqcBl9TN7CB`

---

## 🔒 Step 6: Verify Credentials Safety
- **No SMTP credentials in repo**: By moving to EmailJS, you can delete the `server.py` file and the local `.env` file containing cleartext passwords (`SMTP_PASSWORD = "gwmw ulvv yufz xjtd"`).
- **Public Key safety**: The `Public Key` is safe to keep in your public Git repository because it does not grant access to edit templates, read emails, or send emails outside your predefined templates.
