import React, { useState } from "react";

export default function EmployeeDashboard() {
  // Gestion de l'onglet actif : 'overview' | 'reviews' | 'incidents'
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-[#f3faf5] flex flex-col font-sans">
      
      {/* NAVBAR SUPÉRIEURE */}
      <nav className="flex items-center justify-between px-5 py-3 bg-[#1a5c2a] text-white shadow-sm z-10">
        <div className="flex items-center gap-2 font-semibold text-[15px]">
          <i className="ti ti-shield text-lg"></i> Espace Employé — EcoRide
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#2bb55a] flex items-center justify-center text-xs font-bold text-white shadow-sm">
            EP
          </div>
          <span className="text-[13px] text-[#c8e6d0] font-medium hidden sm:block">Espace Modérateur</span>
        </div>
      </nav>

      {/* CONTENEUR PRINCIPAL */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* SIDEBAR GAUCHE - NAVIGATION PAR ONGLETS */}
        <aside className="w-[200px] md:w-[240px] bg-[#1a5c2a] shrink-0 py-4 flex flex-col overflow-y-auto">
          <button 
            onClick={() => setActiveTab("overview")}
            className={`flex items-center gap-3 px-5 py-3 text-[13px] font-medium transition-colors text-left w-full ${
              activeTab === "overview" 
                ? "bg-[#1a8a3c] text-white border-l-[3px] border-[#5fd98a]" 
                : "text-[#c8e6d0] hover:bg-[#1a8a3c]/40 border-l-[3px] border-transparent"
            }`}
          >
            <i className="ti ti-dashboard text-lg"></i> Vue d'ensemble
          </button>

          <button 
            onClick={() => setActiveTab("reviews")}
            className={`flex items-center gap-3 px-5 py-3 text-[13px] font-medium transition-colors text-left w-full ${
              activeTab === "reviews" 
                ? "bg-[#1a8a3c] text-white border-l-[3px] border-[#5fd98a]" 
                : "text-[#c8e6d0] hover:bg-[#1a8a3c]/40 border-l-[3px] border-transparent"
            }`}
          >
            <i className="ti ti-messages text-lg"></i> Modération Avis
            <span className="ml-auto bg-amber-500 text-white font-bold text-[10px] px-1.5 py-0.5 rounded-full">2</span>
          </button>

          <button 
            onClick={() => setActiveTab("incidents")}
            className={`flex items-center gap-3 px-5 py-3 text-[13px] font-medium transition-colors text-left w-full ${
              activeTab === "incidents" 
                ? "bg-[#1a8a3c] text-white border-l-[3px] border-[#5fd98a]" 
                : "text-[#c8e6d0] hover:bg-[#1a8a3c]/40 border-l-[3px] border-transparent"
            }`}
          >
            <i className="ti ti-alert-triangle text-lg"></i> Litiges & Incidents
            <span className="ml-auto bg-red-500 text-white font-bold text-[10px] px-1.5 py-0.5 rounded-full">2</span>
          </button>
        </aside>

        {/* CONTENU DYNAMIQUE (Selon l'onglet actif) */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          
          {/* ========================================== */}
          {/* 1. ONGLET : VUE D'ENSEMBLE                 */}
          {/* ========================================== */}
          {activeTab === "overview" && (
            <div className="space-y-8 animate-fadeIn">
              <div>
                <h2 className="text-[20px] font-bold text-[#1a5c2a] mb-1">Bonjour, équipe Support</h2>
                <div className="text-[13px] text-gray-500">Voici le résumé de l'activité nécessitant vos actions de modération.</div>
              </div>

              {/* Cartes Compteurs KPI */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center text-amber-600"><i className="ti ti-messages text-xl"></i></div>
                  <div>
                    <div className="text-xs text-gray-400 font-medium uppercase tracking-wider">Avis en attente</div>
                    <div className="text-2xl font-bold text-gray-800">12</div>
                  </div>
                </div>
                <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-red-600"><i className="ti ti-alert-triangle text-xl"></i></div>
                  <div>
                    <div className="text-xs text-gray-400 font-medium uppercase tracking-wider">Litiges critiques</div>
                    <div className="text-2xl font-bold text-gray-800">2</div>
                  </div>
                </div>
                <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4 sm:col-span-2 lg:col-span-1">
                  <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-green-600"><i className="ti ti-circle-check text-xl"></i></div>
                  <div>
                    <div className="text-xs text-gray-400 font-medium uppercase tracking-wider">Traités aujourd'hui</div>
                    <div className="text-2xl font-bold text-gray-800">47</div>
                  </div>
                </div>
              </div>

              {/* Grille des Previews rapides */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Preview Avis */}
                <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-sm font-bold text-[#1a5c2a]">Avis récent à modérer</h3>
                      <button onClick={() => setActiveTab("reviews")} className="text-xs text-[#1a8a3c] font-bold hover:underline">Voir tous les avis</button>
                    </div>
                    <p className="text-xs text-gray-600 bg-gray-50 p-3 rounded-lg border border-gray-100 italic">
                      "Super voyage avec Jean ! Très ponctuel, conduite douce et voiture électrique propre..."
                    </p>
                  </div>
                  <div className="mt-4 flex justify-end gap-2">
                    <button className="text-[11px] font-bold text-red-600 px-3 py-1.5 border border-red-200 rounded-md hover:bg-red-50">Refuser</button>
                    <button className="text-[11px] font-bold text-white bg-[#1a8a3c] px-3 py-1.5 rounded-md hover:bg-[#146e30]">Valider</button>
                  </div>
                </div>

                {/* Preview Incidents */}
                <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-sm font-bold text-red-800">Dernier incident signalé</h3>
                      <button onClick={() => setActiveTab("incidents")} className="text-xs text-red-600 font-bold hover:underline">Ouvrir les détails</button>
                    </div>
                    <div className="text-xs text-gray-700 space-y-1">
                      <div><span className="font-semibold">Trajet :</span> #CR-2026-904</div>
                      <div><span className="font-semibold">Par :</span> @AlexDriver ↔ @Emma_R</div>
                      <div className="text-gray-400 truncate mt-1">Incident signalé durant le parcours de Toulouse vers Bordeaux...</div>
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-gray-100 text-[11px] text-gray-400 flex items-center gap-1">
                    <i className="ti ti-clock"></i> Reçu il y a 22 minutes
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================== */}
          {/* 2. ONGLET : MODÉRATION COMPLETE            */}
          {/* ========================================== */}
          {activeTab === "reviews" && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h2 className="text-[18px] font-bold text-[#1a5c2a] mb-1">Flux complet de Modération des Avis</h2>
                <div className="text-[12px] text-gray-500">Conformément à l'US 12, les avis sur les chauffeurs doivent être approuvés ici avant publication.</div>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                <ReviewCard passenger="Alice Dubois" driver="Jean M." rating={4} date="08/06/2026" comment="Super voyage avec Jean ! Très ponctuel, conduite douce et voiture électrique très propre. Je recommande vivement pour vos futurs trajets." />
                <ReviewCard passenger="Marc Lemaire" driver="Thomas B." rating={2} date="07/06/2026" comment="Le chauffeur est arrivé avec 20 minutes de retard sans prévenir. La conduite était un peu trop nerveuse sur l'autoroute à mon goût..." />
              </div>
            </div>
          )}

          {/* ========================================== */}
          {/* 3. ONGLET : LOG DU COMPTE INCIDENTS (100%) */}
          {/* ========================================== */}
          {activeTab === "incidents" && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h2 className="text-[18px] font-bold text-red-800 mb-1">Registre d'incidents & signalements de trajets</h2>
                <div className="text-[12px] text-gray-500">Détails exhaustifs requis par l'US 12 pour le traitement des réclamations.</div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-x-auto">
                <div className="min-w-[950px]">
                  {/* Table Head */}
                  <div className="grid grid-cols-[100px_1.8fr_1.8fr_2.5fr] gap-4 p-4 bg-[#f3faf5] border-b border-gray-200 text-[11px] font-bold text-[#1a5c2a] uppercase tracking-wider">
                    <span>Numéro</span>
                    <span>Conducteur (Pseudo/Mail)</span>
                    <span>Passager (Pseudo/Mail)</span>
                    <span>Descriptif complet du trajet (Dates & Lieux)</span>
                  </div>

                  {/* Table Body */}
                  <div className="flex flex-col divide-y divide-gray-100">
                    <IncidentRow 
                      id="#CR-2026-904"
                      driverPseudo="AlexDriver" driverMail="alex.pro@mail.com"
                      passengerPseudo="Emma_R" passengerMail="emma.richard@gmail.com"
                      departurePlace="Gare de Toulouse Matabiau" departureTime="08/06/2026 à 08h00"
                      arrivalPlace="Place du Capitole, Bordeaux" arrivalTime="08/06/2026 à 10h30"
                    />
                    <IncidentRow 
                      id="#CR-2026-881"
                      driverPseudo="NicoVroum" driverMail="nicolas.b@ecoride.fr"
                      passengerPseudo="Lucas_Sky" passengerMail="lucas.bernard@outlook.fr"
                      departurePlace="Lyon Perrache, France" departureTime="06/06/2026 à 14h15"
                      arrivalPlace="Vieux Port, Marseille" arrivalTime="06/06/2026 à 17h45"
                      isLast
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}

/* ====================================================================
   SOUS-COMPOSANTS INTERNES
   ==================================================================== */

function ReviewCard({ passenger, driver, rating, date, comment }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 flex flex-col justify-between shadow-sm hover:shadow-md transition-all">
      <div>
        <div className="flex justify-between items-start gap-2 mb-3">
          <div>
            <div className="text-[13px] font-bold text-gray-800">De : {passenger}</div>
            <div className="text-[11px] text-[#1a8a3c] font-medium mt-0.5">Cible : {driver} (Chauffeur)</div>
          </div>
          <span className="text-[11px] text-gray-400">{date}</span>
        </div>
        <div className="flex gap-0.5 text-amber-500 mb-3 text-sm">
          {[...Array(5)].map((_, i) => (
            <i key={i} className={`ti ${i < rating ? "ti-star-filled" : "ti-star"}`}></i>
          ))}
        </div>
        <p className="text-[12.5px] text-gray-600 bg-gray-50/50 p-3 rounded-lg border border-gray-100 italic leading-relaxed">
          "{comment}"
        </p>
      </div>
      <div className="flex items-center justify-end gap-3 pt-4 mt-2 border-t border-gray-100">
        <button className="text-[11px] font-bold text-red-600 hover:bg-red-50 border border-red-200 rounded-lg px-4 py-1.5 transition-colors">
          Refuser l'avis
        </button>
        <button className="text-[11px] font-bold text-white bg-[#1a8a3c] hover:bg-[#146e30] rounded-lg px-4 py-1.5 shadow-sm transition-colors">
          Valider l'avis
        </button>
      </div>
    </div>
  );
}

function IncidentRow({ id, driverPseudo, driverMail, passengerPseudo, passengerMail, departurePlace, departureTime, arrivalPlace, arrivalTime, isLast }) {
  return (
    <div className={`grid grid-cols-[100px_1.8fr_1.8fr_2.5fr] gap-4 p-4 items-center text-[13px] bg-white hover:bg-red-50/10 transition-colors ${!isLast ? "border-b border-gray-100" : ""}`}>
      <span className="font-mono font-bold text-gray-400">{id}</span>
      
      <div className="flex flex-col gap-0.5">
        <span className="font-bold text-gray-800">@{driverPseudo}</span>
        <span className="text-[11.5px] text-gray-500">{driverMail}</span>
      </div>
      
      <div className="flex flex-col gap-0.5">
        <span className="font-bold text-gray-800">@{passengerPseudo}</span>
        <span className="text-[11.5px] text-gray-500">{passengerMail}</span>
      </div>
      
      <div className="bg-gray-50 border border-gray-200/60 rounded-lg p-2.5 space-y-1.5 text-[12px]">
        <div className="flex items-start gap-1.5">
          <i className="ti ti-circle-dot text-green-600 mt-0.5 text-xs"></i>
          <div>
            <span className="font-semibold text-gray-700">Départ :</span> {departurePlace} 
            <span className="text-gray-400 block font-medium">({departureTime})</span>
          </div>
        </div>
        <div className="flex items-start gap-1.5 border-t border-gray-200/50 pt-1.5">
          <i className="ti ti-map-pin-filled text-red-600 mt-0.5 text-xs"></i>
          <div>
            <span className="font-semibold text-gray-700">Arrivée :</span> {arrivalPlace} 
            <span className="text-gray-400 block font-medium">({arrivalTime})</span>
          </div>
        </div>
      </div>
    </div>
  );
}