import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
const SECRET_KEY ="0x4AAAAAAAiLvjA8xUgC_TCdrKEgMqSsHO4"
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
const otpStore:Record<string,string> = {}


// Rate limiter configuration
const otpLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 3, // Limit each IP to 3 OTP requests per windowMs
    message: 'Too many requests, please try again after 5 minutes',
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const passwordResetLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 password reset requests per windowMs
    message: 'Too many password reset attempts, please try again after 15 minutes',
    standardHeaders: true,
    legacyHeaders: false,
});

// Endpoint to generate and log OTP
app.post('/generate-otp', otpLimiter, (req, res) => {
    const email = req.body.email;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // generates a 6-digit OTP
    otpStore[email] = otp;
  
    console.log(`OTP for ${email}: ${otp}`); // Log the OTP to the console
    res.status(200).json({ message: "OTP generated and logged" });
  });
  
  // Endpoint to reset password
  app.post('/reset-password', passwordResetLimiter, async(req, res) => {
    console.log("Reached here")
    const { email, otp, newPassword, token } = req.body;
    console.log(token);
  
    let formData = new FormData();
      formData.append('secret', SECRET_KEY);
      formData.append('response', token);
  
    const url = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
      const result = await fetch(url, {
          body: formData,
          method: 'POST',
      });
      console.log("result",await result.json());
    const challengeSucceeded = (await result.json()).success;
  
    if (!challengeSucceeded) {
      return res.status(403).json({ message: "Invalid reCAPTCHA token" });
    }
    if (!email || !otp || !newPassword) {
      return res.status(400).json({ message: "Email, OTP, and new password are required" });
    }
    if (otpStore[email] === otp) {
      console.log(`Password for ${email} has been reset to: ${newPassword}`);
      delete otpStore[email]; // Clear the OTP after use
      res.status(200).json({ message: "Password has been reset successfully" });
    } else {
      res.status(401).json({ message: "Invalid OTP" });
    }
  });
  
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})
