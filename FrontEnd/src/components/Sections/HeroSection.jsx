import SearchSection from "./SearchSection";
import Title from "../Shared/Title";
import hero from "../../assets/heroImage.png";

export default function HeroSection() {
    return (
        <section className="relative w-full lg:min-h-[800px] overflow-hidden bg-green-50 flex">
            <div className="absolute inset-0 w-full h-full">
                <img
                    src={hero}
                    alt="Mobilité écologique"
                    className="w-full h-auto max-h-[800px] object-cover object-right-bottom pointer-events-none"
                />
            </div>

            <div className="relative z-10 flex p-12 lg:pt-12 lg:pl-40">
                <div className="flex flex-col space-y-4">
                    <div className="flex flex-col -space-y-10">
                        <Title>
                            Voyagez Écologique,<br/> 
                            <span className="text-green-900">Voyagez Intelligent</span>
                        </Title>
                        <p className="text-gray-700 text-xl max-w-sm lg:max-w-2xl">
                            Partagez vos trajets avec EcoRide et contribuez à réduire la pollution 
                            en privilégiant les transports en commun et les voitures électriques.
                        </p>
                    </div>

                    <div className="w-full bg-white rounded-[1.5rem] shadow-2xl p-2 lg:p-4 border">
                        <SearchSection />
                    </div>
                </div>
            </div>
        </section>
    );
}