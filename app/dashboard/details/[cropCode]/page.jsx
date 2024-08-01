import WeatherInfo from "@/app/ui/dashboard/weather-info"
import EnvironmentInfo from "@/app/ui/dashboard/environment-info"
import NanobubbleInfo from "@/app/ui/dashboard/nanobubble-info"

export default function Page({ params }) {
    return (
        <div className="flex flex-col-reverse gap-4 md:flex-row">
            {/* detail */}
            <div className="grow px-10 py-5 flex-col rounded-xl bg-green-50">
                <h1 className="font-bold text-2xl text-green-800">Detail Tanaman {params.cropCode}</h1>
            </div>
            
            {/* environment sensor */}
            <div className="flex flex-row gap-4 md:flex-col md:w-1/4">
                <div className="rounded-xl bg-green-50 bg-opacity-70">
                    <WeatherInfo />
                </div>
                <div className="rounded-xl bg-green-50 bg-opacity-70">
                    <EnvironmentInfo />
                </div>
                <div className="rounded-xl bg-green-50 bg-opacity-70">
                    <NanobubbleInfo />
                </div>
            </div>
        </div>
    )
}