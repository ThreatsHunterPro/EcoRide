import React, { useState, useEffect } from "react";
import Header from "../../Layouts/Header";
import Footer from "../../Layouts/Footer";
import MainContainer from "../../Layouts/MainContainer";
import PageWrapper from "../../Shared/PageWrapper";
import Title from "../../Shared/Title";
import Button from "../../Shared/Button";

export default function AccountPage() {
  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    address: "",
    birth_date: ""
  });
  const [carData, setCarData] = useState({
    model: "", 
    immatriculation: "", 
    energy_type: "", 
    color: "", 
    brand_id: ""
  });
  const [preferences, setPreferences] = useState({
    fumeur: false,
    animaux: false
  });
  const [brands, setBrands] = useState([]);

  useEffect(() => {

    const fetchBrands = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/brands`, {
          method: 'GET',
          headers: { 
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) throw new Error("Erreur lors de la récupération des marques");

        const data = await response.json();
        console.log("Marques reçues :", data);
        setBrands(data || []);
        
      } catch (err) {
        console.error("Erreur chargement marques :", err);
      }
    };
    fetchBrands();

    const fetchUserData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/account`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        
        const data = await response.json();

        setUserData(data);
        if (data.cars && data.cars.length > 0) {
          setCarData(data.cars[0]); // On prend la première voiture du tableau
        } else {
          setCarData({ model: "", immatriculation: "", energy_type: "", color: "", brand_id: "" });
        }
        if (data.configurations) {
            const isFumeur = data.configurations.find(c => c.property === 'fumeur')?.value === 'true';
            const isAnimaux = data.configurations.find(c => c.property === 'animaux')?.value === 'true';
            setPreferences({ fumeur: isFumeur, animaux: isAnimaux });
        }
      } catch (err) {
        console.error("Erreur chargement profil :", err);
      }
    };
    fetchUserData();
    
  }, []);

  const handleSave = async () => {
    const payload = {
      user: userData,
      car: {
        ...carData,
        brand_id: parseInt(carData.brand_id) || null // Transforme en nombre
      },
      preferences: preferences
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/account`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` 
        },
        body: JSON.stringify(payload)
      });
      
      if (response.ok) {
        alert("Profil et véhicule mis à jour avec succès !");
      } else {
        const errorData = await response.json();
        alert("Erreur : " + errorData.error);
      }
    } catch (err) {
      console.error("Erreur mise à jour :", err);
    }
  };

  return (
    <PageWrapper>
      <Header />
      <MainContainer>
        <div className="max-w-3xl mx-auto py-12 px-6">
          <div className="mb-12">
            <Title toCenter={true}>
              Mon compte
              <p className="text-gray-500 font-normal text-center text-sm mt-4">Gérez votre profil et vos préférences de covoiturage.</p>
            </Title>
          </div>

          {/* Section 1 : Infos Perso */}
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold text-[#1a5c2a] mb-8">Informations personnelles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField label="Prénom" value={userData.firstname} onChange={(e) => setUserData({...userData, firstname: e.target.value})} />
              <FormField label="Nom" value={userData.lastname} onChange={(e) => setUserData({...userData, lastname: e.target.value})} />
              <FormField label="Email" value={userData.email} onChange={(e) => setUserData({...userData, email: e.target.value})} />
              <FormField label="Téléphone" value={userData.phone} onChange={(e) => setUserData({...userData, phone: e.target.value})} />
              <FormField label="Adresse" value={userData.address} onChange={(e) => setUserData({...userData, address: e.target.value})} />
              <FormField label="Date de naissance" type="date" value={userData.birth_date} onChange={(e) => setUserData({...userData, birth_date: e.target.value})} />
            </div>
          </div>

          {/* Section 2 : Infos Véhicule */}
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm mt-8">
            <h2 className="text-xl font-bold text-[#1a5c2a] mb-8">Informations du véhicule</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <FormField label="Plaque d'immatriculation" value={carData.immatriculation} onChange={(e) => setCarData({...carData, immatriculation: e.target.value})} />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Marque</label>
                <select 
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm bg-gray-50/50"
                  value={carData.brand_id} 
                  onChange={(e) => setCarData({...carData, brand_id: parseInt(e.target.value)})}
                >
                  <option value="">Sélectionnez une marque</option>
                  {brands.map((brand) => (
                    <option key={brand.brand_id} value={brand.brand_id}>
                      {brand.label}
                    </option>
                  ))}
                </select>
              </div>
              <FormField label="Modèle" value={carData.model} onChange={(e) => setCarData({...carData, model: e.target.value})} />
              <FormField label="Couleur" value={carData.color} onChange={(e) => setCarData({...carData, color: e.target.value})} />
              <FormField label="Type d'énergie" value={carData.energy_type} onChange={(e) => setCarData({...carData, energy_type: e.target.value})} />
            </div>

            <div className="mt-8">
              <h4 className="text-sm font-bold text-gray-700 mb-3">Préférences</h4>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="accent-[#1a5c2a]" checked={preferences.fumeur} onChange={(e) => setPreferences({...preferences, fumeur: e.target.checked})} />
                  <span className="text-sm text-gray-600">Fumeur autorisé</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="accent-[#1a5c2a]" checked={preferences.animaux} onChange={(e) => setPreferences({...preferences, animaux: e.target.checked})} />
                  <span className="text-sm text-gray-600">Animaux autorisés</span>
                </label>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <Button label="Appliquer mes modifications" onClick={handleSave} fullWidth={true} centered={true} />
          </div>
        </div>
      </MainContainer>
      <Footer />
    </PageWrapper>
  );
}

function FormField({ label, ...props }) {
  return (
    <div>
      <label className="block text-xs font-bold text-gray-500 uppercase mb-2">{label}</label>
      <input {...props} className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#1a8a3c] focus:ring-1 focus:ring-[#1a8a3c] transition-all bg-gray-50/50 focus:bg-white" />
    </div>
  );
}