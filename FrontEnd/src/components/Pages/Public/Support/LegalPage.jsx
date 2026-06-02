import Header from "../../../Layouts/Header";
import Footer from "../../../Layouts/Footer";
import MainContainer from "../../../Layouts/MainContainer";
import PageWrapper from "../../../Shared/PageWrapper";
import Title from "../../../Shared/Title";
import LinkText from "../../../Shared/LinkText";

export default function LegalPage() {
  return (
    <PageWrapper>
      <Header />
      <MainContainer>
        <Title toCenter={true}>Mentions légales</Title>
        <section className="mb-6">
          <Title level={2}>Éditeur du site</Title>
          <p>EcoRide</p>
          <p>123 Rue de l’Imaginaire</p>
          <p>34000 Montpellier, France</p>
          <p>Email : worknest-contact@gmail.com</p>
          <p>Téléphone : +33 6 12 34 56 78</p>
        </section>

        <section className="mb-6">
          <Title level={2}>Directeur de la publication</Title>
          <p>Thomas Colin</p>
        </section>

        <section className="mb-6">
          <Title level={2}>Propriété intellectuelle</Title>
          <p>
            Tous les contenus présents sur ce site sont la propriété exclusive de EcoRide ou de leurs auteurs respectifs.
          </p>
        </section>

        <section>
          <Title level={2}>Cookies et données personnelles</Title>
          <p>
            Ce site utilise des cookies, veuillez consultez notre
            <LinkText link="/privacy">  
              Politique de confidentialité
            </LinkText>
          </p>
        </section>
      </MainContainer>
      <Footer />
    </PageWrapper>
  );
}
