import React from "react";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-[#f3faf5] flex flex-col font-sans">
      
      {/* NAVBAR SUPÉRIEURE */}
      <nav className="flex items-center justify-between px-5 py-3 bg-[#1a5c2a] text-white shadow-sm z-10">
        <div className="flex items-center gap-2 font-semibold text-[15px]">
          <i className="ti ti-shield-lock text-lg"></i> Espace Administrateur
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#2bb55a] flex items-center justify-center text-xs font-bold text-white shadow-sm">
              AD
            </div>
            <span className="text-[13px] text-[#c8e6d0] font-medium hidden sm:block">Super Admin</span>
          </div>
        </div>
      </nav>

      {/* CONTENEUR PRINCIPAL */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* SIDEBAR GAUCHE (Épurée pour l'US 13) */}
        <aside className="w-[180px] md:w-[220px] bg-[#1a5c2a] shrink-0 py-4 flex flex-col overflow-y-auto">
          <SidebarItem icon="ti-dashboard" label="Tableau de bord" active />
          <SidebarItem icon="ti-users" label="Gestion des comptes" />
          <SidebarItem icon="ti-route" label="Covoiturages" />
          <SidebarItem icon="ti-coin" label="Crédits & Finance" />
        </aside>

        {/* CONTENU CENTRAL */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          
          {/* En-tête + Bouton Création Employé (Requis par l'US 13) */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-[20px] font-bold text-[#1a5c2a] mb-1">Vue d'ensemble</h2>
              <div className="text-[13px] text-gray-500">Statistiques et modération de la plateforme</div>
            </div>
            
            {/* ACTION : Concevoir les comptes employés */}
            <button className="bg-[#1a8a3c] hover:bg-[#146e30] text-white rounded-lg px-5 py-2.5 text-[13px] font-bold shadow-sm transition-colors flex items-center gap-2 w-fit">
              <i className="ti ti-user-plus text-lg"></i>
              Créer un compte Employé
            </button>
          </div>

          {/* Kpis / Total Crédits (Requis par l'US 13) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <StatCard 
              icon="ti-coin" 
              label="Total des crédits gagnés par la plateforme" 
              value="142 500" 
              color="text-[#b07a00]" 
              bgIcon="bg-[#fff8e6]"
            />
            <StatCard 
              icon="ti-route" 
              label="Total des covoiturages réalisés" 
              value="8 430" 
              color="text-[#1a8a3c]" 
              bgIcon="bg-[#e6f5ec]"
            />
          </div>

          {/* Graphiques (Requis par l'US 13) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            
            {/* Graphique 1 : Covoiturages par jour */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <div className="text-[14px] font-bold text-[#1a5c2a] mb-6">Covoiturages par jour (Cette semaine)</div>
              <div className="flex items-end gap-2 h-[140px] pb-1">
                <Bar height="40%" label="Lun" value="120" color="bg-[#1a8a3c]" />
                <Bar height="60%" label="Mar" value="180" color="bg-[#1a8a3c]" />
                <Bar height="50%" label="Mer" value="150" color="bg-[#1a8a3c]" />
                <Bar height="75%" label="Jeu" value="225" color="bg-[#1a8a3c]" />
                <Bar height="95%" label="Ven" value="285" color="bg-[#5fd98a]" active />
                <Bar height="80%" label="Sam" value="240" color="bg-[#1a8a3c]" />
                <Bar height="45%" label="Dim" value="135" color="bg-[#1a8a3c]" />
              </div>
            </div>

            {/* Graphique 2 : Crédits par jour */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <div className="text-[14px] font-bold text-[#1a5c2a] mb-6">Crédits gagnés par jour (Cette semaine)</div>
              <div className="flex items-end gap-2 h-[140px] pb-1">
                <Bar height="30%" label="Lun" value="450" color="bg-[#b07a00]" />
                <Bar height="55%" label="Mar" value="825" color="bg-[#b07a00]" />
                <Bar height="45%" label="Mer" value="675" color="bg-[#b07a00]" />
                <Bar height="80%" label="Jeu" value="1200" color="bg-[#b07a00]" />
                <Bar height="100%" label="Ven" value="1500" color="bg-[#d49a15]" active />
                <Bar height="85%" label="Sam" value="1275" color="bg-[#b07a00]" />
                <Bar height="40%" label="Dim" value="600" color="bg-[#b07a00]" />
              </div>
            </div>

          </div>

          {/* Modération : Suspension de comptes (Requis par l'US 13) */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm overflow-x-auto">
            <div className="flex justify-between items-center mb-6 min-w-[700px]">
              <div>
                <div className="text-[14px] font-bold text-[#1a5c2a]">Modération des comptes</div>
                <div className="text-[12px] text-gray-500 mt-1">Suspendre des utilisateurs ou des employés</div>
              </div>
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button className="bg-white shadow-sm rounded-md px-4 py-1.5 text-[12px] font-bold text-gray-800">Tous</button>
                <button className="px-4 py-1.5 text-[12px] font-medium text-gray-500 hover:text-gray-800">Employés</button>
                <button className="px-4 py-1.5 text-[12px] font-medium text-gray-500 hover:text-gray-800">Utilisateurs</button>
              </div>
            </div>
            
            <div className="min-w-[700px]">
              {/* En-tête du tableau */}
              <div className="grid grid-cols-[2fr_1.5fr_1fr_1fr_100px] gap-4 p-3 bg-[#f3faf5] rounded-lg text-[11px] font-bold text-[#1a5c2a] uppercase tracking-wider mb-2">
                <span>Identité</span>
                <span>Email</span>
                <span>Rôle</span>
                <span>Statut</span>
                <span className="text-right">Action</span>
              </div>
              
              {/* Lignes de comptes */}
              <div className="flex flex-col">
                <AccountRow name="José M." email="jose@ecoride.com" role="Employé" status="Actif" />
                <AccountRow name="Alice Dubois" email="alice.d@mail.com" role="Utilisateur" status="Actif" />
                <AccountRow name="Marc Lemaire" email="marc.l@mail.com" role="Utilisateur" status="Actif" />
                <AccountRow name="Sarah K." email="sarah.k@ecoride.com" role="Employé" status="Suspendu" isLast />
              </div>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}

/* ====================================================================
   SOUS-COMPOSANTS
   ==================================================================== */

function SidebarItem({ icon, label, active }) {
  return (
    <div className={`flex items-center gap-3 px-5 py-3 text-[13px] font-medium cursor-pointer transition-colors ${
      active 
        ? "bg-[#1a8a3c] text-white border-l-[3px] border-[#5fd98a]" 
        : "text-[#c8e6d0] hover:bg-[#1a8a3c]/40 border-l-[3px] border-transparent"
    }`}>
      <i className={`ti ${icon} text-lg`}></i>
      {label}
    </div>
  );
}

function StatCard({ icon, label, value, color, bgIcon }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 flex items-center gap-5 shadow-sm hover:shadow-md transition-shadow">
      <div className={`w-14 h-14 rounded-full ${bgIcon} flex items-center justify-center shrink-0`}>
        <i className={`ti ${icon} ${color} text-[28px]`}></i>
      </div>
      <div>
        <div className="text-[13px] text-gray-500 font-medium mb-1">{label}</div>
        <div className={`text-[32px] font-bold leading-none ${color}`}>{value}</div>
      </div>
    </div>
  );
}

function Bar({ height, label, value, color, active }) {
  return (
    <div className="flex flex-col items-center gap-2 flex-1 h-full justify-end group cursor-pointer">
      {/* Tooltip au survol */}
      <span className="text-[11px] font-bold text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity">
        {value}
      </span>
      <div 
        className={`w-full rounded-t-md transition-all duration-300 group-hover:opacity-80 ${color}`} 
        style={{ height: height }}
      ></div>
      <span className={`text-[11px] font-bold ${active ? "text-gray-800" : "text-gray-400"}`}>{label}</span>
    </div>
  );
}

function AccountRow({ name, email, role, status, isLast }) {
  const isSuspended = status === "Suspendu";
  
  return (
    <div className={`grid grid-cols-[2fr_1.5fr_1fr_1fr_100px] gap-4 p-3 text-[13px] items-center hover:bg-gray-50 transition-colors ${!isLast ? "border-b border-gray-100" : ""}`}>
      <span className="font-bold text-gray-800">{name}</span>
      <span className="text-gray-500">{email}</span>
      <span className={`font-semibold ${role === "Employé" ? "text-blue-600" : "text-gray-600"}`}>{role}</span>
      
      {/* Badge de statut */}
      <span className="flex">
        <span className={`px-3 py-1 rounded-full text-[11px] font-bold ${isSuspended ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
          {status}
        </span>
      </span>

      {/* Bouton d'action (Suspendre / Réactiver) */}
      <div className="flex justify-end">
        {isSuspended ? (
          <button className="text-[12px] font-bold text-gray-500 hover:text-green-600 border border-gray-200 hover:border-green-600 rounded px-3 py-1.5 transition-colors">
            Réactiver
          </button>
        ) : (
          <button className="text-[12px] font-bold text-red-600 hover:bg-red-50 border border-red-200 rounded px-3 py-1.5 transition-colors">
            Suspendre
          </button>
        )}
      </div>
    </div>
  );
}