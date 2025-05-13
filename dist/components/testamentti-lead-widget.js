import React, { useState } from 'react';
import { Check, Upload, Shield, ChevronLeft, ChevronRight, MessageSquare, UserCheck, Users, HeartHandshake, Edit3 } from 'lucide-react';
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
const initialFormData = {
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
    const [formData, setFormData] = useState(initialFormData);
    const [submitted, setSubmitted] = useState(false);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => (Object.assign(Object.assign({}, prev), { [name]: value })));
    };
    const handleRadioChange = (name, value) => {
        setFormData(prev => (Object.assign(Object.assign({}, prev), { [name]: value })));
    };
    const handleCheckboxChange = (concernId) => {
        setFormData(prev => {
            const newConcerns = prev.concerns.includes(concernId)
                ? prev.concerns.filter(c => c !== concernId)
                : [...prev.concerns, concernId];
            return Object.assign(Object.assign({}, prev), { concerns: newConcerns });
        });
    };
    const handleFileChange = (e) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file && file.size > 5 * 1024 * 1024) { // Max 5MB
            alert("Tiedosto on liian suuri (max 5MB).");
            setFormData(prev => (Object.assign(Object.assign({}, prev), { existingTestamentFile: null })));
            e.target.value = ""; // Reset file input
            return;
        }
        setFormData(prev => (Object.assign(Object.assign({}, prev), { existingTestamentFile: file })));
    };
    const handleNext = () => {
        if (step < 3) { // Assuming 4 steps: 0, 1, 2, 3
            setStep(step + 1);
        }
        else {
            console.log("Testament Widget Data Submitted:", formData);
            setSubmitted(true);
        }
    };
    const handleBack = () => {
        if (step > 0)
            setStep(step - 1);
    };
    const isStepValid = () => {
        switch (step) {
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
                return (React.createElement("div", { className: "space-y-6" },
                    React.createElement("h3", { className: "text-xl font-semibold mb-1" }, "Testamenttiasiat \u2013 Kartoitetaan tarpeesi"),
                    React.createElement("p", { className: "text-sm text-gray-600" }, "Valitse alta, mik\u00E4 parhaiten kuvaa tilannettasi."),
                    ['new', 'review', 'advice'].map(p => (React.createElement("button", { key: p, type: "button", onClick: () => handleRadioChange('purpose', p), className: `w-full text-left p-4 rounded-lg border-2 flex items-center justify-between transition-all ${formData.purpose === p ? theme.optionButtonSelected : theme.optionButton}` },
                        React.createElement("span", null,
                            p === 'new' && 'Haluan laatia uuden testamentin',
                            p === 'review' && 'Haluan tarkistuttaa tai päivittää nykyisen testamenttini',
                            p === 'advice' && 'Haluan yleistä neuvontaa testamenttiin liittyen'),
                        formData.purpose === p && React.createElement(Check, { className: "h-5 w-5" })))),
                    formData.purpose === 'review' && (React.createElement("div", { className: "mt-4 space-y-3 p-4 bg-gray-50 rounded-md border border-gray-200" },
                        React.createElement("p", { className: "text-sm font-medium" }, "Koskien nykyist\u00E4 testamenttiasi:"),
                        React.createElement("label", { className: "block text-sm" }, "Onko sinulla testamenttiasiakirja saatavilla?"),
                        React.createElement("div", { className: "flex space-x-3" },
                            React.createElement("button", { type: "button", onClick: () => handleRadioChange('hasExistingTestamentDocument', true), className: `px-3 py-1.5 text-sm rounded ${formData.hasExistingTestamentDocument === true ? theme.primaryButton : theme.secondaryButton}` }, "Kyll\u00E4"),
                            React.createElement("button", { type: "button", onClick: () => { handleRadioChange('hasExistingTestamentDocument', false); handleRadioChange('canUploadExisting', false); }, className: `px-3 py-1.5 text-sm rounded ${formData.hasExistingTestamentDocument === false ? theme.primaryButton : theme.secondaryButton}` }, "Ei")),
                        formData.hasExistingTestamentDocument && (React.createElement(React.Fragment, null,
                            React.createElement("label", { className: "block text-sm pt-2" }, "Haluatko ladata sen alustavaa arviota varten?"),
                            React.createElement("div", { className: "flex space-x-3" },
                                React.createElement("button", { type: "button", onClick: () => handleRadioChange('canUploadExisting', true), className: `px-3 py-1.5 text-sm rounded ${formData.canUploadExisting === true ? theme.primaryButton : theme.secondaryButton}` }, "Kyll\u00E4, lataan nyt"),
                                React.createElement("button", { type: "button", onClick: () => handleRadioChange('canUploadExisting', false), className: `px-3 py-1.5 text-sm rounded ${formData.canUploadExisting === false ? theme.primaryButton : theme.secondaryButton}` }, "En, tai my\u00F6hemmin"))))))));
            case 1: // Life Situation & Wishes
                return (React.createElement("div", { className: "space-y-5" },
                    React.createElement("h3", { className: "text-xl font-semibold mb-1" }, "El\u00E4m\u00E4ntilanteesi ja toiveesi"),
                    React.createElement("div", null,
                        React.createElement("label", { htmlFor: "primaryGoals", className: "block text-sm font-medium mb-1" }, "Kuvaile lyhyesti p\u00E4\u00E4asialliset tavoitteesi tai huolenaiheesi testamenttiin liittyen:"),
                        React.createElement("textarea", { name: "primaryGoals", id: "primaryGoals", value: formData.primaryGoals, onChange: handleChange, className: `w-full p-2 rounded-lg ${theme.textarea}`, rows: 3 })),
                    React.createElement("div", null,
                        React.createElement("label", { className: "block text-sm font-medium mb-2" }, "El\u00E4m\u00E4ntilanne (valitse sopivat):"),
                        React.createElement("div", { className: "space-y-2" },
                            React.createElement("select", { name: "maritalStatus", value: formData.maritalStatus, onChange: handleChange, className: `w-full p-2 rounded-lg ${theme.inputs}` },
                                React.createElement("option", { value: "" }, "Valitse siviilis\u00E4\u00E4ty..."),
                                React.createElement("option", { value: "naimisissa" }, "Naimisissa"),
                                React.createElement("option", { value: "avoliitossa" }, "Avoliitossa"),
                                React.createElement("option", { value: "sinkku" }, "Sinkku"),
                                React.createElement("option", { value: "eronnut" }, "Eronnut"),
                                React.createElement("option", { value: "leski" }, "Leski")),
                            React.createElement("label", { className: "flex items-center space-x-2" },
                                React.createElement("input", { type: "checkbox", checked: formData.hasChildren || false, onChange: e => handleRadioChange('hasChildren', e.target.checked), className: "rounded" }),
                                React.createElement("span", null, "Minulla on lapsia")),
                            formData.hasChildren && (React.createElement("label", { className: "flex items-center space-x-2 ml-6" },
                                React.createElement("input", { type: "checkbox", checked: formData.isBlendedFamily || false, onChange: e => handleRadioChange('isBlendedFamily', e.target.checked), className: "rounded" }),
                                React.createElement("span", null, "Kyseess\u00E4 on uusperhe"))),
                            React.createElement("label", { className: "flex items-center space-x-2" },
                                React.createElement("input", { type: "checkbox", checked: formData.isEntrepreneur || false, onChange: e => handleRadioChange('isEntrepreneur', e.target.checked), className: "rounded" }),
                                React.createElement("span", null, "Olen yritt\u00E4j\u00E4")))),
                    React.createElement("div", null,
                        React.createElement("label", { className: "block text-sm font-medium mb-2" }, "Muita huomioitavia seikkoja (valitse sopivat):"),
                        React.createElement("div", { className: "space-y-2" }, concernOptions.map(opt => (React.createElement("label", { key: opt.id, className: "flex items-center space-x-2" },
                            React.createElement("input", { type: "checkbox", checked: formData.concerns.includes(opt.id), onChange: () => handleCheckboxChange(opt.id), className: "rounded" }),
                            React.createElement("span", null, opt.label))))))));
            case 2: // Optional Upload or Contact Info
                if (formData.purpose === 'review' && formData.hasExistingTestamentDocument && formData.canUploadExisting) {
                    return ( // Upload Step
                    React.createElement("div", { className: "space-y-4" },
                        React.createElement("h3", { className: "text-xl font-semibold" }, "Lataa nykyinen testamenttisi (valinnainen)"),
                        React.createElement("p", { className: "text-xs text-gray-500" }, "Lataamalla asiakirjan hyv\u00E4ksyt, ett\u00E4 voimme tehd\u00E4 siit\u00E4 alustavan analyysin. Asiakirjaasi k\u00E4sitell\u00E4\u00E4n luottamuksellisesti."),
                        React.createElement("div", { className: `border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500` },
                            React.createElement(Upload, { className: "mx-auto h-10 w-10 text-gray-400 mb-3" }),
                            React.createElement("label", { htmlFor: "testamentUpload", className: `inline-block ${theme.primaryButton} px-3 py-1.5 rounded-md cursor-pointer text-sm` },
                                formData.existingTestamentFile ? 'Vaihda tiedosto' : 'Valitse tiedosto',
                                React.createElement("input", { id: "testamentUpload", type: "file", className: "hidden", onChange: handleFileChange, accept: "application/pdf,.doc,.docx,image/*" })),
                            formData.existingTestamentFile && React.createElement("p", { className: "text-sm text-gray-600 mt-2" },
                                "Valittu: ",
                                formData.existingTestamentFile.name))));
                }
            // Fallthrough to Contact Info if not uploading
            case 3: // Contact Information (always the last data entry step)
                return (React.createElement("div", { className: "space-y-4" },
                    React.createElement("h3", { className: "text-xl font-semibold mb-4" }, "Yhteystietosi"),
                    React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4" },
                        React.createElement("div", null,
                            React.createElement("label", { htmlFor: "contactFirstName", className: "block text-sm font-medium mb-1" }, "Etunimi"),
                            React.createElement("input", { type: "text", name: "contactFirstName", id: "contactFirstName", value: formData.contactFirstName, onChange: handleChange, className: `w-full p-2 rounded-lg ${theme.inputs}` })),
                        React.createElement("div", null,
                            React.createElement("label", { htmlFor: "contactLastName", className: "block text-sm font-medium mb-1" }, "Sukunimi"),
                            React.createElement("input", { type: "text", name: "contactLastName", id: "contactLastName", value: formData.contactLastName, onChange: handleChange, className: `w-full p-2 rounded-lg ${theme.inputs}` }))),
                    React.createElement("div", null,
                        React.createElement("label", { htmlFor: "contactEmail", className: "block text-sm font-medium mb-1" }, "S\u00E4hk\u00F6posti"),
                        React.createElement("input", { type: "email", name: "contactEmail", id: "contactEmail", value: formData.contactEmail, onChange: handleChange, className: `w-full p-2 rounded-lg ${theme.inputs}` })),
                    React.createElement("div", null,
                        React.createElement("label", { htmlFor: "contactPhone", className: "block text-sm font-medium mb-1" }, "Puhelinnumero (valinnainen)"),
                        React.createElement("input", { type: "tel", name: "contactPhone", id: "contactPhone", value: formData.contactPhone, onChange: handleChange, className: `w-full p-2 rounded-lg ${theme.inputs}` }))));
            default: return null;
        }
    };
    const getProgressSteps = () => {
        let stepsConfig = [
            { label: "Tarve", icon: React.createElement(MessageSquare, null) },
            { label: "Tilanne", icon: React.createElement(Users, null) },
        ];
        if (formData.purpose === 'review' && formData.hasExistingTestamentDocument && formData.canUploadExisting) {
            stepsConfig.push({ label: "Dokumentti", icon: React.createElement(Upload, null) });
        }
        stepsConfig.push({ label: "Yhteystiedot", icon: React.createElement(UserCheck, null) });
        stepsConfig.push({ label: "Valmis", icon: React.createElement(Check, null) }); // For display only
        return stepsConfig;
    };
    const progressSteps = getProgressSteps();
    const currentDisplayStepCount = progressSteps.length - 1; // Number of actual data entry steps
    const ProgressIndicator = () => (React.createElement("div", { className: "flex items-center justify-between mb-8" }, progressSteps.slice(0, -1).map((s, index) => (React.createElement(React.Fragment, { key: index },
        React.createElement("div", { className: "flex flex-col items-center text-center" },
            React.createElement("div", { className: `w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium border-2
                            ${step > index ? `${theme.progressActive} border-blue-700` : step === index ? `${theme.progressActive} border-blue-700 shadow-lg` : `${theme.progressInactive} border-gray-300`}
                            transition-all duration-300 ease-in-out` }, step > index ? React.createElement(Check, { className: "h-5 w-5" }) : React.cloneElement(s.icon, { className: "h-5 w-5" })),
            React.createElement("span", { className: `text-xs mt-1.5 w-20 truncate ${step >= index ? 'text-blue-600 font-semibold' : 'text-gray-500'}` }, s.label)),
        index < currentDisplayStepCount - 1 && (React.createElement("div", { className: `h-1 flex-1 mx-1 rounded ${step > index ? theme.progressActive : theme.progressInactive} transition-all duration-300 ease-in-out` })))))));
    const SuccessView = () => (React.createElement("div", { className: "text-center space-y-5 py-8" },
        React.createElement("div", { className: `inline-flex items-center justify-center w-16 h-16 ${theme.primaryButton} rounded-full mb-3` },
            React.createElement(HeartHandshake, { className: "h-8 w-8 text-white" })),
        React.createElement("h3", { className: "text-2xl font-bold" }, "Kiitos tiedoista!"),
        React.createElement("p", { className: "text-gray-600 max-w-md mx-auto text-sm" }, "Olemme vastaanottaneet testamenttiasi koskevat esitietosi. Lakimiehemme on sinuun yhteydess\u00E4 mahdollisimman pian."),
        React.createElement("p", { className: "text-xs text-gray-500 mt-4" }, "Voit nyt sulkea t\u00E4m\u00E4n n\u00E4kym\u00E4n.")));
    return (React.createElement("div", { className: `w-full max-w-2xl mx-auto rounded-xl overflow-hidden ${theme.container} p-0 font-sans` },
        React.createElement("div", { className: `p-5 border-b ${theme.header}` },
            React.createElement("h2", { className: "text-xl font-semibold flex items-center" },
                React.createElement(Edit3, { className: "mr-2.5 h-6 w-6 text-blue-600" }),
                "Testamentin esitietojen ker\u00E4ys")),
        React.createElement("div", { className: "p-5 sm:p-6" }, submitted ? (React.createElement(SuccessView, null)) : (React.createElement(React.Fragment, null,
            React.createElement(ProgressIndicator, null),
            React.createElement("div", { className: "min-h-[300px] sm:min-h-[340px]" },
                " ",
                renderWidgetStep()),
            React.createElement("div", { className: "flex justify-between items-center mt-6 pt-5 border-t border-gray-200" },
                step > 0 ? (React.createElement("button", { type: "button", onClick: handleBack, className: `flex items-center px-4 py-2 rounded-lg text-sm font-medium ${theme.secondaryButton}` },
                    React.createElement(ChevronLeft, { className: "mr-1 h-4 w-4" }),
                    " Takaisin")) : React.createElement("div", { className: "w-24" }),
                " ",
                React.createElement("button", { type: "button", onClick: handleNext, disabled: !isStepValid(), className: `flex items-center px-5 py-2 rounded-lg text-sm font-medium ${theme.primaryButton}` },
                    step === currentDisplayStepCount - 1 ? 'Lähetä tiedot' : 'Seuraava',
                    step === currentDisplayStepCount - 1 ? React.createElement(Check, { className: "ml-2 h-4 w-4" }) : React.createElement(ChevronRight, { className: "ml-1.5 h-4 w-4" })))))),
        React.createElement("div", { className: `px-6 py-2.5 ${theme.footer} text-xs flex items-center justify-center` },
            React.createElement(Shield, { className: "mr-1.5 h-3 w-3" }),
            " Kaikki tiedot k\u00E4sitell\u00E4\u00E4n luottamuksellisesti ja turvallisesti.")));
};
export default TestamenttiLeadWidget;
