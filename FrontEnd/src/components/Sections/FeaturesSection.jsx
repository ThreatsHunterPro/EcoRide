import Title from "../Shared/Title";
import FeatureCard from "../Shared/Cards/FeatureCard";
import leafIcon from "../../assets/leafIcon.png"
import euroIcon from "../../assets/euroIcon.png"
import discussionIcon from "../../assets/discussionIcon.png"

export default function FeaturesSection() {
    return (
        <div className="flex flex-col py-32 bg-white">

            <Title textColor="text-green-900" toCenter={true} className="mb-10 text-3xl font-bold">
                Pourquoi choisir EcoRide ?
            </Title>

            <div className="flex flex-wrap justify-center gap-8 px-4">
                <FeatureCard 
                    icon={leafIcon}
                    altIcon="Leaf icon"
                    title="Éco-Responsable" 
                    description="Réduisez votre empreinte carbone en partageant vos trajets et en utilisant des véhicules électriques." 
                />

                <FeatureCard 
                    icon={euroIcon}
                    altIcon="Euro icon"
                    title="Économique" 
                    description="Économisez sur vos déplacements en partageant les frais de trajet avec d'autres passagers." 
                />

                <FeatureCard 
                    icon={discussionIcon} 
                    altIcon="Discussion icon"
                    title="Convivial" 
                    description="Rencontrez de nouvelles personnes et voyagez dans une ambiance conviviale." 
                />

            </div>

        </div>
    );
}