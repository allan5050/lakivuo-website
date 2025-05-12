import React, { useState } from 'react';
import { ArrowRight, Check, Calendar, Upload, UserPlus, Users, FileText, Shield, ChevronLeft, ChevronRight } from 'lucide-react';

interface FormDataState {
  deceasedFirstName: string;
  deceasedLastName: string;
  deathDate: string;
  hasChildren: boolean | null;
  hasSpouse: boolean | null;
  hasWill: boolean | null;
  contactFirstName: string;
  contactLastName: string;
  contactEmail: string;
  contactPhone: string;
  documents: File[];
}

const PeRuKiRjaWidget = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FormDataState>({
    deceasedFirstName: '',
    deceasedLastName: '',
    deathDate: '',
    hasChildren: null,
    hasSpouse: null,
    hasWill: null,
    contactFirstName: '',
    contactLastName: '',
    contactEmail: '',
    contactPhone: '',
    documents: []
  });
  
  const [submitted, setSubmitted] = useState(false);
  const [showPortal, setShowPortal] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleRadioChange = (name: keyof FormDataState, value: string | boolean | null) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      setSubmitted(true);
    }
  };
  
  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    setFormData(prev => ({
      ...prev,
      documents: [...prev.documents, ...files]
    }));
  };
  
  const handleRemoveFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      documents: prev.documents.filter((_, i) => i !== index)
    }));
  };
  
  const simulateUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
    }, 2000);
  };

  const isStepValid = () => {
    switch(step) {
      case 0:
        return formData.deceasedFirstName && formData.deceasedLastName && formData.deathDate;
      case 1:
        return formData.hasChildren !== null && formData.hasSpouse !== null && formData.hasWill !== null;
      case 2:
        return formData.contactFirstName && formData.contactLastName && formData.contactEmail;
      case 3:
        return true; // Optional documents
      default:
        return false;
    }
  };
  
  const renderStep = () => {
    switch(step) {
      case 0:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4">Vainajan tiedot</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Etunimi</label>
                <input 
                  type="text" 
                  name="deceasedFirstName"
                  value={formData.deceasedFirstName}
                  onChange={handleChange}
                  className="w-full p-2 bg-gray-800 border border-gray-700 rounded-lg"
                  placeholder="Etunimi"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Sukunimi</label>
                <input 
                  type="text" 
                  name="deceasedLastName"
                  value={formData.deceasedLastName}
                  onChange={handleChange}
                  className="w-full p-2 bg-gray-800 border border-gray-700 rounded-lg"
                  placeholder="Sukunimi"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Kuolinpäivä</label>
              <input 
                type="date" 
                name="deathDate"
                value={formData.deathDate}
                onChange={handleChange}
                className="w-full p-2 bg-gray-800 border border-gray-700 rounded-lg"
              />
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4">Perhetilanne</h3>
            
            <div className="mb-4">
              <p className="block text-sm font-medium mb-2">Oliko vainajalla lapsia?</p>
              <div className="flex space-x-4">
                <button 
                  className={`flex items-center px-4 py-2 rounded-lg ${formData.hasChildren === true ? 'bg-blue-600 text-white' : 'bg-gray-800 border border-gray-700'}`}
                  onClick={() => handleRadioChange('hasChildren', true)}
                >
                  <span>Kyllä</span>
                  {formData.hasChildren === true && <Check className="ml-2 h-4 w-4" />}
                </button>
                <button 
                  className={`flex items-center px-4 py-2 rounded-lg ${formData.hasChildren === false ? 'bg-blue-600 text-white' : 'bg-gray-800 border border-gray-700'}`}
                  onClick={() => handleRadioChange('hasChildren', false)}
                >
                  <span>Ei</span>
                  {formData.hasChildren === false && <Check className="ml-2 h-4 w-4" />}
                </button>
              </div>
            </div>
            
            <div className="mb-4">
              <p className="block text-sm font-medium mb-2">Oliko vainaja naimisissa?</p>
              <div className="flex space-x-4">
                <button 
                  className={`flex items-center px-4 py-2 rounded-lg ${formData.hasSpouse === true ? 'bg-blue-600 text-white' : 'bg-gray-800 border border-gray-700'}`}
                  onClick={() => handleRadioChange('hasSpouse', true)}
                >
                  <span>Kyllä</span>
                  {formData.hasSpouse === true && <Check className="ml-2 h-4 w-4" />}
                </button>
                <button 
                  className={`flex items-center px-4 py-2 rounded-lg ${formData.hasSpouse === false ? 'bg-blue-600 text-white' : 'bg-gray-800 border border-gray-700'}`}
                  onClick={() => handleRadioChange('hasSpouse', false)}
                >
                  <span>Ei</span>
                  {formData.hasSpouse === false && <Check className="ml-2 h-4 w-4" />}
                </button>
              </div>
            </div>
            
            <div className="mb-4">
              <p className="block text-sm font-medium mb-2">Onko testamenttia tiedossa?</p>
              <div className="flex space-x-4">
                <button 
                  className={`flex items-center px-4 py-2 rounded-lg ${formData.hasWill === true ? 'bg-blue-600 text-white' : 'bg-gray-800 border border-gray-700'}`}
                  onClick={() => handleRadioChange('hasWill', true)}
                >
                  <span>Kyllä</span>
                  {formData.hasWill === true && <Check className="ml-2 h-4 w-4" />}
                </button>
                <button 
                  className={`flex items-center px-4 py-2 rounded-lg ${formData.hasWill === false ? 'bg-blue-600 text-white' : 'bg-gray-800 border border-gray-700'}`}
                  onClick={() => handleRadioChange('hasWill', false)}
                >
                  <span>Ei</span>
                  {formData.hasWill === false && <Check className="ml-2 h-4 w-4" />}
                </button>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4">Yhteystiedot</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Etunimi</label>
                <input 
                  type="text" 
                  name="contactFirstName"
                  value={formData.contactFirstName}
                  onChange={handleChange}
                  className="w-full p-2 bg-gray-800 border border-gray-700 rounded-lg"
                  placeholder="Etunimi"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Sukunimi</label>
                <input 
                  type="text" 
                  name="contactLastName"
                  value={formData.contactLastName}
                  onChange={handleChange}
                  className="w-full p-2 bg-gray-800 border border-gray-700 rounded-lg"
                  placeholder="Sukunimi"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Sähköposti</label>
              <input 
                type="email" 
                name="contactEmail"
                value={formData.contactEmail}
                onChange={handleChange}
                className="w-full p-2 bg-gray-800 border border-gray-700 rounded-lg"
                placeholder="email@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Puhelinnumero</label>
              <input 
                type="tel" 
                name="contactPhone"
                value={formData.contactPhone}
                onChange={handleChange}
                className="w-full p-2 bg-gray-800 border border-gray-700 rounded-lg"
                placeholder="+358 40 123 4567"
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4">Liitteet (valinnainen)</h3>
            <p className="text-sm text-gray-400 mb-4">
              Voit ladata asiakirjoja jo nyt, tai myöhemmin asiakasportaalissa.
            </p>
            
            <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-sm text-gray-400 mb-2">Vedä tiedostot tähän tai</p>
              <label className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer">
                Valitse tiedostot
                <input 
                  type="file" 
                  multiple
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            </div>
            
            {formData.documents.length > 0 && (
              <div className="mt-4">
                <h4 className="font-medium mb-2">Ladatut tiedostot:</h4>
                <ul className="space-y-2">
                  {formData.documents.map((file, index) => (
                    <li key={index} className="flex items-center justify-between p-2 bg-gray-800 rounded-lg">
                      <span className="truncate max-w-xs">{file.name}</span>
                      <button 
                        onClick={() => handleRemoveFile(index)}
                        className="text-red-400 hover:text-red-300"
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
      default:
        return null;
    }
  };
  
  // Client Portal Component
  const ClientPortal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900 rounded-lg w-full max-w-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Asiakasportaali</h2>
          <button 
            onClick={() => setShowPortal(false)}
            className="text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </div>
        
        <div className="space-y-6">
          <div className="p-4 bg-gray-800 rounded-lg">
            <h3 className="text-lg font-medium mb-3 flex items-center">
              <FileText className="mr-2 h-5 w-5 text-blue-500" />
              Perunkirjoitus: {formData.deceasedFirstName} {formData.deceasedLastName}
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-300">
              <div>Kuolinpäivä: {formData.deathDate}</div>
              <div>Tila: Aloitettu</div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-3">Tarvittavat dokumentit</h3>
            <ul className="space-y-2">
              <li className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                <div className="flex items-center">
                  <FileText className="mr-2 h-5 w-5 text-gray-400" />
                  <span>Virkatodistus (vainaja)</span>
                </div>
                <button className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm">Lataa</button>
              </li>
              <li className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                <div className="flex items-center">
                  <FileText className="mr-2 h-5 w-5 text-gray-400" />
                  <span>Sukuselvitys</span>
                </div>
                <button className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm">Lataa</button>
              </li>
              {formData.hasWill && (
                <li className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                  <div className="flex items-center">
                    <FileText className="mr-2 h-5 w-5 text-gray-400" />
                    <span>Testamentti</span>
                  </div>
                  <button className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm">Lataa</button>
                </li>
              )}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-3">Tulevat tapaamiset</h3>
            <div className="p-4 bg-gray-800 rounded-lg">
              <p className="text-center text-gray-400">Ei tulevia tapaamisia.</p>
              <button className="w-full mt-3 bg-blue-600 text-white py-2 rounded-lg flex items-center justify-center">
                <Calendar className="mr-2 h-4 w-4" />
                Varaa aika
              </button>
            </div>
          </div>
          
          <div className="text-center">
            <button className="bg-gray-800 text-white px-6 py-2 rounded-lg" onClick={() => setShowPortal(false)}>
              Sulje
            </button>
          </div>
        </div>
      </div>
    </div>
  );
  
  // Success/Completion View
  const SuccessView = () => (
    <div className="text-center space-y-6 py-6">
      <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-full mb-4">
        <Check className="h-10 w-10 text-white" />
      </div>
      
      <h3 className="text-2xl font-bold">Kiitos tiedoista!</h3>
      <p className="text-gray-400 max-w-md mx-auto">
        Olemme vastaanottaneet tietosi ja asiantuntijamme käsittelee asian mahdollisimman pian.
      </p>
      
      <div className="flex flex-col gap-4 mt-6 max-w-md mx-auto">
        <button 
          onClick={() => setShowPortal(true)}
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg flex items-center justify-center"
        >
          <Shield className="mr-2 h-5 w-5" />
          Siirry asiakasportaaliin
        </button>
        
        <button 
          className="w-full bg-gray-800 border border-gray-700 text-white py-3 px-6 rounded-lg flex items-center justify-center"
        >
          <Calendar className="mr-2 h-5 w-5" />
          Varaa aika asiantuntijalle
        </button>
      </div>
    </div>
  );
  
  // Progress Indicator
  const ProgressIndicator = () => (
    <div className="flex items-center justify-between mb-8">
      {[0, 1, 2, 3].map((index) => (
        <React.Fragment key={index}>
          <div className="flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${step >= index ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400'}`}>
              {index + 1}
            </div>
            <span className="text-xs mt-1 text-gray-400">
              {index === 0 && "Vainajan tiedot"}
              {index === 1 && "Perhetilanne"}
              {index === 2 && "Yhteystiedot"}
              {index === 3 && "Liitteet"}
            </span>
          </div>
          
          {index < 3 && (
            <div className={`h-1 flex-1 ${step > index ? 'bg-blue-600' : 'bg-gray-800'}`}></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
  
  return (
    <div className="w-full max-w-3xl mx-auto rounded-xl overflow-hidden shadow-xl bg-gray-900 text-white border border-gray-800">
      <div className="p-6 border-b border-gray-800 flex justify-between items-center">
        <h2 className="text-2xl font-bold flex items-center">
          <FileText className="mr-2 h-6 w-6 text-blue-500" />
          Perunkirjoituspalvelu
        </h2>
        {/* Logo or branding could go here */}
      </div>
      
      <div className="p-6">
        {submitted ? (
          <SuccessView />
        ) : (
          <>
            <ProgressIndicator />
            {renderStep()}
            
            <div className="flex justify-between mt-8">
              {step > 0 ? (
                <button 
                  onClick={handleBack}
                  className="flex items-center px-4 py-2 bg-gray-800 rounded-lg"
                >
                  <ChevronLeft className="mr-1 h-4 w-4" />
                  Takaisin
                </button>
              ) : (
                <div></div> // Empty div to maintain spacing with flex justify-between
              )}
              
              <button 
                onClick={handleNext}
                disabled={!isStepValid()}
                className={`flex items-center px-6 py-2 rounded-lg ${isStepValid() ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-500 cursor-not-allowed'}`}
              >
                {step === 3 ? 'Lähetä' : 'Seuraava'}
                {step === 3 ? <Check className="ml-2 h-4 w-4" /> : <ChevronRight className="ml-2 h-4 w-4" />}
              </button>
            </div>
          </>
        )}
      </div>
      
      {/* Footer with security and info */}
      <div className="px-6 py-4 bg-gray-950 text-gray-400 text-sm flex items-center justify-center">
        <Shield className="mr-2 h-4 w-4" />
        Kaikki tiedot käsitellään luottamuksellisesti ja turvallisesti
      </div>
      
      {/* Client Portal Modal */}
      {showPortal && <ClientPortal />}
    </div>
  );
};

export default PeRuKiRjaWidget;