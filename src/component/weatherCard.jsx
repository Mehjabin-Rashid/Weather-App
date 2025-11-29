import { convertUnixTimeToLocal } from "../utils/time";

export default function WeatherCard({ data }) {
  if (!data) return null;

  const localDate = convertUnixTimeToLocal(data.dt);
  const sunriseTime = convertUnixTimeToLocal(data.sys.sunrise);
  const sunsetTime = convertUnixTimeToLocal(data.sys.sunset);

  return (
    <div className="mt-6 sm:mt-8 rounded-2xl border border-white/30 bg-white/15 backdrop-blur-xl p-4 sm:p-6 md:p-8 text-white shadow-xl hover:-translate-y-0.5 transition">
      <h4 className="text-2xl sm:text-3xl font-bold drop-shadow break-words">{`📍 ${data.name}, ${data.sys.country}`}</h4>
      <h6 className="text-base sm:text-lg opacity-90 drop-shadow">{`📅 ${localDate.fullDate}`}</h6>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 my-4 sm:my-6">
        <img
          className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 drop-shadow-xl"
          src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
          alt={data.weather[0].description}
        />
        <h5 className="text-5xl sm:text-6xl font-extrabold bg-gradient-to-br from-white to-gray-200 bg-clip-text text-transparent drop-shadow">
          {Math.round(data.main.temp)}°C
        </h5>
      </div>

      <h5 className="text-lg sm:text-xl italic capitalize opacity-95 text-center sm:text-left">{`☁️ ${data.weather[0].main} - ${data.weather[0].description}`}</h5>

      <div className="mt-5 sm:mt-6 bg-white/10 rounded-xl p-4 sm:p-6 backdrop-blur-sm border border-white/20">
        <div className="grid grid-cols-2 gap-3 sm:gap-4 text-center sm:grid-cols-4">
          <div className="p-2 sm:p-3 rounded-lg bg-white/10 hover:bg-white/20 transition">
            <small className="block text-xs sm:text-sm opacity-80">🌡️ Feels Like</small>
            <strong className="text-white text-base sm:text-lg drop-shadow">{Math.round(data.main.feels_like)}°C</strong>
          </div>
          <div className="p-2 sm:p-3 rounded-lg bg-white/10 hover:bg-white/20 transition">
            <small className="block text-xs sm:text-sm opacity-80">💧 Humidity</small>
            <strong className="text-white text-base sm:text-lg drop-shadow">{data.main.humidity}%</strong>
          </div>
          <div className="p-2 sm:p-3 rounded-lg bg-white/10 hover:bg-white/20 transition">
            <small className="block text-xs sm:text-sm opacity-80">💨 Wind Speed</small>
            <strong className="text-white text-base sm:text-lg drop-shadow">{data.wind?.speed ?? 0} m/s</strong>
          </div>
          <div className="p-2 sm:p-3 rounded-lg bg-white/10 hover:bg-white/20 transition">
            <small className="block text-xs sm:text-sm opacity-80">🌊 Pressure</small>
            <strong className="text-white text-base sm:text-lg drop-shadow">{data.main.pressure} hPa</strong>
          </div>
        </div>
      </div>

      <div className="mt-5 sm:mt-6 bg-yellow-300/20 rounded-lg p-3 sm:p-4 border border-yellow-300/30">
        <h6 className="m-0 text-sm sm:text-base text-center sm:text-left">{`🌅 Sunrise: ${sunriseTime.time12h} | 🌇 Sunset: ${sunsetTime.time12h}`}</h6>
      </div>
    </div>
  );
}