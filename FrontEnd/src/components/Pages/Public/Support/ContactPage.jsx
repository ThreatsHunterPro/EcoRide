import Header from "../../../Layouts/Header";
import Footer from "../../../Layouts/Footer";
import MainContainer from "../../../Layouts/MainContainer";
import PageWrapper from "../../../Shared/PageWrapper";
import Title from "../../../Shared/Title";
import Button from "../../../Shared/Button";
import LinkText from "../../../Shared/LinkText";
import ListItem from "../../../Shared/ListItem";

export default function ContactPage() {
  return (
    <PageWrapper>
      <Header />
      <MainContainer>
        <div className="p-6 md:p-10">
          
          <div className="mb-10 text-center border-b border-gray-200 pb-6">
            <Title toCenter={true}>Contact</Title>
            <p className="text-sm text-gray-500 mt-2">
              Une question ou une suggestion ? Notre équipe vous répond sous 24h.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            
            <div className="bg-green-50 p-6 rounded-xl border space-y-6">
              
              <div className="border-b border-green-500 w-4/5 pb-2">
                <Title level={2}>Nos coordonnées</Title>
              </div>
              
              <ul className="space-y-4 text-sm">
                <ListItem label="Email">
                  <LinkText link="contact@ecoride.com" />
                </ListItem>
                
                <ListItem label="Téléphone">
                  <span className="text-gray-700 font-medium">+33 6 12 34 56 78</span>
                </ListItem>
                
                <ListItem label="Adresse">
                  <span className="text-gray-600 leading-relaxed">
                    123 Rue de l’Imaginaire, 34000 Montpellier, France
                  </span>
                </ListItem>
              </ul>
            </div>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Nom</label>
                <input 
                  type="text" 
                  placeholder="Votre nom" 
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#1a8a3c] focus:ring-1 focus:ring-[#1a8a3c] transition-all bg-gray-50/50 focus:bg-white" 
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Email</label>
                <input 
                  type="email" 
                  placeholder="votre@email.com" 
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#1a8a3c] focus:ring-1 focus:ring-[#1a8a3c] transition-all bg-gray-50/50 focus:bg-white" 
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Votre message</label>
                <textarea 
                  placeholder="Comment pouvons-nous vous aider ?" 
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#1a8a3c] focus:ring-1 focus:ring-[#1a8a3c] transition-all bg-gray-50/50 focus:bg-white resize-none" 
                  rows={4} 
                />
              </div>

              <div className="pt-2 flex justify-end">
                <Button
                  label="Envoyer le message"
                  variant="default"
                  className="px-6 py-2.5 rounded-lg text-sm font-semibold shadow-sm transition-all"
                  onClick={() => {
                    // TODO
                  }}
                />
              </div>
            </form>

          </div>
        </div>
      </MainContainer>
      <Footer />
    </PageWrapper>
  );
}