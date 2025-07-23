// const express = require("express");
// const cors = require("cors");
// const { translate } = require("@vitalets/google-translate-api");

// const app = express();
// app.use(cors());
// app.use(express.json());

// app.post("/translate", async (req, res) => {
//     const { text, from, to } = req.body;

//     try {
//         const result = await translate(text, { from, to });
//         res.json({ translated: result.text });
//     } catch (err) {
//         res.status(500).json({ error: "Translation failed." });
//     }
// });

// app.listen(3001, () => console.log("Server running on http://localhost:3001"));



const express = require("express");
const cors = require("cors");
const { translate } = require("@vitalets/google-translate-api");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/translate", async (req, res) => {
    const { text, from, to } = req.body;

    if (!text || !from || !to) {
        return res.status(400).json({ error: "Missing required fields." });
    }

    try {
        const result = await translate(text, { from, to });
        res.json({ translated: result.text });
    } catch (err) {
        console.error("Translation error:", err.message);
        res.status(500).json({ error: "Translation failed." });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () =>
    console.log(`✅ Server running on http://localhost:${PORT}`)
);
