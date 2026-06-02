import Header from "../../../Layouts/Header";
import Footer from "../../../Layouts/Footer";
import MainContainer from "../../../Layouts/MainContainer";
import PageWrapper from "../../../Shared/PageWrapper";
import Title from "../../../Shared/Title";
import Button from "../../../Shared/Button";
import LinkText from "../../../Shared/LinkText";
import ListItem from "../../../Shared/ListItem";

export default function Contact() {
  return (
    <PageWrapper>
      <Header />
      <MainContainer>
        <Title toCenter={true}>Contact</Title>
        <section className="text-gray-800 space-y-4">
          <p>Vous pouvez nous contacter via les moyens suivants :</p>
          <ul className="space-y-2">
            <ListItem label="Email">
              <LinkText link= "contact@ecoride.com"/>
            </ListItem>
            <ListItem label="Téléphone">
              +33 6 12 34 56 78
            </ListItem>
            <ListItem label="Adresse">
              123 Rue de l’Imaginaire, 34000 Montpellier, France
            </ListItem>
          </ul>
          <form className="space-y-4 max-w-lg">
            <input type="text" placeholder="Nom" className="w-full border border-gray-300 rounded-lg px-4 py-2" />
            <input type="email" placeholder="Email" className="w-full border border-gray-300 rounded-lg px-4 py-2" />
            <textarea placeholder="Votre message" className="w-full border border-gray-300 rounded-lg px-4 py-2" rows={5} />
            <Button
              label="Envoyer"
              variant="default"
              className="px-6 py-2 rounded-lg"
              onClick={() => { //TODO
              }}
            />
          </form>
        </section>
      </MainContainer>
      <Footer />
    </PageWrapper>
  );
}
