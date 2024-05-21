export default function WeatherInfo() {
  return (
    <div className="flex flex-row flex-wrap gap-1 p-4 md:flex-row">
      <h1 className="w-full text-2xl font-bold">Cuaca</h1>
      <p id="date" className="w-full text-lg font-semibold">
        Sabtu, 20 Januari 2024
      </p>
      <p id="info" className="flex-1 text-lg font-normal">
        Cerah
      </p>
      <p id="temp" className="flex-1 text-2xl font-bold">
        29
      </p>
    </div>
  );
}
