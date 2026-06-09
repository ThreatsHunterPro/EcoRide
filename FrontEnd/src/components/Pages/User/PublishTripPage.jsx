import React, { useState } from 'react';
import Header from "../../Layouts/Header";
import Footer from "../../Layouts/Footer";

const getTomorrowLocalDate = () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const yyyy = tomorrow.getFullYear();
  const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
  const dd = String(tomorrow.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

const getLocalCurrentTime = () => {
  const now = new Date();
  const hh = String(now.getHours()).padStart(2, '0');
  const mm = String(now.getMinutes()).padStart(2, '0');
  return `${hh}:${mm}`;
};

const ProgressBar = ({ currentStep }) => {
  const steps = ['Trajet', 'Véhicule', 'Tarif'];
  return (
    <div className="relative flex justify-between items-start w-3/4 md:w-2/3 mx-auto mb-10 mt-6">
      <div className="absolute top-5 left-0 w-full h-[3px] bg-gray-200 z-0 -translate-y-1/2" />
      <div 
        className="absolute top-5 left-0 h-[3px] bg-[#1a8a3c] z-0 transition-all duration-500 -translate-y-1/2" 
        style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
      />
      {steps.map((label, index) => {
        const stepNumber = index + 1;
        const isActive = currentStep >= stepNumber;
        return (
          <div key={label} className="flex flex-col items-center relative z-10">
            <div className={`
              w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300
              ${isActive ? 'bg-[#1a8a3c] text-white shadow-md' : 'bg-white border-2 border-gray-300 text-gray-400'}
            `}>
              {stepNumber}
            </div>
            <span className={`mt-2 text-[12px] font-medium absolute top-10 w-20 text-center ${isActive ? 'text-[#1a8a3c]' : 'text-gray-400'}`}>
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default function PublishRidePage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    departure_location: 'Toulouse',
    arrival_location: 'Paris',
    departure_date: getTomorrowLocalDate(),
    departure_time: getLocalCurrentTime(), // Format "HH:mm" initial
    available_seats: 3,
    brand: '',
    model: '',
    energy_type: 'electrique',
    price: 15
  });

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Gestionnaire pour formater et valider le format 24h (HH:mm)
  const handleTimeInput = (e) => {
    let val = e.target.value.replace(/[^0-9]/g, ''); // Uniquement les chiffres
    if (val.length > 4) val = val.slice(0, 4);

    let hours = val.slice(0, 2);
    let minutes = val.slice(2, 4);

    // Validation stricte 24h
    if (hours && parseInt(hours) > 23) hours = '23';
    if (minutes && parseInt(minutes) > 59) minutes = '59';

    let formatted = hours;
    if (val.length > 2) {
      formatted += ':' + minutes;
    }
    
    updateField('departure_time', formatted);
  };

  return (
    <div className="w-full min-h-screen flex flex-col bg-[#f3faf5]">
      <Header />
      <main className="flex-grow p-4 md:py-6">
        <div className="max-w-[680px] mx-auto">
          
          <div className="mb-8">
            <h2 className="text-[22px] font-semibold text-[#1a5c2a]">Publier un trajet</h2>
            <p className="text-[14px] text-gray-600">Renseignez les informations de votre covoiturage</p>
          </div>

          <ProgressBar currentStep={step} />

          <div className="bg-white rounded-[20px] border border-[#e0e0e0] p-6 shadow-sm">
            
            {/* ÉTAPE 1 : TRAJET */}
            {step === 1 && (
              <div className="space-y-4">
                <h3 className="font-medium text-[#1a5c2a] mb-4">Détails du trajet</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[12px] text-gray-600 font-medium mb-1 block">Ville de départ</label>
                    <input className="w-full border rounded-xl p-3 text-[14px]" value={formData.departure_location} onChange={(e) => updateField('departure_location', e.target.value)} />
                  </div>
                  <div>
                    <label className="text-[12px] text-gray-600 font-medium mb-1 block">Ville d'arrivée</label>
                    <input className="w-full border rounded-xl p-3 text-[14px]" value={formData.arrival_location} onChange={(e) => updateField('arrival_location', e.target.value)} />
                  </div>
                  <div>
                    <label className="text-[12px] text-gray-600 font-medium mb-1 block">Date de départ</label>
                    <input type="date" className="w-full border rounded-xl p-3 text-[14px]" value={formData.departure_date} onChange={(e) => updateField('departure_date', e.target.value)} />
                  </div>
                  <div>
                    <label className="text-[12px] text-gray-600 font-medium mb-1 block">Heure de départ</label>
                    <input 
                      type="text" 
                      inputMode="numeric"
                      placeholder="Ex: 14:30"
                      className="w-full border rounded-xl p-3 text-[14px] outline-none focus:border-[#1a8a3c]" 
                      value={formData.departure_time} 
                      onChange={handleTimeInput} 
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ÉTAPE 2 : VÉHICULE */}
            {step === 2 && (
              <div className="space-y-4">
                <h3 className="font-medium text-[#1a5c2a] mb-4">Votre véhicule</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[12px] text-gray-600 font-medium mb-1 block">Marque</label>
                    <input className="w-full border rounded-xl p-3 text-[14px]" placeholder="Ex: Tesla" value={formData.brand} onChange={(e) => updateField('brand', e.target.value)} />
                  </div>
                  <div>
                    <label className="text-[12px] text-gray-600 font-medium mb-1 block">Modèle</label>
                    <input className="w-full border rounded-xl p-3 text-[14px]" placeholder="Ex: Model 3" value={formData.model} onChange={(e) => updateField('model', e.target.value)} />
                  </div>
                  <div>
                    <label className="text-[12px] text-gray-600 font-medium mb-1 block">Énergie</label>
                    <select className="w-full border rounded-xl p-3 text-[14px]" value={formData.energy_type} onChange={(e) => updateField('energy_type', e.target.value)}>
                      <option value="electrique">Électrique</option>
                      <option value="hybride">Hybride</option>
                      <option value="thermique">Thermique</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[12px] text-gray-600 font-medium mb-1 block">Places disponibles</label>
                    <input type="number" min="1" className="w-full border rounded-xl p-3 text-[14px]" value={formData.available_seats} onChange={(e) => updateField('available_seats', Math.max(1, parseInt(e.target.value) || 3))} />
                  </div>
                </div>

                {formData.energy_type === 'electrique' && (
                  <div className="bg-[#e6f5ec] rounded-xl p-4 flex items-center gap-4 mt-4 border border-[#c1e6cf]">
                    <span className="text-[20px]">🌱</span>
                    <div>
                      <div className="text-[13px] font-semibold text-[#1a5c2a]">Véhicule électrique détecté</div>
                      <div className="text-[11px] text-[#2e7d50]">Éco+ : Trajet bas carbone activé !</div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ÉTAPE 3 : TARIF + RÉCAPITULATIF */}
            {step === 3 && (
              <div className="space-y-8">
                <h3 className="font-medium text-[#1a5c2a]">Récapitulatif et Tarif</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                  <div className="bg-gray-50 p-6 rounded-2xl text-[14px] space-y-4 border border-gray-100">
                    <div className="flex justify-between border-b border-gray-200 pb-3">
                      <span className="text-gray-500">Trajet :</span>
                      <span className="font-semibold text-[#1a5c2a]">{formData.departure_location} → {formData.arrival_location}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-200 pb-3">
                      <span className="text-gray-500">Date :</span>
                      <span className="font-medium">
                        {formData.departure_date ? new Date(formData.departure_date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Non défini'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Passagers :</span>
                      <span className="font-medium">{formData.available_seats} places à {formData.departure_time || '--:--'}</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-[13px] text-gray-600 font-medium">Prix par passager (€)</label>
                    <div className="relative group">
                      <input 
                        type="text" 
                        inputMode="decimal"
                        className="w-full bg-white border-2 border-gray-200 rounded-2xl p-6 text-4xl font-bold text-center outline-none focus:border-[#1a8a3c] transition-all placeholder:text-gray-200" 
                        placeholder="0" 
                        value={formData.price}
                        onChange={(e) => {
                          const val = e.target.value.replace(/[^0-9]/g, '');
                          updateField('price', val);
                        }} 
                      />
                      <span className="absolute right-8 top-1/2 -translate-y-1/2 text-2xl font-bold text-gray-400">€</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-8 flex justify-between">
              {step > 1 ? <button onClick={() => setStep(step - 1)} className="text-gray-500 font-medium hover:text-[#1a8a3c]">Retour</button> : <div></div>}
              <button onClick={() => step < 3 ? setStep(step + 1) : alert('Trajet publié !')} className="bg-[#1a8a3c] text-white rounded-full px-8 py-3 text-[15px] font-medium hover:bg-[#157032]">
                {step === 3 ? "Publier le trajet" : "Suivant →"}
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}