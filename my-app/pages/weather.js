import { useState } from "react";

const Weather = () => {
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchWeather = async () => {
        if (!city) return;
        setLoading(true);
        setError(null);

        try {
            const res = await fetch(`/api/weather?city=${city}`);
            const data = await res.json();
            if (res.ok) {
                setWeather(data);
            } else {
                setError(data.error);
                setWeather(null);
            }
        } catch (err) {
            setError("Failed to fetch weather data");
            setWeather(null);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Weather App</h1>
            <input
                type="text"
                placeholder="Enter city name"
                value={city}
                onChange={(e) => setCity(e.target.value)}
            />
            <button onClick={fetchWeather} disabled={loading}>
                {loading ? "Loading..." : "Get Weather"}
            </button>

            {error && <p style={{ color: "red" }}>{error}</p>}

            {weather && (
                <div>
                    <h2>{weather.location.name}, {weather.location.country}</h2>
                    <p>Temperature: {weather.current.temp_c}°C</p>
                    <p>Weather: {weather.current.condition.text}</p>
                    <img src={weather.current.condition.icon} alt="Weather Icon" />
                    <p>Humidity: {weather.current.humidity}%</p>
                    <p>Wind Speed: {weather.current.wind_kph} kph</p>
                </div>
            )}
        </div>
    );
};

export default Weather;
