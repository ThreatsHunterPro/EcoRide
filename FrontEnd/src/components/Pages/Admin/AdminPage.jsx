import Header from "../../Layouts/Header";
import MainContainer from "../../Layouts/MainContainer";
import UsersSection from "../../Sections/UsersSection";
import Footer from "../../Layouts/Footer";

export default function AdminPage() {
  
  return (
    <div className="w-full min-h-screen flex flex-col">
      <Header/>
      <main className="flex-grow">
        <MainContainer>
          <UsersSection />
        </MainContainer>
      </main>
      <Footer/>
    </div>
  );
}