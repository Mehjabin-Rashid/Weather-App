import { useEffect, useState } from "react";
import WeatherCard from "./component/weatherCard.jsx";

const API_KEY = "82ab3b9966d7de1b8bbcfab43ab72df1"; // Consider env vars for production

export default function App() {
  const [query, setQuery] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const fetchWeather = async (city) => {
    if (!city) return;
    setLoading(true);
    setErrorMsg("");
    setData(null);
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
      const res = await fetch(url);
      const json = await res.json();
      if (json.cod === "404" || json.message === "city not found") {
        setErrorMsg("No results found!");
      } else if (json.cod >= 400) {
        setErrorMsg("Error loading weather data.");
      } else {
        setData(json);
      }
    } catch (e) {
      setErrorMsg("❌ Error loading weather data. Check your connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather("Dhaka");
  }, []);

  const onSearch = () => {
    const cityName = query.trim();
    if (!cityName) {
      setErrorMsg("Please enter a city name to search...");
      return;
    }
    setQuery("");
    fetchWeather(cityName);
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") onSearch();
  };

  return (
    <main className="min-h-screen w-full relative overflow-x-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{
          // Gradient first so it overlays gently atop the photo
          backgroundImage:
            "linear-gradient(135deg, rgba(102,126,234,0.55) 0%, rgba(118,75,162,0.55) 100%), url('/img.jpg')",
          backgroundRepeat: "no-repeat, no-repeat",
          backgroundAttachment: "fixed, scroll",
          backgroundSize: "cover, cover",
        }}
      />
      <div className="absolute inset-0 bg-black/40 -z-10" />

      <section className="relative z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            {/* Search card */}
            <div className="mt-8 md:mt-10 mb-6 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl p-5 sm:p-6 md:p-8 shadow-2xl transition hover:-translate-y-1">
              <div className="text-center mb-4 text-white">
                <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-br from-white to-gray-100 bg-clip-text text-transparent drop-shadow">
                  Current Weather App
                </h2>
              </div>

              <div className="max-w-xl mx-auto">
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-0 overflow-hidden rounded-2xl sm:rounded-full shadow-lg">
                  <input
                    id="search-city"
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={onKeyDown}
                    placeholder="Enter city name (e.g., London, Tokyo, New York)"
                    className="flex-1 h-12 sm:h-14 px-4 sm:px-6 text-base sm:text-lg bg-white/90 focus:bg-white outline-none border-2 border-transparent focus:border-indigo-400 transition"
                  />
                  <button
                    id="search-button"
                    onClick={onSearch}
                    className="h-12 sm:h-14 w-full sm:w-36 bg-gradient-to-br from-rose-500 to-red-500 text-white font-semibold uppercase tracking-wide hover:from-red-500 hover:to-rose-500 transition rounded-xl sm:rounded-none sm:rounded-r-full"
                  >
                    <span className="mr-1">🔍</span> Search
                  </button>
                </div>

                {errorMsg && (
                  <div className="mt-3 text-rose-400 font-semibold bg-rose-400/10 p-3 rounded-lg border-l-4 border-rose-400">
                    {errorMsg}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Weather results */}
          <div className="max-w-2xl mx-auto">
            {loading && (
              <div className="text-white text-center loading">
                <h4 className="text-xl">🌤️ Loading weather data...</h4>
                <div className="mt-3 inline-block w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
              </div>
            )}

            {!loading && data && <WeatherCard data={data} />}
          </div>
        </div>
      </section>
    </main>
  );
}
