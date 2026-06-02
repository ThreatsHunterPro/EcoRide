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
        <Title toCenter={true}>Politique de confidentialité</Title>
        <section className="mb-6">
          <Title level={2}>Collecte des données</Title>
          <p>Nous collectons uniquement les données strictement nécessaires afin d'améliorer votre expérience sur notre site.</p>
        </section>
        <section className="mb-6">
          <Title level={2}>Utilisation des données</Title>
          <p>Vos données personnelles sont utilisées uniquement dans une démarche de qualité</p>
        </section>
        <section className="mb-6">
          <Title level={2}>Partage des données</Title>
          <p>Aucune donnée personnelle n’est vendue ni transmise.</p>
        </section>
        <section className="mb-6">
          <Title level={2}>Conservation des données</Title>
          <p>Vos données sont conservées pendant la durée nécessaire.</p>
        </section>
        <section>
          <Title level={2}>Vos droits</Title>
          <p>
            Vous disposez d’un droit d’accès ou d’opposition. Pour vous y opposer, vous pouvez nous en faire part à l'adresse mail suivante : 
            <LinkText link="contact@ecoride.com" />
          </p>
        </section>
      </MainContainer>
      <Footer />
    </PageWrapper>
  );
}
