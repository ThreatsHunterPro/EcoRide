import Header from "../../../Layouts/Header";
import Footer from "../../../Layouts/Footer";
import MainContainer from "../../../Layouts/MainContainer";
import PageWrapper from "../../../Shared/PageWrapper";
import Title from "../../../Shared/Title";
import LinkText from "../../../Shared/LinkText";
import ListItem from "../../../Shared/ListItem";

export default function LegalPage() {
  return (
    <PageWrapper>
      <Header />
      <MainContainer>
        <div className="p-6 md:p-10">
          
          <div className="border-b border-gray-200 mb-12 text-center">
            <Title toCenter={true}>Mentions légales</Title>
          </div>

          <div className="space-y-8">
            
            <section className="space-y-3">
              <div className="border-l-2 border-[#1a8a3c] pl-4">
                <Title level={2}>1. Éditeur du site</Title>
              </div>
              <div className="text-gray-600 text-sm leading-relaxed pl-5 space-y-2">
                <p className="font-bold text-gray-900 text-base">EcoRide</p>
                <p>123 Rue de l’Imaginaire - 34000 Montpellier, France</p>
                
                <ul className="">
                  <ListItem label="E-mail">
                    <LinkText link="contact@ecoride.com" />
                  </ListItem>
                  <ListItem label="Téléphone">
                    <span className="text-gray-700 font-medium">+33 6 12 34 56 78</span>
                  </ListItem>
                </ul>
              </div>
            </section>

            <section className="space-y-3">
              <div className="border-l-2 border-[#1a8a3c] pl-4">
                <Title level={2}>2. Directeur de la publication</Title>
              </div>
              <div className="text-gray-600 text-sm leading-relaxed pl-5">
                <p className="font-medium text-gray-900">Thomas Colin</p>
              </div>
            </section>

            <section className="space-y-3">
              <div className="border-l-2 border-[#1a8a3c] pl-4">
                <Title level={2}>3. Propriété intellectuelle</Title>
              </div>
              <div className="text-gray-600 text-sm leading-relaxed pl-5">
                <p>
                  Tous les contenus présents sur ce site, incluant, de façon non limitative, les graphismes, 
                  images, textes, vidéos, animations, sons, logos, gifs et icônes ainsi que leur mise en forme 
                  sont la propriété exclusive de la société <span className="font-bold text-gray-900">EcoRide</span> ou de leurs auteurs respectifs.
                </p>
              </div>
            </section>

            <section className="space-y-3">
              <div className="border-l-2 border-[#1a8a3c] pl-4">
                <Title level={2}>4. Cookies et données personnelles</Title>
              </div>
              <div className="text-gray-600 text-sm leading-relaxed pl-5">
                <p>
                  Ce site utilise des cookies afin d'améliorer l'expérience utilisateur et de réaliser des statistiques de visites. 
                  Conformément aux réglementations en vigueur, vous disposez d'un droit d'accès, de rectification et d'opposition 
                  à vos données. Pour plus d'informations, veuillez consulter notre{" "}
                  <LinkText link="/privacy">Politique de confidentialité</LinkText>.
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