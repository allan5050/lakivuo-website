import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Check, Upload, FileText, Shield, ChevronLeft, ChevronRight, MessageSquare, UserCheck, Users, Briefcase, HeartHandshake, Edit3 } from 'lucide-react';

// Basic theme structure (consistent with PerukirjaLeadWidget)
const theme = {
  container: "bg-white text-gray-800 border border-gray-200 shadow-md",
  header: "border-gray-200 bg-white",
  inputs: "bg-gray-50 border border-gray-300 text-gray-800 focus:ring-blue-500 focus:border-blue-500",
  textarea: "bg-gray-50 border border-gray-300 text-gray-800 focus:ring-blue-500 focus:border-blue-500 min-h-[80px]",
  primaryButton: "bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-400",
  secondaryButton: "bg-gray-100 border border-gray-300 text-gray-800 hover:bg-gray-200",
  optionButtonSelected: "bg-blue-500 text-white border-blue-500",
  optionButton: "bg-gray-100 border-gray-300 hover:bg-gray-200",
  progressActive: "bg-blue-600 text-white",
  progressInactive: "bg-gray-200 text-gray-600",
  footer: "bg-gray-100 text-gray-600"
};

interface FormData {
    purpose: 'new' | 'review' | 'advice' | '';
    hasExistingTestamentDocument: boolean | null;
    canUploadExisting: boolean | null;
    primaryGoals: string;
    maritalStatus: 'naimisissa' | 'avoliitossa' | 'sinkku' | 'eronnut' | 'leski' | '';
    hasChildren: boolean | null;
    isBlendedFamily: boolean | null;
    isEntrepreneur: boolean | null;
    concerns: string[]; // e.g., ['tax', 'child_spouse_rights', 'other_beneficiaries']
    existingTestamentFile: File | null;
    contactFirstName: string;
    contactLastName: string;
    contactEmail: string;
    contactPhone: string;
}

const initialFormData: FormData = {
    purpose: '',
    hasExistingTestamentDocument: null,
    canUploadExisting: null,
    primaryGoals: '',
    maritalStatus: '',
    hasChildren: null,
    isBlendedFamily: null,
    isEntrepreneur: null,
    concerns: [],
    existingTestamentFile: null,
    contactFirstName: '',
    contactLastName: '',
    contactEmail: '',
    contactPhone: ''
};

const concernOptions = [
    { id: 'tax', label: 'Haluan keventää perintöverotusta' },
    { id: 'child_spouse_rights', label: 'Haluan suojata perinnön lapseni mahdolliselta aviopuolisolta avio-oikeuden kautta' },
    { id: 'other_beneficiaries', label: 'Haluan muistaa muita henkilöitä/tahoja (esim. kummilapsi, ystävä, hyväntekeväisyys)' },
    { id: 'spouse_security', label: 'Haluan turvata avo-/aviopuolisoni taloudellista asemaa' }
];

const TestamenttiLeadWidget = () => {
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState<FormData>(initialFormData);
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleRadioChange = (name: keyof FormData, value: any) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    
    const handleCheckboxChange = (concernId: string) => {
        setFormData(prev => {
            const newConcerns = prev.concerns.includes(concernId)
                ? prev.concerns.filter(c => c !== concernId)
                : [...prev.concerns, concernId];
            return { ...prev, concerns: newConcerns };
        });
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file && file.size > 5 * 1024 * 1024) { // Max 5MB
            alert("Tiedosto on liian suuri (max 5MB).");
            setFormData(prev => ({ ...prev, existingTestamentFile: null }));
            e.target.value = ""; // Reset file input
            return;
        }
        setFormData(prev => ({ ...prev, existingTestamentFile: file }));
    };

    const handleNext = () => {
        if (step < 3) { // Assuming 4 steps: 0, 1, 2, 3
            setStep(step + 1);
        } else {
            console.log("Testament Widget Data Submitted:", formData);
            setSubmitted(true);
        }
    };

    const handleBack = () => {
        if (step > 0) setStep(step - 1);
    };
    
    const isStepValid = () => {
        switch(step) {
            case 0: return formData.purpose !== '';
            case 1: return true; // Life situation is mostly optional/descriptive
            case 2: // Upload step is conditional or contact info
                 if (formData.purpose === 'review' && formData.hasExistingTestamentDocument && formData.canUploadExisting) {
                    return true; // File upload is optional
                 }
                 return formData.contactFirstName && formData.contactLastName && formData.contactEmail; // If it's contact step
            case 3: // Final contact step if upload was step 2
                return formData.contactFirstName && formData.contactLastName && formData.contactEmail;
            default: return false;
        }
    };

    const renderWidgetStep = () => {
        switch (step) {
            case 0: // Purpose
                return (
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold mb-1">Testamenttiasiat – Kartoitetaan tarpeesi</h3>
                        <p className="text-sm text-gray-600">Valitse alta, mikä parhaiten kuvaa tilannettasi.</p>
                        {(['new', 'review', 'advice'] as const).map(p => (
                            <button key={p} type="button" onClick={() => handleRadioChange('purpose', p)}
                                className={`w-full text-left p-4 rounded-lg border-2 flex items-center justify-between transition-all ${formData.purpose === p ? theme.optionButtonSelected : theme.optionButton}`}>
                                <span>
                                    {p === 'new' && 'Haluan laatia uuden testamentin'}
                                    {p === 'review' && 'Haluan tarkistuttaa tai päivittää nykyisen testamenttini'}
                                    {p === 'advice' && 'Haluan yleistä neuvontaa testamenttiin liittyen'}
                                </span>
                                {formData.purpose === p && <Check className="h-5 w-5" />}
                            </button>
                        ))}
                        {formData.purpose === 'review' && (
                            <div className="mt-4 space-y-3 p-4 bg-gray-50 rounded-md border border-gray-200">
                                <p className="text-sm font-medium">Koskien nykyistä testamenttiasi:</p>
                                <label className="block text-sm">Onko sinulla testamenttiasiakirja saatavilla?</label>
                                <div className="flex space-x-3">
                                    <button type="button" onClick={() => handleRadioChange('hasExistingTestamentDocument', true)} className={`px-3 py-1.5 text-sm rounded ${formData.hasExistingTestamentDocument === true ? theme.primaryButton : theme.secondaryButton}`}>Kyllä</button>
                                    <button type="button" onClick={() => { handleRadioChange('hasExistingTestamentDocument', false); handleRadioChange('canUploadExisting', false); }} className={`px-3 py-1.5 text-sm rounded ${formData.hasExistingTestamentDocument === false ? theme.primaryButton : theme.secondaryButton}`}>Ei</button>
                                </div>
                                {formData.hasExistingTestamentDocument && (
                                    <>
                                        <label className="block text-sm pt-2">Haluatko ladata sen alustavaa arviota varten?</label>
                                        <div className="flex space-x-3">
                                            <button type="button" onClick={() => handleRadioChange('canUploadExisting', true)} className={`px-3 py-1.5 text-sm rounded ${formData.canUploadExisting === true ? theme.primaryButton : theme.secondaryButton}`}>Kyllä, lataan nyt</button>
                                            <button type="button" onClick={() => handleRadioChange('canUploadExisting', false)} className={`px-3 py-1.5 text-sm rounded ${formData.canUploadExisting === false ? theme.primaryButton : theme.secondaryButton}`}>En, tai myöhemmin</button>
                                        </div>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                );
            case 1: // Life Situation & Wishes
                return (
                    <div className="space-y-5">
                        <h3 className="text-xl font-semibold mb-1">Elämäntilanteesi ja toiveesi</h3>
                        <div>
                            <label htmlFor="primaryGoals" className="block text-sm font-medium mb-1">Kuvaile lyhyesti pääasialliset tavoitteesi tai huolenaiheesi testamenttiin liittyen:</label>
                            <textarea name="primaryGoals" id="primaryGoals" value={formData.primaryGoals} onChange={handleChange} className={`w-full p-2 rounded-lg ${theme.textarea}`} rows={3}></textarea>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Elämäntilanne (valitse sopivat):</label>
                            <div className="space-y-2">
                                <select name="maritalStatus" value={formData.maritalStatus} onChange={handleChange} className={`w-full p-2 rounded-lg ${theme.inputs}`}>
                                    <option value="">Valitse siviilisääty...</option>
                                    <option value="naimisissa">Naimisissa</option>
                                    <option value="avoliitossa">Avoliitossa</option>
                                    <option value="sinkku">Sinkku</option>
                                    <option value="eronnut">Eronnut</option>
                                    <option value="leski">Leski</option>
                                </select>
                                <label className="flex items-center space-x-2">
                                    <input type="checkbox" checked={formData.hasChildren || false} onChange={e => handleRadioChange('hasChildren', e.target.checked)} className="rounded"/>
                                    <span>Minulla on lapsia</span>
                                </label>
                                {formData.hasChildren && (
                                     <label className="flex items-center space-x-2 ml-6">
                                        <input type="checkbox" checked={formData.isBlendedFamily || false} onChange={e => handleRadioChange('isBlendedFamily', e.target.checked)} className="rounded"/>
                                        <span>Kyseessä on uusperhe</span>
                                    </label>
                                )}
                                <label className="flex items-center space-x-2">
                                    <input type="checkbox" checked={formData.isEntrepreneur || false} onChange={e => handleRadioChange('isEntrepreneur', e.target.checked)} className="rounded"/>
                                    <span>Olen yrittäjä</span>
                                </label>
                            </div>
                        </div>
                         <div>
                            <label className="block text-sm font-medium mb-2">Muita huomioitavia seikkoja (valitse sopivat):</label>
                            <div className="space-y-2">
                                {concernOptions.map(opt => (
                                    <label key={opt.id} className="flex items-center space-x-2">
                                        <input type="checkbox" checked={formData.concerns.includes(opt.id)} onChange={() => handleCheckboxChange(opt.id)} className="rounded"/>
                                        <span>{opt.label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                );
            case 2: // Optional Upload or Contact Info
                if (formData.purpose === 'review' && formData.hasExistingTestamentDocument && formData.canUploadExisting) {
                    return ( // Upload Step
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold">Lataa nykyinen testamenttisi (valinnainen)</h3>
                            <p className="text-xs text-gray-500">Lataamalla asiakirjan hyväksyt, että voimme tehdä siitä alustavan analyysin. Asiakirjaasi käsitellään luottamuksellisesti.</p>
                            <div className={`border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500`}>
                                <Upload className="mx-auto h-10 w-10 text-gray-400 mb-3" />
                                <label htmlFor="testamentUpload" className={`inline-block ${theme.primaryButton} px-3 py-1.5 rounded-md cursor-pointer text-sm`}>
                                    {formData.existingTestamentFile ? 'Vaihda tiedosto' : 'Valitse tiedosto'}
                                    <input id="testamentUpload" type="file" className="hidden" onChange={handleFileChange} accept="application/pdf,.doc,.docx,image/*" />
                                </label>
                                {formData.existingTestamentFile && <p className="text-sm text-gray-600 mt-2">Valittu: {formData.existingTestamentFile.name}</p>}
                            </div>
                        </div>
                    );
                }
                // Fallthrough to Contact Info if not uploading
            case 3: // Contact Information (always the last data entry step)
                 return (
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold mb-4">Yhteystietosi</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="contactFirstName" className="block text-sm font-medium mb-1">Etunimi</label>
                                <input type="text" name="contactFirstName" id="contactFirstName" value={formData.contactFirstName} onChange={handleChange} className={`w-full p-2 rounded-lg ${theme.inputs}`} />
                            </div>
                            <div>
                                <label htmlFor="contactLastName" className="block text-sm font-medium mb-1">Sukunimi</label>
                                <input type="text" name="contactLastName" id="contactLastName" value={formData.contactLastName} onChange={handleChange} className={`w-full p-2 rounded-lg ${theme.inputs}`} />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="contactEmail" className="block text-sm font-medium mb-1">Sähköposti</label>
                            <input type="email" name="contactEmail" id="contactEmail" value={formData.contactEmail} onChange={handleChange} className={`w-full p-2 rounded-lg ${theme.inputs}`} />
                        </div>
                        <div>
                            <label htmlFor="contactPhone" className="block text-sm font-medium mb-1">Puhelinnumero (valinnainen)</label>
                            <input type="tel" name="contactPhone" id="contactPhone" value={formData.contactPhone} onChange={handleChange} className={`w-full p-2 rounded-lg ${theme.inputs}`} />
                        </div>
                    </div>
                );
            default: return null;
        }
    };
    
    const getProgressSteps = () => {
        let stepsConfig = [
            { label: "Tarve", icon: <MessageSquare/> },
            { label: "Tilanne", icon: <Users/> },
        ];
        if (formData.purpose === 'review' && formData.hasExistingTestamentDocument && formData.canUploadExisting) {
            stepsConfig.push({ label: "Dokumentti", icon: <Upload /> });
        }
        stepsConfig.push({ label: "Yhteystiedot", icon: <UserCheck/> });
        stepsConfig.push({ label: "Valmis", icon: <Check /> }); // For display only
        return stepsConfig;
    };

    const progressSteps = getProgressSteps();
    const currentDisplayStepCount = progressSteps.length -1; // Number of actual data entry steps

    const ProgressIndicator = () => (
        <div className="flex items-center justify-between mb-8">
            {progressSteps.slice(0, -1).map((s, index) => (
                <React.Fragment key={index}>
                    <div className="flex flex-col items-center text-center">
                         <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium border-2
                            ${step > index ? `${theme.progressActive} border-blue-700` : step === index ? `${theme.progressActive} border-blue-700 shadow-lg` : `${theme.progressInactive} border-gray-300`}
                            transition-all duration-300 ease-in-out`}>
                            {step > index ? <Check className="h-5 w-5" /> : React.cloneElement(s.icon, {className:"h-5 w-5"})}
                        </div>
                        <span className={`text-xs mt-1.5 w-20 truncate ${step >= index ? 'text-blue-600 font-semibold' : 'text-gray-500'}`}>{s.label}</span>
                    </div>
                    {index < currentDisplayStepCount - 1 && (
                        <div className={`h-1 flex-1 mx-1 rounded ${step > index ? theme.progressActive : theme.progressInactive} transition-all duration-300 ease-in-out`}></div>
                    )}
                </React.Fragment>
            ))}
        </div>
    );

    const SuccessView = () => (
        <div className="text-center space-y-5 py-8">
            <div className={`inline-flex items-center justify-center w-16 h-16 ${theme.primaryButton} rounded-full mb-3`}>
                <HeartHandshake className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold">Kiitos tiedoista!</h3>
            <p className="text-gray-600 max-w-md mx-auto text-sm">
                Olemme vastaanottaneet testamenttiasi koskevat esitietosi. Lakimiehemme on sinuun yhteydessä mahdollisimman pian.
            </p>
            <p className="text-xs text-gray-500 mt-4">Voit nyt sulkea tämän näkymän.</p>
        </div>
    );


    return (
        <div className={`w-full max-w-2xl mx-auto rounded-xl overflow-hidden ${theme.container} p-0 font-sans`}>
            <div className={`p-5 border-b ${theme.header}`}>
                <h2 className="text-xl font-semibold flex items-center">
                    <Edit3 className="mr-2.5 h-6 w-6 text-blue-600" />
                    Testamentin esitietojen keräys
                </h2>
            </div>

            <div className="p-5 sm:p-6">
                {submitted ? (
                    <SuccessView />
                ) : (
                    <>
                        <ProgressIndicator />
                        <div className="min-h-[300px] sm:min-h-[340px]"> {/* Consistent height */}
                           {renderWidgetStep()}
                        </div>
                        <div className="flex justify-between items-center mt-6 pt-5 border-t border-gray-200">
                            {step > 0 ? (
                                <button type="button" onClick={handleBack} className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium ${theme.secondaryButton}`}>
                                    <ChevronLeft className="mr-1 h-4 w-4" /> Takaisin
                                </button>
                            ) : <div className="w-24"></div>} {/* Placeholder for spacing */}
                            <button
                                type="button"
                                onClick={handleNext}
                                disabled={!isStepValid()}
                                className={`flex items-center px-5 py-2 rounded-lg text-sm font-medium ${theme.primaryButton}`}
                            >
                                {step === currentDisplayStepCount -1 ? 'Lähetä tiedot' : 'Seuraava'}
                                {step === currentDisplayStepCount -1 ? <Check className="ml-2 h-4 w-4" /> : <ChevronRight className="ml-1.5 h-4 w-4" />}
                            </button>
                        </div>
                    </>
                )}
            </div>

            <div className={`px-6 py-2.5 ${theme.footer} text-xs flex items-center justify-center`}>
                <Shield className="mr-1.5 h-3 w-3" /> Kaikki tiedot käsitellään luottamuksellisesti ja turvallisesti.
            </div>
        </div>
    );
};

export default TestamenttiLeadWidget;
