import express from "express";
import multer from "multer";
import cors from "cors";
import nodemailer from "nodemailer";

const app = express();

app.use(cors());

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

app.listen(3000, () => {
  console.log("Server jalan di http://localhost:3000");
});