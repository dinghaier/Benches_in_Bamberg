import express from "express";
import fs from "fs";
import cors from "cors";

const app = express();
const FILE = "./server/reviews.json";

app.use(cors());
app.use(express.json());


app.get("/reviews", (req, res) => {
    const reviews = JSON.parse(fs.readFileSync(FILE,"utf-8"));
    res.json(reviews);
});

app.post("/reviews", (req, res) => {
    const reviews = JSON.parse(fs.readFileSync(FILE,"utf-8"));

    const newReview = {
        benchId: req.body.benchId,
        author: req.body.author || "Anonymous",
        rating: Number(req.body.rating),
        comment: req.body.comment
    };

    reviews.push(newReview);
    fs.writeFileSync(FILE, JSON.stringify(reviews, null, 2));
    res.json({ success: true, review: newReview });
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});