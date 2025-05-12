import React, { useState } from 'react';
import { ArrowRight, Check, Calendar, Upload, FileText, Shield, ChevronLeft, ChevronRight, User, Users, Briefcase, Clock, Banknote, PlusCircle, LockKeyhole, Download, Heart } from 'lucide-react';

const WidgetDemo = () => {
  const [activeSection, setActiveSection] = useState('demo');
  const [demoStep, setDemoStep] = useState(0);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);

  // Form data state
  const [formData, setFormData] = useState({
    deceasedFirstName: 'Matti',
    deceasedLastName: 'Virtanen',
    deathDate: '2025-04-15',
    hasChildren: true,
    hasSpouse: true,
    hasWill: false,
    contactFirstName: 'Liisa',
    contactLastName: 'Virtanen',
    contactEmail: 'liisa.virtanen@example.com',
    contactPhone: '+358 40 123 4567',
    documents: ['virkatodistus.pdf']
  });

  // Widget theme styles
  const themes = {
    dark: {
      container: "bg-gray-900 text-white border border-gray-800",
      header: "border-gray-800 bg-gray-900",
      inputs: "bg-gray-800 border border-gray-700 text-white",
      primary: "bg-blue-600 text-white",
      secondary: "bg-gray-800 border border-gray-700 text-white",
      accent: "text-blue-500",
      progressActive: "bg-blue-600 text-white",
      progressInactive: "bg-gray-800 text-gray-400",
      footer: "bg-gray-950 text-gray-400"
    },
    light: {
      container: "bg-white text-gray-800 border border-gray-200 shadow-md",
      header: "border-gray-200 bg-white",
      inputs: "bg-gray-50 border border-gray-300 text-gray-800",
      primary: "bg-blue-600 text-white",
      secondary: "bg-gray-100 border border-gray-300 text-gray-800",
      accent: "text-blue-600",
      progressActive: "bg-blue-600 text-white",
      progressInactive: "bg-gray-200 text-gray-600",
      footer: "bg-gray-100 text-gray-600"
    },
    earthy: {
      container: "bg-amber-50 text-stone-800 border border-amber-200 shadow-md",
      header: "border-amber-200 bg-amber-50",
      inputs: "bg-white border border-amber-200 text-stone-800",
      primary: "bg-amber-700 text-white",
      secondary: "bg-stone-100 border border-amber-200 text-stone-800",
      accent: "text-amber-700",
      progressActive: "bg-amber-700 text-white",
      progressInactive: "bg-stone-200 text-stone-600",
      footer: "bg-stone-100 text-stone-600"
    },
    professional: {
      container: "bg-white text-slate-800 border border-slate-200 shadow-md",
      header: "border-slate-200 bg-slate-50",
      inputs: "bg-white border border-slate-300 text-slate-800",
      primary: "bg-slate-700 text-white",
      secondary: "bg-slate-100 border border-slate-300 text-slate-800",
      accent: "text-slate-700",
      progressActive: "bg-slate-700 text-white",
      progressInactive: "bg-slate-200 text-slate-600",
      footer: "bg-slate-100 text-slate-600"
    }
  };

  type ThemeName = keyof typeof themes;

  const [activeTheme, setActiveTheme] = useState<ThemeName>('dark');
  const theme = themes[activeTheme];

  // Render the widget demo based on current step
  const renderWidgetStep = () => {
    switch(demoStep) {
      case 0:
        return (
          <div className="space-y-4">
            <h3 className={`text-xl font-semibold mb-4 ${activeTheme !== 'dark' ? 'text-slate-800' : ''}`}>Vainajan tiedot</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Etunimi</label>
                <input 
                  type="text" 
                  value={formData.deceasedFirstName}
                  className={`w-full p-2 rounded-lg ${theme.inputs}`}
                  placeholder="Etunimi"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Sukunimi</label>
                <input 
                  type="text" 
                  value={formData.deceasedLastName}
                  className={`w-full p-2 rounded-lg ${theme.inputs}`}
                  placeholder="Sukunimi"
                  readOnly
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Kuolinpäivä</label>
              <input 
                type="date" 
                value={formData.deathDate}
                className={`w-full p-2 rounded-lg ${theme.inputs}`}
                readOnly
              />
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-4">
            <h3 className={`text-xl font-semibold mb-4 ${activeTheme !== 'dark' ? 'text-slate-800' : ''}`}>Perhetilanne</h3>
            
            <div className="mb-4">
              <p className="block text-sm font-medium mb-2">Oliko vainajalla lapsia?</p>
              <div className="flex space-x-4">
                <button 
                  className={`flex items-center px-4 py-2 rounded-lg ${formData.hasChildren ? theme.primary : theme.secondary}`}
                >
                  <span>Kyllä</span>
                  {formData.hasChildren && <Check className="ml-2 h-4 w-4" />}
                </button>
                <button 
                  className={`flex items-center px-4 py-2 rounded-lg ${!formData.hasChildren ? theme.primary : theme.secondary}`}
                >
                  <span>Ei</span>
                  {!formData.hasChildren && <Check className="ml-2 h-4 w-4" />}
                </button>
              </div>
            </div>
            
            <div className="mb-4">
              <p className="block text-sm font-medium mb-2">Oliko vainaja naimisissa?</p>
              <div className="flex space-x-4">
                <button 
                  className={`flex items-center px-4 py-2 rounded-lg ${formData.hasSpouse ? theme.primary : theme.secondary}`}
                >
                  <span>Kyllä</span>
                  {formData.hasSpouse && <Check className="ml-2 h-4 w-4" />}
                </button>
                <button 
                  className={`flex items-center px-4 py-2 rounded-lg ${!formData.hasSpouse ? theme.primary : theme.secondary}`}
                >
                  <span>Ei</span>
                  {!formData.hasSpouse && <Check className="ml-2 h-4 w-4" />}
                </button>
              </div>
            </div>
            
            <div className="mb-4">
              <p className="block text-sm font-medium mb-2">Onko testamenttia tiedossa?</p>
              <div className="flex space-x-4">
                <button 
                  className={`flex items-center px-4 py-2 rounded-lg ${formData.hasWill ? theme.primary : theme.secondary}`}
                >
                  <span>Kyllä</span>
                  {formData.hasWill && <Check className="ml-2 h-4 w-4" />}
                </button>
                <button 
                  className={`flex items-center px-4 py-2 rounded-lg ${!formData.hasWill ? theme.primary : theme.secondary}`}
                >
                  <span>Ei</span>
                  {!formData.hasWill && <Check className="ml-2 h-4 w-4" />}
                </button>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h3 className={`text-xl font-semibold mb-4 ${activeTheme !== 'dark' ? 'text-slate-800' : ''}`}>Yhteystiedot</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Etunimi</label>
                <input 
                  type="text" 
                  value={formData.contactFirstName}
                  className={`w-full p-2 rounded-lg ${theme.inputs}`}
                  placeholder="Etunimi"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Sukunimi</label>
                <input 
                  type="text" 
                  value={formData.contactLastName}
                  className={`w-full p-2 rounded-lg ${theme.inputs}`}
                  placeholder="Sukunimi"
                  readOnly
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Sähköposti</label>
              <input 
                type="email" 
                value={formData.contactEmail}
                className={`w-full p-2 rounded-lg ${theme.inputs}`}
                placeholder="email@example.com"
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Puhelinnumero</label>
              <input 
                type="tel" 
                value={formData.contactPhone}
                className={`w-full p-2 rounded-lg ${theme.inputs}`}
                placeholder="+358 40 123 4567"
                readOnly
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <h3 className={`text-xl font-semibold mb-4 ${activeTheme !== 'dark' ? 'text-slate-800' : ''}`}>Liitteet (valinnainen)</h3>
            <p className={`text-sm ${activeTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
              Voit ladata asiakirjoja jo nyt, tai myöhemmin asiakasportaalissa.
            </p>
            
            <div className={`border-2 border-dashed ${activeTheme === 'dark' ? 'border-gray-700' : 'border-gray-300'} rounded-lg p-6 text-center`}>
              <Upload className={`mx-auto h-12 w-12 ${activeTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'} mb-4`} />
              <p className={`text-sm ${activeTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mb-2`}>Vedä tiedostot tähän tai</p>
              <label className={`inline-block ${theme.primary} px-4 py-2 rounded-lg cursor-pointer`}>
                Valitse tiedostot
                <input 
                  type="file" 
                  multiple
                  className="hidden"
                />
              </label>
            </div>
            
            {formData.documents.length > 0 && (
              <div className="mt-4">
                <h4 className="font-medium mb-2">Ladatut tiedostot:</h4>
                <ul className="space-y-2">
                  {formData.documents.map((file, index) => (
                    <li key={index} className={`flex items-center justify-between p-2 ${activeTheme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'} rounded-lg`}>
                      <span className="truncate max-w-xs">{file}</span>
                      <button 
                        className={activeTheme === 'dark' ? 'text-red-400 hover:text-red-300' : 'text-red-600 hover:text-red-500'}
                      >
                        Poista
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );
      case 4:
        return (
          <div className="text-center space-y-6 py-6">
            <div className={`inline-flex items-center justify-center w-20 h-20 ${theme.primary} rounded-full mb-4`}>
              <Check className="h-10 w-10 text-white" />
            </div>
            
            <h3 className={`text-2xl font-bold ${activeTheme !== 'dark' ? 'text-slate-800' : ''}`}>Kiitos tiedoista!</h3>
            <p className={activeTheme === 'dark' ? 'text-gray-400 max-w-md mx-auto' : 'text-gray-600 max-w-md mx-auto'}>
              Olemme vastaanottaneet tietosi ja asiantuntijamme käsittelee asian mahdollisimman pian.
            </p>
            
            <div className="flex flex-col gap-4 mt-6 max-w-md mx-auto">
              <button 
                className={`w-full ${theme.primary} py-3 px-6 rounded-lg flex items-center justify-center`}
              >
                <LockKeyhole className="mr-2 h-5 w-5" />
                Siirry asiakasportaaliin
              </button>
              
              <button 
                onClick={() => setIsCalendarVisible(true)}
                className={`w-full ${theme.secondary} py-3 px-6 rounded-lg flex items-center justify-center`}
              >
                <Calendar className="mr-2 h-5 w-5" />
                Varaa aika asiantuntijalle
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  // Progress Indicator
  const ProgressIndicator = () => (
    <div className="flex items-center justify-between mb-8">
      {[0, 1, 2, 3, 4].map((index) => (
        <React.Fragment key={index}>
          <div 
            className="flex flex-col items-center cursor-pointer"
            onClick={() => setDemoStep(index)}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${demoStep >= index ? theme.progressActive : theme.progressInactive}`}>
              {index < 4 ? index + 1 : <Check className="h-4 w-4" />}
            </div>
            <span className={`text-xs mt-1 ${activeTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              {index === 0 && "Vainajan tiedot"}
              {index === 1 && "Perhetilanne"}
              {index === 2 && "Yhteystiedot"}
              {index === 3 && "Liitteet"}
              {index === 4 && "Valmis"}
            </span>
          </div>
          
          {index < 4 && (
            <div className={`h-1 flex-1 ${demoStep > index ? theme.progressActive : theme.progressInactive}`}></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );

  const ClientPortalPreview = () => (
    <div className={`w-full max-w-3xl mx-auto rounded-xl overflow-hidden shadow-xl ${theme.container} mb-12`}>
      <div className={`p-6 border-b ${theme.header} flex justify-between items-center`}>
        <h2 className={`text-2xl font-bold flex items-center ${activeTheme !== 'dark' ? 'text-slate-800' : ''}`}>
          <Shield className={`mr-2 h-6 w-6 ${theme.accent}`} />
          Asiakasportaali
        </h2>
        <div className="flex items-center gap-2">
          <span className={`text-sm ${activeTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Liisa Virtanen
          </span>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${theme.primary}`}>
            <User className="h-5 w-5 text-white" />
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex flex-wrap gap-6 mb-8">
          <div className={`px-4 py-3 rounded-lg ${theme.primary} flex items-center`}>
            <span>Aktiiviset tapaukset: 1</span>
          </div>
          <div className={`px-4 py-3 rounded-lg ${theme.secondary} flex items-center`}>
            <Calendar className="mr-2 h-4 w-4" />
            <span>Seuraava tapaaminen: 20.5.2025</span>
          </div>
          <div className={`px-4 py-3 rounded-lg ${theme.secondary} flex items-center`}>
            <FileText className="mr-2 h-4 w-4" />
            <span>Dokumentit: 3/6</span>
          </div>
        </div>
        
        <div className={`p-4 rounded-lg mb-8 ${activeTheme === 'dark' ? 'bg-gray-800' : 'bg-white border border-gray-200'}`}>
          <h3 className={`text-lg font-medium mb-3 flex items-center ${activeTheme !== 'dark' ? 'text-slate-800' : ''}`}>
            <FileText className={`mr-2 h-5 w-5 ${theme.accent}`} />
            Matti Virtasen perunkirjoitus
          </h3>
          
          <div className={`grid md:grid-cols-3 gap-4 text-sm ${activeTheme === 'dark' ? 'text-gray-300' : 'text-gray-800'}`}>
            <div className="flex items-center">
              <Calendar className="mr-2 h-4 w-4" />
              <span>Aloitettu: 16.5.2025</span>
            </div>
            <div className="flex items-center">
              <Clock className="mr-2 h-4 w-4" />
              <span>Tila: Dokumentteja odotetaan</span>
            </div>
            <div className="flex items-center">
              <FileText className="mr-2 h-4 w-4" />
              <span>Perukirja valmistuu: 15.6.2025</span>
            </div>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className={`text-lg font-medium ${activeTheme !== 'dark' ? 'text-slate-800' : ''}`}>Puuttuvat dokumentit</h3>
            <ul className="space-y-2">
              <li className={`p-3 rounded-lg ${activeTheme === 'dark' ? 'bg-gray-800' : 'bg-white border border-gray-200'} flex items-center justify-between`}>
                <div className="flex items-center">
                  <FileText className="mr-2 h-5 w-5" />
                  <span>Virkatodistus (puoliso)</span>
                </div>
                <button className={`${theme.primary} px-3 py-1 rounded text-sm`}>Lataa</button>
              </li>
              <li className={`p-3 rounded-lg ${activeTheme === 'dark' ? 'bg-gray-800' : 'bg-white border border-gray-200'} flex items-center justify-between`}>
                <div className="flex items-center">
                  <FileText className="mr-2 h-5 w-5" />
                  <span>Pankin saldotodistus</span>
                </div>
                <button className={`${theme.primary} px-3 py-1 rounded text-sm`}>Lataa</button>
              </li>
              <li className={`p-3 rounded-lg ${activeTheme === 'dark' ? 'bg-gray-800' : 'bg-white border border-gray-200'} flex items-center justify-between`}>
                <div className="flex items-center">
                  <FileText className="mr-2 h-5 w-5" />
                  <span>Kiinteistöveropäätös</span>
                </div>
                <button className={`${theme.primary} px-3 py-1 rounded text-sm`}>Lataa</button>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className={`text-lg font-medium ${activeTheme !== 'dark' ? 'text-slate-800' : ''}`}>Tulevat tapahtumat</h3>
            <div className={`p-4 rounded-lg ${activeTheme === 'dark' ? 'bg-gray-800' : 'bg-white border border-gray-200'}`}>
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">Perukirjan laadinta</h4>
                <span className="text-sm">20.5.2025 klo 13:00</span>
              </div>
              <p className={`text-sm ${activeTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mb-3`}>
                Tapaaminen toimistollamme perukirjan laatimista varten.
              </p>
              <div className="flex space-x-2">
                <button className={`${theme.primary} px-3 py-2 rounded-lg text-sm flex items-center`}>
                  <Calendar className="mr-2 h-4 w-4" />
                  Lisää kalenteriin
                </button>
                <button className={`${theme.secondary} px-3 py-2 rounded-lg text-sm`}>
                  Siirrä
                </button>
              </div>
            </div>
            
            <button className={`w-full ${theme.secondary} py-2 rounded-lg flex items-center justify-center`}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Varaa uusi aika
            </button>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <button className={`${theme.secondary} px-6 py-2 rounded-lg`}>
            Näytä kaikki tapaukset
          </button>
        </div>
      </div>
    </div>
  );

  const CalendarBookingDemo = () => (
    <div className={`fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50 ${isCalendarVisible ? 'block' : 'hidden'}`}>
      <div className={`${activeTheme === 'dark' ? 'bg-gray-900' : 'bg-white'} rounded-lg w-full max-w-2xl p-6`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className={`text-2xl font-bold ${activeTheme !== 'dark' ? 'text-slate-800' : ''}`}>Varaa aika asiantuntijalle</h2>
          <button 
            onClick={() => setIsCalendarVisible(false)}
            className="text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Tapaamisen tyyppi</label>
          <select className={`w-full p-2 rounded-lg ${theme.inputs}`}>
            <option>Perunkirjoituksen alkutapaaminen</option>
            <option>Testamentin laatiminen</option>
            <option>Perinnönjako</option>
            <option>Muu lakiasiointi</option>
          </select>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className={`font-medium mb-3 ${activeTheme !== 'dark' ? 'text-slate-800' : ''}`}>Valitse päivä</h3>
            <div className={`p-4 rounded-lg ${activeTheme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
              <div className="flex justify-between items-center mb-4">
                <button className={`${theme.secondary} px-2 py-1 rounded`}>
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <span className="font-medium">Toukokuu 2025</span>
                <button className={`${theme.secondary} px-2 py-1 rounded`}>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
              
              <div className="grid grid-cols-7 gap-1 text-center mb-2">
                <span className="text-xs">Ma</span>
                <span className="text-xs">Ti</span>
                <span className="text-xs">Ke</span>
                <span className="text-xs">To</span>
                <span className="text-xs">Pe</span>
                <span className="text-xs">La</span>
                <span className="text-xs">Su</span>
              </div>
              
              <div className="grid grid-cols-7 gap-1">
                {[...Array(31)].map((_, i) => {
                  const day = i + 1;
                  const isSelected = day === 20;
                  const isAvailable = [5, 7, 12, 15, 20, 21, 25, 28].includes(day);
                  
                  return (
                    <button 
                      key={i} 
                      className={`p-2 rounded-full ${
                        isSelected ? theme.primary :
                        isAvailable ? theme.secondary : 
                        'opacity-50 cursor-not-allowed'
                      }`}
                      disabled={!isAvailable}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
          
          <div>
            <h3 className={`font-medium mb-3 ${activeTheme !== 'dark' ? 'text-slate-800' : ''}`}>Valitse aika (20.5.2025)</h3>
            <div className="grid grid-cols-2 gap-2">
              {["9:00", "10:00", "11:00", "13:00", "14:00", "15:00"].map((time, i) => (
                <button 
                  key={i} 
                  className={`p-2 rounded-lg ${time === "13:00" ? theme.primary : theme.secondary}`}
                >
                  {time}
                </button>
              ))}
            </div>
            
            <div className={`mt-6 p-4 border rounded-lg ${theme.secondary.includes('border') ? '' : 'border-gray-300'}`}>
              <h4 className="font-medium mb-2">Yhteenveto</h4>
              <p className={`text-sm ${activeTheme === 'dark' ? 'text-gray-300' : 'text-gray-800'}`}>
                Perunkirjoituksen alkutapaaminen
              </p>
              <p className={`text-sm ${activeTheme === 'dark' ? 'text-gray-300' : 'text-gray-800'}`}>
                <Calendar className="inline-block mr-1 h-4 w-4" /> 20.5.2025 klo 13:00
              </p>
            </div>
            
            <button className={`w-full mt-6 ${theme.primary} py-2 rounded-lg flex items-center justify-center`}>
              Vahvista varaus
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Business benefits showcase
  const BenefitsSection = () => (
    <div className="py-12">
      <h2 className="text-3xl font-bold mb-12 text-center">Miksi asiakkaat valitsevat Lakivuo-työkalun?</h2>
      
      <div className="grid md:grid-cols-3 gap-8">
        <div className="p-6 rounded-lg bg-gray-900 shadow-lg border border-gray-800">
          <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center mb-4">
            <Briefcase className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Lisätuloja automatisoinnilla</h3>
          <p className="text-gray-400">
            Asiakkaat aloittavat perunkirjoitusprosessin helposti verkkosivullasi ympäri vuorokauden. Kun asiakas täyttää lomakkeen, hän todennäköisemmin valitsee juuri sinun palvelusi.
          </p>
        </div>
        
        <div className="p-6 rounded-lg bg-gray-900 shadow-lg border border-gray-800">
          <div className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center mb-4">
            <Banknote className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Säästä aikaa ja resursseja</h3>
          <p className="text-gray-400">
            Asiakkaat tekevät osan työstä itse - he lataavat dokumentit, varaavat tapaamiset ja täyttävät perustiedot. Voit palvella enemmän asiakkaita samalla henkilöstömäärällä.
          </p>
        </div>
        
        <div className="p-6 rounded-lg bg-gray-900 shadow-lg border border-gray-800">
          <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center mb-4">
            <Users className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Parempi asiakaskokemus</h3>
          <p className="text-gray-400">
            Asiakkaat arvostavat modernia ja selkeää prosessia, jossa he näkevät edistymisensä. Turvallinen asiakasportaali rakentaa luottamusta ja vähentää epävarmuutta.
          </p>
        </div>
      </div>
    </div>
  );

  const ThemeShowcase = () => (
    <div className="py-12">
      <h2 className="text-3xl font-bold mb-8 text-center">Valitse yrityksellesi sopiva ulkoasu</h2>
      <p className="text-center text-gray-400 max-w-2xl mx-auto mb-12">
        Lakivuo-widget mukautuu täydellisesti verkkosivustosi ilmeeseen ja brändiin. Valitse sopiva värimaailma tai pyydä oma räätälöity teema.
      </p>
      
      <div className="flex flex-wrap gap-4 justify-center mb-12">
        <button 
          onClick={() => setActiveTheme('dark')}
          className={`px-4 py-2 rounded-lg ${activeTheme === 'dark' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300'}`}
        >
          Tumma teema
        </button>
        <button 
          onClick={() => setActiveTheme('light')}
          className={`px-4 py-2 rounded-lg ${activeTheme === 'light' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300'}`}
        >
          Vaalea teema
        </button>
        <button 
          onClick={() => setActiveTheme('earthy')}
          className={`px-4 py-2 rounded-lg ${activeTheme === 'earthy' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300'}`}
        >
          Maanläheinen teema
        </button>
        <button 
          onClick={() => setActiveTheme('professional')}
          className={`px-4 py-2 rounded-lg ${activeTheme === 'professional' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300'}`}
        >
          Ammattimainen teema
        </button>
      </div>
    </div>
  );

  const ROICalculator = () => {
    const [clientsMonthly, setClientsMonthly] = useState(10);
    const [conversionRate, setConversionRate] = useState(20);
    const [avgValue, setAvgValue] = useState(500);
    
    const additionalClients = Math.round((clientsMonthly * conversionRate) / 100);
    const monthlyRevenue = additionalClients * avgValue;
    const annualRevenue = monthlyRevenue * 12;
    
    return (
      <div className="py-12 px-6">
        <h2 className="text-3xl font-bold mb-8 text-center">Laske tuottopotentiaali</h2>
        <p className="text-center text-gray-400 max-w-2xl mx-auto mb-12">
          Näe kuinka paljon lisätuloja Lakivuo voi tuoda yrityksellesi automatisoimalla asiakashankintaa.
        </p>
        
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="p-6 rounded-lg bg-gray-900 shadow-lg border border-gray-800">
            <h3 className="text-xl font-semibold mb-6">Syötä tietosi</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Kuinka monta asiakasta kuukaudessa?</label>
                <input
                  type="range"
                  min="1"
                  max="50"
                  value={clientsMonthly}
                  onChange={(e) => setClientsMonthly(parseInt(e.target.value))}
                  className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">1</span>
                  <span className="text-sm text-gray-400">{clientsMonthly}</span>
                  <span className="text-sm text-gray-400">50</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Konversioprosentin parannus (%)</label>
                <input
                  type="range"
                  min="5"
                  max="50"
                  value={conversionRate}
                  onChange={(e) => setConversionRate(parseInt(e.target.value))}
                  className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">5%</span>
                  <span className="text-sm text-gray-400">{conversionRate}%</span>
                  <span className="text-sm text-gray-400">50%</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Keskimääräinen tilauksen arvo (€)</label>
                <input
                  type="range"
                  min="100"
                  max="2000"
                  step="100"
                  value={avgValue}
                  onChange={(e) => setAvgValue(parseInt(e.target.value))}
                  className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">100€</span>
                  <span className="text-sm text-gray-400">{avgValue}€</span>
                  <span className="text-sm text-gray-400">2000€</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-6 rounded-lg bg-gray-900 shadow-lg border border-gray-800">
            <h3 className="text-xl font-semibold mb-6">Tuottopotentiaali</h3>
            
            <div className="space-y-8">
              <div className="text-center p-4 bg-gray-800 rounded-lg">
                <p className="text-sm text-gray-400 mb-2">Lisäasiakkaita kuukaudessa</p>
                <p className="text-4xl font-bold text-blue-500">{additionalClients}</p>
              </div>
              
              <div className="text-center p-4 bg-gray-800 rounded-lg">
                <p className="text-sm text-gray-400 mb-2">Lisätulot kuukaudessa</p>
                <p className="text-4xl font-bold text-green-500">{monthlyRevenue} €</p>
              </div>
              
              <div className="text-center p-4 bg-blue-900 rounded-lg">
                <p className="text-sm text-blue-200 mb-2">Lisätulot vuodessa</p>
                <p className="text-4xl font-bold text-white">{annualRevenue} €</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Implementation steps
  const ImplementationSteps = () => (
    <div className="py-12">
      <h2 className="text-3xl font-bold mb-8 text-center">Käyttöönotto on helppoa</h2>
      
      <div className="max-w-3xl mx-auto">
        <div className="relative">
          {/* Vertical line connecting steps */}
          <div className="absolute left-6 top-8 bottom-0 w-1 bg-blue-600"></div>
          
          <div className="space-y-12">
            <div className="flex">
              <div className="w-12 h-12 rounded-full bg-blue-600 flex-shrink-0 flex items-center justify-center z-10">
                <span className="text-white font-bold">1</span>
              </div>
              <div className="ml-6">
                <h3 className="text-xl font-semibold mb-2">Ota yhteyttä ja kerro tarpeistasi</h3>
                <p className="text-gray-400">
                  Keskustelemme yrityksesi tarpeista ja parhaista tavoista integroida Lakivuo-widget verkkosivustollesi.
                </p>
              </div>
            </div>
            
            <div className="flex">
              <div className="w-12 h-12 rounded-full bg-blue-600 flex-shrink-0 flex items-center justify-center z-10">
                <span className="text-white font-bold">2</span>
              </div>
              <div className="ml-6">
                <h3 className="text-xl font-semibold mb-2">Räätälöimme widgetin ilmeeseesi</h3>
                <p className="text-gray-400">
                  Sovitamme Lakivuo-widgetin yrityksesi brändiin ja verkkosivuston ulkoasuun sopivaksi.
                </p>
              </div>
            </div>
            
            <div className="flex">
              <div className="w-12 h-12 rounded-full bg-blue-600 flex-shrink-0 flex items-center justify-center z-10">
                <span className="text-white font-bold">3</span>
              </div>
              <div className="ml-6">
                <h3 className="text-xl font-semibold mb-2">Asennus yhdellä koodirivillä</h3>
                <p className="text-gray-400">
                  Saat valmiin JavaScript-koodinpätkän, jonka lisääminen verkkosivustolle vie vain muutaman minuutin.
                </p>
              </div>
            </div>
            
            <div className="flex">
              <div className="w-12 h-12 rounded-full bg-blue-600 flex-shrink-0 flex items-center justify-center z-10">
                <span className="text-white font-bold">4</span>
              </div>
              <div className="ml-6">
                <h3 className="text-xl font-semibold mb-2">Aloita lisämyynti heti</h3>
                <p className="text-gray-400">
                  Widget on käyttövalmis heti asennuksen jälkeen. Saat ilmoituksen jokaisesta uudesta liidistä sähköpostiisi.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const CTA = () => (
    <div className="py-16 bg-gradient-to-r from-blue-900 to-purple-900 rounded-xl my-12">
      <div className="max-w-4xl mx-auto text-center px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ota Lakivuo käyttöön</h2>
        <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
          Lisää konversiota, säästä työtunteja ja tarjoa nykyaikainen asiakaskokemus.
        </p>
        
        <div className="flex flex-wrap gap-4 justify-center">
          <button className="px-8 py-3 bg-white text-blue-900 font-semibold rounded-lg hover:bg-gray-100 flex items-center">
            <Calendar className="mr-2 h-5 w-5" />
            Varaa demotapaaminen
          </button>
          <button className="px-8 py-3 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-600 flex items-center">
            <Download className="mr-2 h-5 w-5" />
            Lataa esite
          </button>
        </div>
      </div>
    </div>
  );

  // Navigation tabs
  const Tabs = () => (
    <div className="flex flex-wrap border-b border-gray-800 mb-8">
      <button 
        onClick={() => setActiveSection('demo')}
        className={`px-6 py-3 font-medium ${activeSection === 'demo' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-400'}`}
      >
        Widgetin demo
      </button>
      <button 
        onClick={() => setActiveSection('portal')}
        className={`px-6 py-3 font-medium ${activeSection === 'portal' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-400'}`}
      >
        Asiakasportaali
      </button>
      <button 
        onClick={() => setActiveSection('benefits')}
        className={`px-6 py-3 font-medium ${activeSection === 'benefits' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-400'}`}
      >
        Hyödyt yritykselle
      </button>
    </div>
  );

  return (
    <section className="widget-demo py-16">
      <div className="section-container">
        <div className="section-title">
          <h2>Tehosta asianajotoimistosi tai hautaustoimistosi perukirjapalvelua</h2>
          <p>Helpota asiakkaitasi, automatisoi rutiinitöitä ja kasvata liiketoimintaasi modernilla työkalulla</p>
        </div>
        
        <Tabs />
        
        {activeSection === 'demo' && (
          <div>
            <div className="mb-12">
              <p className="text-center mb-8 text-gray-400">
                Klikkaa vaiheiden kuvakkeita nähdäksesi koko prosessin tai käytä navigointipainikkeita.
              </p>
              
              <div className={`w-full max-w-3xl mx-auto rounded-xl overflow-hidden shadow-xl ${theme.container}`}>
                <div className={`p-6 border-b ${theme.header} flex justify-between items-center`}>
                  <h2 className={`text-2xl font-bold flex items-center ${activeTheme !== 'dark' ? 'text-slate-800' : ''}`}>
                    <FileText className={`mr-2 h-6 w-6 ${theme.accent}`} />
                    Perunkirjoituspalvelu
                  </h2>
                </div>
                
                <div className="p-6">
                  {demoStep < 4 && <ProgressIndicator />}
                  {renderWidgetStep()}
                  
                  {demoStep < 4 && (
                    <div className="flex justify-between mt-8">
                      {demoStep > 0 ? (
                        <button 
                          onClick={() => setDemoStep(prev => Math.max(0, prev - 1))}
                          className={`flex items-center px-4 py-2 ${theme.secondary} rounded-lg`}
                        >
                          <ChevronLeft className="mr-1 h-4 w-4" />
                          Takaisin
                        </button>
                      ) : (
                        <div></div>
                      )}
                      
                      <button 
                        onClick={() => setDemoStep(prev => Math.min(4, prev + 1))}
                        className={`flex items-center px-6 py-2 rounded-lg ${theme.primary}`}
                      >
                        {demoStep === 3 ? 'Lähetä' : 'Seuraava'}
                        {demoStep === 3 ? <Check className="ml-2 h-4 w-4" /> : <ChevronRight className="ml-2 h-4 w-4" />}
                      </button>
                    </div>
                  )}
                </div>
                
                <div className={`px-6 py-4 ${theme.footer} text-sm flex items-center justify-center`}>
                  <Shield className="mr-2 h-4 w-4" />
                  Kaikki tiedot käsitellään luottamuksellisesti ja turvallisesti
                </div>
              </div>
            </div>
            
            <ThemeShowcase />
            <ImplementationSteps />
            <ROICalculator />
            <CTA />
          </div>
        )}
        
        {activeSection === 'portal' && (
          <div>
            <p className="text-center mb-8 text-gray-400">
              Asiakasportaalimme tarjoaa turvallisen tavan hallita dokumentteja ja kommunikoida asiakkaiden kanssa.
            </p>
            
            <ClientPortalPreview />
            
            <div className="max-w-4xl mx-auto bg-gray-900 rounded-lg p-8 border border-gray-800">
              <h3 className="text-2xl font-bold mb-6">Miksi asiakasportaali säästää aikaasi?</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex-shrink-0 flex items-center justify-center mr-4">
                    <Upload className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Helppo dokumenttien hallinta</h4>
                    <p className="text-gray-400">
                      Asiakkaat voivat ladata dokumentteja turvallisesti itse, jolloin sinun ei tarvitse käsitellä sähköpostiliitteitä.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-green-600 flex-shrink-0 flex items-center justify-center mr-4">
                    <Calendar className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Automaattinen aikataulutus</h4>
                    <p className="text-gray-400">
                      Asiakkaat varaavat tapaamiset itse kalenteristasi ilman edestakaisin sähköpostien vaihtoa.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-purple-600 flex-shrink-0 flex items-center justify-center mr-4">
                    <LockKeyhole className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Tietoturvallinen viestintä</h4>
                    <p className="text-gray-400">
                      Kaikki arkaluontoiset keskustelut käydään suojatussa ympäristössä, ei sähköpostissa.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-red-600 flex-shrink-0 flex items-center justify-center mr-4">
                    <Heart className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Modernimpi asiakaskokemus</h4>
                    <p className="text-gray-400">
                      Tarjoa nykyaikaista palvelua, joka erottuu kilpailijoista ja rakentaa luottamusta.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeSection === 'benefits' && (
          <div>
            <BenefitsSection />
            
            <div className="py-12">
              <h3 className="text-2xl font-bold mb-8 text-center">Asiakkaat maksavat verkkosivullasi - sinä säästät työtunneissa</h3>
              
              <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
                <div className="p-6 bg-gray-900 rounded-lg border border-gray-800">
                  <h4 className="font-semibold text-xl mb-4">Perinteinen prosessi:</h4>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <span className="w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center mr-3 mt-1">1</span>
                      <p className="text-gray-400">Asiakas soittaa tai lähettää sähköpostia ja kyselee hintoja</p>
                    </li>
                    <li className="flex items-start">
                      <span className="w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center mr-3 mt-1">2</span>
                      <p className="text-gray-400">Tarjoat tietoa palveluistasi ja yrität varata tapaamisen</p>
                    </li>
                    <li className="flex items-start">
                      <span className="w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center mr-3 mt-1">3</span>
                      <p className="text-gray-400">Asiakas vertailee useita palveluntarjoajia</p>
                    </li>
                    <li className="flex items-start">
                      <span className="w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center mr-3 mt-1">4</span>
                      <p className="text-gray-400">Saatat menettää asiakkaan kilpailijalle</p>
                    </li>
                    <li className="flex items-start">
                      <span className="w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center mr-3 mt-1">5</span>
                      <p className="text-gray-400">Vaaditaan useita puheluita dokumenttien keräämiseksi</p>
                    </li>
                  </ul>
                </div>
                
                <div className="p-6 bg-blue-900 rounded-lg border border-blue-700">
                  <h4 className="font-semibold text-xl mb-4">Lakivuo-widget:</h4>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <span className="w-6 h-6 rounded-full bg-blue-800 flex items-center justify-center mr-3 mt-1">1</span>
                      <p className="text-blue-200">Asiakas löytää widgetin verkkosivultasi ja aloittaa prosessin heti</p>
                    </li>
                    <li className="flex items-start">
                      <span className="w-6 h-6 rounded-full bg-blue-800 flex items-center justify-center mr-3 mt-1">2</span>
                      <p className="text-blue-200">Asiakas täyttää tiedot ja sitoutuu juuri sinun palveluusi</p>
                    </li>
                    <li className="flex items-start">
                      <span className="w-6 h-6 rounded-full bg-blue-800 flex items-center justify-center mr-3 mt-1">3</span>
                      <p className="text-blue-200">Asiakas lataa tarvittavat dokumentit itse ja varaa tapaamisen</p>
                    </li>
                    <li className="flex items-start">
                      <span className="w-6 h-6 rounded-full bg-blue-800 flex items-center justify-center mr-3 mt-1">4</span>
                      <p className="text-blue-200">Saat ilmoituksen valmiiksi kvalifioidusta liidistä</p>
                    </li>
                    <li className="flex items-start">
                      <span className="w-6 h-6 rounded-full bg-blue-800 flex items-center justify-center mr-3 mt-1">5</span>
                      <p className="text-blue-200">Voit keskittyä arvoa tuottavaan asiantuntijatyöhön</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Calendar Modal */}
      <CalendarBookingDemo />
    </section>
  );
};

export default WidgetDemo;