import React, { useState } from 'react';
import { Check, Upload, FileText, Shield, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';

// Define a basic theme structure for styling (mimicking the light theme)
const theme = {
  container: "bg-white text-gray-800 border border-gray-200 shadow-md",
  header: "border-gray-200 bg-white",
  inputs: "bg-gray-50 border border-gray-300 text-gray-800 focus:ring-blue-500 focus:border-blue-500",
  primaryButton: "bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-400",
  secondaryButton: "bg-gray-100 border border-gray-300 text-gray-800 hover:bg-gray-200",
  progressActive: "bg-blue-600 text-white",
  progressInactive: "bg-gray-200 text-gray-600",
  footer: "bg-gray-100 text-gray-600"
};

const PerukirjaLeadWidget = () => {
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState({
        deceasedFirstName: 'Matti', // Pre-filled demo data
        deceasedLastName: 'Virtanen', // Pre-filled demo data
        deathDate: '2025-04-15', // Pre-filled demo data
        hasChildren: null,
        hasSpouse: null,
        hasWill: null,
        contactFirstName: 'Liisa', // Pre-filled demo data
        contactLastName: 'Virtanen', // Pre-filled demo data
        contactEmail: 'liisa.virtanen@example.com', // Pre-filled demo data
        contactPhone: '+358 40 123 4567', // Pre-filled demo data
        documents: [] as File[]
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleRadioChange = (name: string, value: boolean | null) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files ? Array.from(e.target.files) : [];
        // Basic validation example (can be expanded)
        const validFiles = files.filter(file => file.size < 5 * 1024 * 1024 && (file.type === "application/pdf" || file.type.startsWith("image/")));
        
        if (validFiles.length !== files.length) {
            alert("Jotkin tiedostot olivat liian suuria (max 5MB) tai väärää tyyppiä (sallittu: PDF, kuvat).");
        }
        setFormData(prev => ({ ...prev, documents: [...prev.documents, ...validFiles] }));
    };

    const handleRemoveFile = (index: number) => {
        setFormData(prev => ({ ...prev, documents: prev.documents.filter((_, i) => i !== index) }));
    };

    const handleNext = () => {
        if (step < 3) {
            setStep(step + 1);
        } else {
            // Here you would typically send the data to a server
            console.log("Form Data Submitted:", formData);
            setSubmitted(true);
        }
    };

    const handleBack = () => {
        if (step > 0) {
            setStep(step - 1);
        }
    };

    const isStepValid = () => {
        switch (step) {
            case 0:
                return formData.deceasedFirstName && formData.deceasedLastName && formData.deathDate;
            case 1:
                return formData.hasChildren !== null && formData.hasSpouse !== null && formData.hasWill !== null;
            case 2:
                return formData.contactFirstName && formData.contactLastName && formData.contactEmail;
            case 3: // Documents step is optional or might have its own validation
                return true;
            default:
                return false;
        }
    };

    const renderWidgetStep = () => {
        switch (step) {
            case 0: // Vainajan tiedot
                return (
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold mb-4">Vainajan tiedot</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="deceasedFirstName" className="block text-sm font-medium mb-1">Etunimi</label>
                                <input type="text" name="deceasedFirstName" id="deceasedFirstName" value={formData.deceasedFirstName} onChange={handleChange} className={`w-full p-2 rounded-lg ${theme.inputs}`} placeholder="Matti" />
                            </div>
                            <div>
                                <label htmlFor="deceasedLastName" className="block text-sm font-medium mb-1">Sukunimi</label>
                                <input type="text" name="deceasedLastName" id="deceasedLastName" value={formData.deceasedLastName} onChange={handleChange} className={`w-full p-2 rounded-lg ${theme.inputs}`} placeholder="Virtanen" />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="deathDate" className="block text-sm font-medium mb-1">Kuolinpäivä</label>
                            <input type="date" name="deathDate" id="deathDate" value={formData.deathDate} onChange={handleChange} className={`w-full p-2 rounded-lg ${theme.inputs}`} />
                        </div>
                    </div>
                );
            case 1: // Perhetilanne
                return (
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold mb-4">Perhetilanne</h3>
                        {['hasChildren', 'hasSpouse', 'hasWill'].map(key => (
                            <div key={key} className="mb-4">
                                <p className="block text-sm font-medium mb-2">
                                    {key === 'hasChildren' && 'Oliko vainajalla lapsia?'}
                                    {key === 'hasSpouse' && 'Oliko vainaja naimisissa / rekisteröidyssä parisuhteessa?'}
                                    {key === 'hasWill' && 'Onko testamenttia tiedossa?'}
                                </p>
                                <div className="flex space-x-4">
                                    <button type="button" onClick={() => handleRadioChange(key, true)} className={`flex items-center px-4 py-2 rounded-lg ${(formData as any)[key] === true ? theme.primaryButton : theme.secondaryButton}`}>
                                        Kyllä {(formData as any)[key] === true && <Check className="ml-2 h-4 w-4" />}
                                    </button>
                                    <button type="button" onClick={() => handleRadioChange(key, false)} className={`flex items-center px-4 py-2 rounded-lg ${(formData as any)[key] === false ? theme.primaryButton : theme.secondaryButton}`}>
                                        Ei {(formData as any)[key] === false && <Check className="ml-2 h-4 w-4" />}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                );
            case 2: // Yhteystiedot
                return (
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold mb-4">Yhteystiedot (ensisijainen yhteydenottaja)</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="contactFirstName" className="block text-sm font-medium mb-1">Etunimi</label>
                                <input type="text" name="contactFirstName" id="contactFirstName" value={formData.contactFirstName} onChange={handleChange} className={`w-full p-2 rounded-lg ${theme.inputs}`} placeholder="Liisa" />
                            </div>
                            <div>
                                <label htmlFor="contactLastName" className="block text-sm font-medium mb-1">Sukunimi</label>
                                <input type="text" name="contactLastName" id="contactLastName" value={formData.contactLastName} onChange={handleChange} className={`w-full p-2 rounded-lg ${theme.inputs}`} placeholder="Esimerkki" />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="contactEmail" className="block text-sm font-medium mb-1">Sähköposti</label>
                            <input type="email" name="contactEmail" id="contactEmail" value={formData.contactEmail} onChange={handleChange} className={`w-full p-2 rounded-lg ${theme.inputs}`} placeholder="liisa.esimerkki@example.com" />
                        </div>
                        <div>
                            <label htmlFor="contactPhone" className="block text-sm font-medium mb-1">Puhelinnumero</label>
                            <input type="tel" name="contactPhone" id="contactPhone" value={formData.contactPhone} onChange={handleChange} className={`w-full p-2 rounded-lg ${theme.inputs}`} placeholder="+358 40 123 4567" />
                        </div>
                    </div>
                );
            case 3: // Liitteet
                return (
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold mb-4">Liitteet (valinnainen)</h3>
                        <p className="text-sm text-gray-600 mb-4">
                            Voit ladata asiakirjoja kuten virkatodistukset, sukuselvitykset, testamentin kopion jne. (PDF, kuvat, max 5MB/tiedosto).
                        </p>
                        <div className={`border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors`}>
                            <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                            <p className="text-sm text-gray-500 mb-2">Vedä tiedostot tähän tai</p>
                            <label htmlFor="fileUpload" className={`inline-block ${theme.primaryButton} px-4 py-2 rounded-lg cursor-pointer text-sm`}>
                                Valitse tiedostot
                                <input id="fileUpload" type="file" multiple className="hidden" onChange={handleFileChange} accept="application/pdf,image/*" />
                            </label>
                        </div>
                        {formData.documents.length > 0 && (
                            <div className="mt-4">
                                <h4 className="font-medium mb-2 text-sm">Ladatut tiedostot:</h4>
                                <ul className="space-y-2">
                                    {formData.documents.map((file, index) => (
                                        <li key={index} className="flex items-center justify-between p-2 bg-gray-100 rounded-lg text-sm">
                                            <span className="truncate max-w-xs">{file.name} ({Math.round(file.size / 1024)}KB)</span>
                                            <button type="button" onClick={() => handleRemoveFile(index)} className="text-red-500 hover:text-red-700 font-medium">Poista</button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                );
            default: return null;
        }
    };

    const SuccessView = () => (
        <div className="text-center space-y-6 py-8">
            <div className={`inline-flex items-center justify-center w-16 h-16 ${theme.primaryButton} rounded-full mb-4`}>
                <Check className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold">Kiitos yhteydenotostasi!</h3>
            <p className="text-gray-600 max-w-md mx-auto">
                Olemme vastaanottaneet tietosi. Asiantuntijamme on sinuun yhteydessä mahdollisimman pian.
            </p>
            <p className="text-sm text-gray-500">
                Voit sulkea tämän ikkunan.
            </p>
        </div>
    );

    const ProgressIndicator = () => {
        const steps = ["Vainajan tiedot", "Perhetilanne", "Yhteystiedot", "Liitteet", "Valmis"];
        return (
            <div className="flex items-center justify-between mb-8">
                {steps.slice(0, -1).map((label, index) => ( // Exclude "Valmis" from being a clickable step circle
                    <React.Fragment key={index}>
                        <div className="flex flex-col items-center text-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                                ${step > index ? `${theme.progressActive} border-2 border-blue-700` : step === index ? theme.progressActive : theme.progressInactive}
                                transition-all duration-300 ease-in-out`}>
                                {step > index ? <Check className="h-4 w-4" /> : index + 1}
                            </div>
                            <span className={`text-xs mt-1 w-20 truncate ${step >= index ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>{label}</span>
                        </div>
                        {index < steps.length - 2 && ( // Connector line
                            <div className={`h-1 flex-1 mx-1 rounded
                                ${step > index ? theme.progressActive : theme.progressInactive}
                                transition-all duration-300 ease-in-out`}></div>
                        )}
                    </React.Fragment>
                ))}
            </div>
        );
    };

    return (
        <div className={`w-full max-w-2xl mx-auto rounded-xl overflow-hidden ${theme.container} p-0 font-sans`}> {/* Use a generic font stack or ensure Inter is loaded on host page */}
            <div className={`p-5 border-b ${theme.header}`}>
                <h2 className="text-xl font-semibold flex items-center">
                    <FileText className="mr-2 h-6 w-6 text-blue-600" />
                    Perunkirjoituspalvelu - Esitietojen keräys
                </h2>
            </div>

            <div className="p-6">
                {submitted ? (
                    <SuccessView />
                ) : (
                    <>
                        <ProgressIndicator />
                        <div className="min-h-[250px]"> {/* Ensure consistent height for steps */}
                           {renderWidgetStep()}
                        </div>
                        <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
                            {step > 0 ? (
                                <button type="button" onClick={handleBack} className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium ${theme.secondaryButton}`}>
                                    <ChevronLeft className="mr-1 h-4 w-4" /> Takaisin
                                </button>
                            ) : <div />} {/* Placeholder for spacing */}
                            <button
                                type="button"
                                onClick={handleNext}
                                disabled={!isStepValid()}
                                className={`flex items-center px-6 py-2 rounded-lg text-sm font-medium ${theme.primaryButton}`}
                            >
                                {step === 3 ? 'Lähetä tiedot' : 'Seuraava'}
                                {step === 3 ? <Check className="ml-2 h-4 w-4" /> : <ChevronRight className="ml-1 h-4 w-4" />}
                            </button>
                        </div>
                    </>
                )}
            </div>

            <div className={`px-6 py-3 ${theme.footer} text-xs flex items-center justify-center`}>
                <Shield className="mr-2 h-3 w-3" /> Kaikki tiedot käsitellään luottamuksellisesti ja turvallisesti.
            </div>
        </div>
    );
};

export default PerukirjaLeadWidget;