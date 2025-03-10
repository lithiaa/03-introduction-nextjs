export default async function handler(req, res) {
    const { city } = req.query;
    
    if (!city) {
        return res.status(400).json({ error: "City parameter is required" });
    }

    const API_KEY = "a5ce07f2a9d0485283854450251003"; // Ganti dengan API key Anda
    const API_URL = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`;

    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error("Failed to fetch weather data");
        }
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
