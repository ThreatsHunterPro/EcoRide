import Header from "../../../Layouts/Header";
import Footer from "../../../Layouts/Footer";
import MainContainer from "../../../Layouts/MainContainer";
import PageWrapper from "../../../Shared/PageWrapper";
import Title from "../../../Shared/Title";
import LinkText from "../../../Shared/LinkText";

export default function PrivacyPage() {
  return (
    <PageWrapper>
      <Header />
      <MainContainer>
        <div className="p-6 md:p-10">
          
          <div className="border-b border-gray-200 mb-12 text-center">
            <Title toCenter={true}>Politique de confidentialité</Title>
          </div>

          <div className="space-y-8">
            
            <section className="space-y-3">
              <div className="border-l-2 border-[#1a8a3c] pl-4">
                <Title level={2}>1. Collecte des données</Title>
              </div>
              <div className="text-gray-600 text-sm leading-relaxed pl-5">
                <p>
                  Nous collectons uniquement les données strictement nécessaires afin d'améliorer votre expérience sur notre site.
                </p>
              </div>
            </section>

            <section className="space-y-3">
              <div className="border-l-2 border-[#1a8a3c] pl-4">
                <Title level={2}>2. Utilisation des données</Title>
              </div>
              <div className="text-gray-600 text-sm leading-relaxed pl-5">
                <p>
                  Vos données personnelles sont utilisées uniquement dans une démarche de qualité et d'optimisation de nos services.
                </p>
              </div>
            </section>

            <section className="space-y-3">
              <div className="border-l-2 border-[#1a8a3c] pl-4">
                <Title level={2}>3. Partage des données</Title>
              </div>
              <div className="text-gray-600 text-sm leading-relaxed pl-5">
                <p>
                  Aucune donnée personnelle n’est vendue, louée ni transmise à des tiers sans votre consentement explicite.
                </p>
              </div>
            </section>

            <section className="space-y-3">
              <div className="border-l-2 border-[#1a8a3c] pl-4">
                <Title level={2}>4. Conservation des données</Title>
              </div>
              <div className="text-gray-600 text-sm leading-relaxed pl-5">
                <p>
                  Vos données sont conservées uniquement pendant la durée nécessaire aux finalités pour lesquelles elles sont traitées.
                </p>
              </div>
            </section>

            <section className="space-y-3">
              <div className="border-l-2 border-[#1a8a3c] pl-4">
                <Title level={2}>5. Vos droits</Title>
              </div>
              <div className="text-gray-600 text-sm leading-relaxed pl-5">
                <p>
                  Vous disposez d’un droit d’accès, de rectification et d’opposition concernant vos informations personnelles. 
                  Pour exercer ces droits, vous pouvez nous en faire part à tout moment à l'adresse mail suivante : 
                  <LinkText link="contact@ecoride.com" className="ml-1 text-sm" />
                </p>
              </div>
            </section>

          </div>

          <div className="border-t border-gray-300 mt-16 pt-6 text-center">
            <p className="text-[11px] text-gray-500 tracking-wider font-semibold">
              DOCUMENT OFFICIEL ECORIDE — TOUS DROITS RÉSERVÉS
            </p>
          </div>

        </div>
      </MainContainer>
      <Footer />
    </PageWrapper>
  );
}