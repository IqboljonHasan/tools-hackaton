import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import cheerio from "cheerio";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { toolUrl } = req.query;
    try {
        const { data } = await axios.get(toolUrl as string);
        const $ = cheerio.load(data);
        const title = $("meta[name='title']").attr("content") || $("title").text();
        const description = $("meta[name='description']").attr("content");
        res.status(200).json({ title, description });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch tool information" });
    }
}