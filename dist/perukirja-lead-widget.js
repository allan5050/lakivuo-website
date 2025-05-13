import React, { useState } from 'react';
import { Check, Upload, FileText, Shield, ChevronLeft, ChevronRight } from 'lucide-react';
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
        documents: []
    });
    const [submitted, setSubmitted] = useState(false);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => (Object.assign(Object.assign({}, prev), { [name]: value })));
    };
    const handleRadioChange = (name, value) => {
        setFormData(prev => (Object.assign(Object.assign({}, prev), { [name]: value })));
    };
    const handleFileChange = (e) => {
        const files = e.target.files ? Array.from(e.target.files) : [];
        // Basic validation example (can be expanded)
        const validFiles = files.filter(file => file.size < 5 * 1024 * 1024 && (file.type === "application/pdf" || file.type.startsWith("image/")));
        if (validFiles.length !== files.length) {
            alert("Jotkin tiedostot olivat liian suuria (max 5MB) tai väärää tyyppiä (sallittu: PDF, kuvat).");
        }
        setFormData(prev => (Object.assign(Object.assign({}, prev), { documents: [...prev.documents, ...validFiles] })));
    };
    const handleRemoveFile = (index) => {
        setFormData(prev => (Object.assign(Object.assign({}, prev), { documents: prev.documents.filter((_, i) => i !== index) })));
    };
    const handleNext = () => {
        if (step < 3) {
            setStep(step + 1);
        }
        else {
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
                return (React.createElement("div", { className: "space-y-4" },
                    React.createElement("h3", { className: "text-xl font-semibold mb-4" }, "Vainajan tiedot"),
                    React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4" },
                        React.createElement("div", null,
                            React.createElement("label", { htmlFor: "deceasedFirstName", className: "block text-sm font-medium mb-1" }, "Etunimi"),
                            React.createElement("input", { type: "text", name: "deceasedFirstName", id: "deceasedFirstName", value: formData.deceasedFirstName, onChange: handleChange, className: `w-full p-2 rounded-lg ${theme.inputs}`, placeholder: "Matti" })),
                        React.createElement("div", null,
                            React.createElement("label", { htmlFor: "deceasedLastName", className: "block text-sm font-medium mb-1" }, "Sukunimi"),
                            React.createElement("input", { type: "text", name: "deceasedLastName", id: "deceasedLastName", value: formData.deceasedLastName, onChange: handleChange, className: `w-full p-2 rounded-lg ${theme.inputs}`, placeholder: "Virtanen" }))),
                    React.createElement("div", null,
                        React.createElement("label", { htmlFor: "deathDate", className: "block text-sm font-medium mb-1" }, "Kuolinp\u00E4iv\u00E4"),
                        React.createElement("input", { type: "date", name: "deathDate", id: "deathDate", value: formData.deathDate, onChange: handleChange, className: `w-full p-2 rounded-lg ${theme.inputs}` }))));
            case 1: // Perhetilanne
                return (React.createElement("div", { className: "space-y-4" },
                    React.createElement("h3", { className: "text-xl font-semibold mb-4" }, "Perhetilanne"),
                    ['hasChildren', 'hasSpouse', 'hasWill'].map(key => (React.createElement("div", { key: key, className: "mb-4" },
                        React.createElement("p", { className: "block text-sm font-medium mb-2" },
                            key === 'hasChildren' && 'Oliko vainajalla lapsia?',
                            key === 'hasSpouse' && 'Oliko vainaja naimisissa / rekisteröidyssä parisuhteessa?',
                            key === 'hasWill' && 'Onko testamenttia tiedossa?'),
                        React.createElement("div", { className: "flex space-x-4" },
                            React.createElement("button", { type: "button", onClick: () => handleRadioChange(key, true), className: `flex items-center px-4 py-2 rounded-lg ${formData[key] === true ? theme.primaryButton : theme.secondaryButton}` },
                                "Kyll\u00E4 ",
                                formData[key] === true && React.createElement(Check, { className: "ml-2 h-4 w-4" })),
                            React.createElement("button", { type: "button", onClick: () => handleRadioChange(key, false), className: `flex items-center px-4 py-2 rounded-lg ${formData[key] === false ? theme.primaryButton : theme.secondaryButton}` },
                                "Ei ",
                                formData[key] === false && React.createElement(Check, { className: "ml-2 h-4 w-4" }))))))));
            case 2: // Yhteystiedot
                return (React.createElement("div", { className: "space-y-4" },
                    React.createElement("h3", { className: "text-xl font-semibold mb-4" }, "Yhteystiedot (ensisijainen yhteydenottaja)"),
                    React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4" },
                        React.createElement("div", null,
                            React.createElement("label", { htmlFor: "contactFirstName", className: "block text-sm font-medium mb-1" }, "Etunimi"),
                            React.createElement("input", { type: "text", name: "contactFirstName", id: "contactFirstName", value: formData.contactFirstName, onChange: handleChange, className: `w-full p-2 rounded-lg ${theme.inputs}`, placeholder: "Liisa" })),
                        React.createElement("div", null,
                            React.createElement("label", { htmlFor: "contactLastName", className: "block text-sm font-medium mb-1" }, "Sukunimi"),
                            React.createElement("input", { type: "text", name: "contactLastName", id: "contactLastName", value: formData.contactLastName, onChange: handleChange, className: `w-full p-2 rounded-lg ${theme.inputs}`, placeholder: "Esimerkki" }))),
                    React.createElement("div", null,
                        React.createElement("label", { htmlFor: "contactEmail", className: "block text-sm font-medium mb-1" }, "S\u00E4hk\u00F6posti"),
                        React.createElement("input", { type: "email", name: "contactEmail", id: "contactEmail", value: formData.contactEmail, onChange: handleChange, className: `w-full p-2 rounded-lg ${theme.inputs}`, placeholder: "liisa.esimerkki@example.com" })),
                    React.createElement("div", null,
                        React.createElement("label", { htmlFor: "contactPhone", className: "block text-sm font-medium mb-1" }, "Puhelinnumero"),
                        React.createElement("input", { type: "tel", name: "contactPhone", id: "contactPhone", value: formData.contactPhone, onChange: handleChange, className: `w-full p-2 rounded-lg ${theme.inputs}`, placeholder: "+358 40 123 4567" }))));
            case 3: // Liitteet
                return (React.createElement("div", { className: "space-y-4" },
                    React.createElement("h3", { className: "text-xl font-semibold mb-4" }, "Liitteet (valinnainen)"),
                    React.createElement("p", { className: "text-sm text-gray-600 mb-4" }, "Voit ladata asiakirjoja kuten virkatodistukset, sukuselvitykset, testamentin kopion jne. (PDF, kuvat, max 5MB/tiedosto)."),
                    React.createElement("div", { className: `border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors` },
                        React.createElement(Upload, { className: "mx-auto h-12 w-12 text-gray-400 mb-4" }),
                        React.createElement("p", { className: "text-sm text-gray-500 mb-2" }, "Ved\u00E4 tiedostot t\u00E4h\u00E4n tai"),
                        React.createElement("label", { htmlFor: "fileUpload", className: `inline-block ${theme.primaryButton} px-4 py-2 rounded-lg cursor-pointer text-sm` },
                            "Valitse tiedostot",
                            React.createElement("input", { id: "fileUpload", type: "file", multiple: true, className: "hidden", onChange: handleFileChange, accept: "application/pdf,image/*" }))),
                    formData.documents.length > 0 && (React.createElement("div", { className: "mt-4" },
                        React.createElement("h4", { className: "font-medium mb-2 text-sm" }, "Ladatut tiedostot:"),
                        React.createElement("ul", { className: "space-y-2" }, formData.documents.map((file, index) => (React.createElement("li", { key: index, className: "flex items-center justify-between p-2 bg-gray-100 rounded-lg text-sm" },
                            React.createElement("span", { className: "truncate max-w-xs" },
                                file.name,
                                " (",
                                Math.round(file.size / 1024),
                                "KB)"),
                            React.createElement("button", { type: "button", onClick: () => handleRemoveFile(index), className: "text-red-500 hover:text-red-700 font-medium" }, "Poista")))))))));
            default: return null;
        }
    };
    const SuccessView = () => (React.createElement("div", { className: "text-center space-y-6 py-8" },
        React.createElement("div", { className: `inline-flex items-center justify-center w-16 h-16 ${theme.primaryButton} rounded-full mb-4` },
            React.createElement(Check, { className: "h-8 w-8 text-white" })),
        React.createElement("h3", { className: "text-2xl font-bold" }, "Kiitos yhteydenotostasi!"),
        React.createElement("p", { className: "text-gray-600 max-w-md mx-auto" }, "Olemme vastaanottaneet tietosi. Asiantuntijamme on sinuun yhteydess\u00E4 mahdollisimman pian."),
        React.createElement("p", { className: "text-sm text-gray-500" }, "Voit sulkea t\u00E4m\u00E4n ikkunan.")));
    const ProgressIndicator = () => {
        const steps = ["Vainajan tiedot", "Perhetilanne", "Yhteystiedot", "Liitteet", "Valmis"];
        return (React.createElement("div", { className: "flex items-center justify-between mb-8" }, steps.slice(0, -1).map((label, index) => ( // Exclude "Valmis" from being a clickable step circle
        React.createElement(React.Fragment, { key: index },
            React.createElement("div", { className: "flex flex-col items-center text-center" },
                React.createElement("div", { className: `w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                                ${step > index ? `${theme.progressActive} border-2 border-blue-700` : step === index ? theme.progressActive : theme.progressInactive}
                                transition-all duration-300 ease-in-out` }, step > index ? React.createElement(Check, { className: "h-4 w-4" }) : index + 1),
                React.createElement("span", { className: `text-xs mt-1 w-20 truncate ${step >= index ? 'text-blue-600 font-medium' : 'text-gray-500'}` }, label)),
            index < steps.length - 2 && ( // Connector line
            React.createElement("div", { className: `h-1 flex-1 mx-1 rounded
                                ${step > index ? theme.progressActive : theme.progressInactive}
                                transition-all duration-300 ease-in-out` })))))));
    };
    return (React.createElement("div", { className: `w-full max-w-2xl mx-auto rounded-xl overflow-hidden ${theme.container} p-0 font-sans` },
        " ",
        React.createElement("div", { className: `p-5 border-b ${theme.header}` },
            React.createElement("h2", { className: "text-xl font-semibold flex items-center" },
                React.createElement(FileText, { className: "mr-2 h-6 w-6 text-blue-600" }),
                "Perunkirjoituspalvelu - Esitietojen ker\u00E4ys")),
        React.createElement("div", { className: "p-6" }, submitted ? (React.createElement(SuccessView, null)) : (React.createElement(React.Fragment, null,
            React.createElement(ProgressIndicator, null),
            React.createElement("div", { className: "min-h-[250px]" },
                " ",
                renderWidgetStep()),
            React.createElement("div", { className: "flex justify-between mt-8 pt-6 border-t border-gray-200" },
                step > 0 ? (React.createElement("button", { type: "button", onClick: handleBack, className: `flex items-center px-4 py-2 rounded-lg text-sm font-medium ${theme.secondaryButton}` },
                    React.createElement(ChevronLeft, { className: "mr-1 h-4 w-4" }),
                    " Takaisin")) : React.createElement("div", null),
                " ",
                React.createElement("button", { type: "button", onClick: handleNext, disabled: !isStepValid(), className: `flex items-center px-6 py-2 rounded-lg text-sm font-medium ${theme.primaryButton}` },
                    step === 3 ? 'Lähetä tiedot' : 'Seuraava',
                    step === 3 ? React.createElement(Check, { className: "ml-2 h-4 w-4" }) : React.createElement(ChevronRight, { className: "ml-1 h-4 w-4" })))))),
        React.createElement("div", { className: `px-6 py-3 ${theme.footer} text-xs flex items-center justify-center` },
            React.createElement(Shield, { className: "mr-2 h-3 w-3" }),
            " Kaikki tiedot k\u00E4sitell\u00E4\u00E4n luottamuksellisesti ja turvallisesti.")));
};
export default PerukirjaLeadWidget;
