import express from "express";
import multer from "multer";
import cors from "cors";
import nodemailer from "nodemailer";
import admin from "firebase-admin";
import serviceAccount from "./serviceAccountKey.json" assert { type: "json" };

const app = express();
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

app.use(cors());
app.use(express.json());

const upload = multer({
  dest: "uploads/"
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "sanubari.system@gmail.com",
    pass: "bvwpnjusgrblztxt"
  }
});

app.post("/support", upload.single("image"), async (req, res) => {
  try {
    const message = req.body.message;
    const image = req.file;

    console.log("Pesan:", message);
    console.log("Gambar:", image);

    await transporter.sendMail({
      from: "sanubari.system@gmail.com",
      to: "helpsanubari@gmail.com",
      subject: "Support SANUBARI",
      html: `
        <div style="font-family: Arial, sans-serif;">
          <h2>Pesan Support Baru</h2>

          <p style="margin-top: 20px;">
            ${message || "Tidak ada pesan"}
          </p>
        </div>
      `,
      attachments: image
        ? [
            {
              filename: image.originalname,
              path: image.path
            }
          ]
        : []
    });

    res.json({
      success: true,
      message: "Pesan berhasil dikirim"
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Gagal mengirim pesan"
    });
  }
});

app.post("/forgot-password", async (req, res) => {
  try {

    const { email } = req.body;

    const resetLink = await admin
      .auth()
      .generatePasswordResetLink(email);

    await transporter.sendMail({
      from: "SANUBARI Support <sanubari.system@gmail.com>",
      to: email,
      subject: "Reset Password SANUBARI",
      html: `
        <div
          style="
            font-family: Arial, sans-serif;
            padding: 40px;
            background: #F9F9F5;
          "
        >

          <h1 style="color:#191C1E;">
            SANUBARI Account Recovery
          </h1>

          <p
            style="
              margin-top:20px;
              color:#555;
              line-height:1.7;
            "
          >
            Kami menerima permintaan untuk mereset password akun SANUBARI Anda.
          </p>

          <a
            href="${resetLink}"
            style="
              display:inline-block;
              margin-top:30px;
              padding:14px 24px;
              background:#91C6C2;
              color:white;
              text-decoration:none;
              border-radius:12px;
              font-weight:bold;
            "
          >
            Reset Password
          </a>

          <p
            style="
              margin-top:35px;
              color:#999;
              font-size:13px;
            "
          >
            Jika Anda tidak meminta reset password,
            abaikan email ini.
          </p>

        </div>
      `
    });

    res.json({
      success: true
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false
    });

  }
});
app.listen(3000, () => {
  console.log("Server jalan di http://localhost:3000");
});