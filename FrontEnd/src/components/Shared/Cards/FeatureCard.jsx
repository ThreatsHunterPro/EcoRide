import Title from "../Title"

export default function FeatureCard({ icon, altIcon = "", title, description }) 
{
  return (
    <div className="flex flex-col items-center flex-1 min-w-[300px] max-w-sm p-8 rounded-3xl shadow-lg border border-gray-50 bg-white text-center transition-transform hover:scale-105">
        <div className="w-16 h-16 mb-6 flex items-center justify-center rounded-full bg-green-600 text-white text-3xl">
            <img
                src={icon}
                alticon=""
                className="w-8 h-8"
            />
        </div>
      
        <Title 
            level={2} 
            textColor="text-green-900" 
            toCenter={true} 
            className="mb-4 font-bold"
        >
            {title}
        </Title>
      
        <p className="text-gray-600 leading-relaxed">
            {description}
        </p>
    </div>
  );
};