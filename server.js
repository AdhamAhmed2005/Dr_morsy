import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import axios from "axios";
import dotenv from "dotenv"

const app = express();
const PORT = process.env.PORT || 3000;
dotenv.config()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "morsy.html"));
});

app.post("/api/reserve", async (req, res) => {
    const { name, email, phone, date } = req.body;

    console.log("Reservation received:", req.body);

    const message = `New Reservation by ${name}:
    Name: ${name}
    Email: ${email || "N/A"}
    Phone: ${phone}
    Date: ${date}`;

    const payload = {
        type: "note",
        title: "",
        body: message,
    };

    try {
        // Send the notification using Axios
        const response = await axios.post("https://api.pushbullet.com/v2/pushes", payload, {
            headers: {
                "Access-Token": process.env.PUSHBULLET_API_KEY,
                "Content-Type": "application/json",
            },
        });

        console.log("Pushbullet notification sent:", response.data);
        res.send("Reservation received successfully!");
    } catch (error) {
        console.error("Error sending Pushbullet notification:", error.response?.data || error.message);
        res.status(500).send("Failed to send notification.");
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
