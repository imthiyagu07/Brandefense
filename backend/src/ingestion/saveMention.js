import Mention from "../models/Mention.js";

export const saveMention = async ({ brand, text, source, url }) => {
    try {
        const m = await Mention.create({
            brand, 
            text, 
            source, 
            url
        });
        console.log("Inserted mention:", m._id);
        return m;
    } catch (error) {
        console.error("Save mention failed:", error.message);
    }
};