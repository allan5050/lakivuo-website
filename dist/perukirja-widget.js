import React, { useState } from 'react';
import { Check, Calendar, Upload, FileText, Shield, ChevronLeft, ChevronRight } from 'lucide-react';
const PeRuKiRjaWidget = () => {
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState({
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
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => (Object.assign(Object.assign({}, prev), { [name]: value })));
    };
    const handleRadioChange = (name, value) => {
        setFormData(prev => (Object.assign(Object.assign({}, prev), { [name]: value })));
    };
    const handleNext = () => {
        if (step < 3) {
            setStep(step + 1);
        }
        else {
            setSubmitted(true);
        }
    };
    const handleBack = () => {
        if (step > 0) {
            setStep(step - 1);
        }
    };
    const handleFileChange = (e) => {
        const files = e.target.files ? Array.from(e.target.files) : [];
        setFormData(prev => (Object.assign(Object.assign({}, prev), { documents: [...prev.documents, ...files] })));
    };
    const handleRemoveFile = (index) => {
        setFormData(prev => (Object.assign(Object.assign({}, prev), { documents: prev.documents.filter((_, i) => i !== index) })));
    };
    const simulateUpload = () => {
        setIsUploading(true);
        setTimeout(() => {
            setIsUploading(false);
        }, 2000);
    };
    const isStepValid = () => {
        switch (step) {
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
        switch (step) {
            case 0:
                return (React.createElement("div", { className: "space-y-4" },
                    React.createElement("h3", { className: "text-xl font-semibold mb-4" }, "Vainajan tiedot"),
                    React.createElement("div", { className: "grid grid-cols-2 gap-4" },
                        React.createElement("div", null,
                            React.createElement("label", { className: "block text-sm font-medium mb-1" }, "Etunimi"),
                            React.createElement("input", { type: "text", name: "deceasedFirstName", value: formData.deceasedFirstName, onChange: handleChange, className: "w-full p-2 bg-gray-800 border border-gray-700 rounded-lg", placeholder: "Etunimi" })),
                        React.createElement("div", null,
                            React.createElement("label", { className: "block text-sm font-medium mb-1" }, "Sukunimi"),
                            React.createElement("input", { type: "text", name: "deceasedLastName", value: formData.deceasedLastName, onChange: handleChange, className: "w-full p-2 bg-gray-800 border border-gray-700 rounded-lg", placeholder: "Sukunimi" }))),
                    React.createElement("div", null,
                        React.createElement("label", { className: "block text-sm font-medium mb-1" }, "Kuolinp\u00E4iv\u00E4"),
                        React.createElement("input", { type: "date", name: "deathDate", value: formData.deathDate, onChange: handleChange, className: "w-full p-2 bg-gray-800 border border-gray-700 rounded-lg" }))));
            case 1:
                return (React.createElement("div", { className: "space-y-4" },
                    React.createElement("h3", { className: "text-xl font-semibold mb-4" }, "Perhetilanne"),
                    React.createElement("div", { className: "mb-4" },
                        React.createElement("p", { className: "block text-sm font-medium mb-2" }, "Oliko vainajalla lapsia?"),
                        React.createElement("div", { className: "flex space-x-4" },
                            React.createElement("button", { className: `flex items-center px-4 py-2 rounded-lg ${formData.hasChildren === true ? 'bg-blue-600 text-white' : 'bg-gray-800 border border-gray-700'}`, onClick: () => handleRadioChange('hasChildren', true) },
                                React.createElement("span", null, "Kyll\u00E4"),
                                formData.hasChildren === true && React.createElement(Check, { className: "ml-2 h-4 w-4" })),
                            React.createElement("button", { className: `flex items-center px-4 py-2 rounded-lg ${formData.hasChildren === false ? 'bg-blue-600 text-white' : 'bg-gray-800 border border-gray-700'}`, onClick: () => handleRadioChange('hasChildren', false) },
                                React.createElement("span", null, "Ei"),
                                formData.hasChildren === false && React.createElement(Check, { className: "ml-2 h-4 w-4" })))),
                    React.createElement("div", { className: "mb-4" },
                        React.createElement("p", { className: "block text-sm font-medium mb-2" }, "Oliko vainaja naimisissa?"),
                        React.createElement("div", { className: "flex space-x-4" },
                            React.createElement("button", { className: `flex items-center px-4 py-2 rounded-lg ${formData.hasSpouse === true ? 'bg-blue-600 text-white' : 'bg-gray-800 border border-gray-700'}`, onClick: () => handleRadioChange('hasSpouse', true) },
                                React.createElement("span", null, "Kyll\u00E4"),
                                formData.hasSpouse === true && React.createElement(Check, { className: "ml-2 h-4 w-4" })),
                            React.createElement("button", { className: `flex items-center px-4 py-2 rounded-lg ${formData.hasSpouse === false ? 'bg-blue-600 text-white' : 'bg-gray-800 border border-gray-700'}`, onClick: () => handleRadioChange('hasSpouse', false) },
                                React.createElement("span", null, "Ei"),
                                formData.hasSpouse === false && React.createElement(Check, { className: "ml-2 h-4 w-4" })))),
                    React.createElement("div", { className: "mb-4" },
                        React.createElement("p", { className: "block text-sm font-medium mb-2" }, "Onko testamenttia tiedossa?"),
                        React.createElement("div", { className: "flex space-x-4" },
                            React.createElement("button", { className: `flex items-center px-4 py-2 rounded-lg ${formData.hasWill === true ? 'bg-blue-600 text-white' : 'bg-gray-800 border border-gray-700'}`, onClick: () => handleRadioChange('hasWill', true) },
                                React.createElement("span", null, "Kyll\u00E4"),
                                formData.hasWill === true && React.createElement(Check, { className: "ml-2 h-4 w-4" })),
                            React.createElement("button", { className: `flex items-center px-4 py-2 rounded-lg ${formData.hasWill === false ? 'bg-blue-600 text-white' : 'bg-gray-800 border border-gray-700'}`, onClick: () => handleRadioChange('hasWill', false) },
                                React.createElement("span", null, "Ei"),
                                formData.hasWill === false && React.createElement(Check, { className: "ml-2 h-4 w-4" }))))));
            case 2:
                return (React.createElement("div", { className: "space-y-4" },
                    React.createElement("h3", { className: "text-xl font-semibold mb-4" }, "Yhteystiedot"),
                    React.createElement("div", { className: "grid grid-cols-2 gap-4" },
                        React.createElement("div", null,
                            React.createElement("label", { className: "block text-sm font-medium mb-1" }, "Etunimi"),
                            React.createElement("input", { type: "text", name: "contactFirstName", value: formData.contactFirstName, onChange: handleChange, className: "w-full p-2 bg-gray-800 border border-gray-700 rounded-lg", placeholder: "Etunimi" })),
                        React.createElement("div", null,
                            React.createElement("label", { className: "block text-sm font-medium mb-1" }, "Sukunimi"),
                            React.createElement("input", { type: "text", name: "contactLastName", value: formData.contactLastName, onChange: handleChange, className: "w-full p-2 bg-gray-800 border border-gray-700 rounded-lg", placeholder: "Sukunimi" }))),
                    React.createElement("div", null,
                        React.createElement("label", { className: "block text-sm font-medium mb-1" }, "S\u00E4hk\u00F6posti"),
                        React.createElement("input", { type: "email", name: "contactEmail", value: formData.contactEmail, onChange: handleChange, className: "w-full p-2 bg-gray-800 border border-gray-700 rounded-lg", placeholder: "email@example.com" })),
                    React.createElement("div", null,
                        React.createElement("label", { className: "block text-sm font-medium mb-1" }, "Puhelinnumero"),
                        React.createElement("input", { type: "tel", name: "contactPhone", value: formData.contactPhone, onChange: handleChange, className: "w-full p-2 bg-gray-800 border border-gray-700 rounded-lg", placeholder: "+358 40 123 4567" }))));
            case 3:
                return (React.createElement("div", { className: "space-y-4" },
                    React.createElement("h3", { className: "text-xl font-semibold mb-4" }, "Liitteet (valinnainen)"),
                    React.createElement("p", { className: "text-sm text-gray-400 mb-4" }, "Voit ladata asiakirjoja jo nyt, tai my\u00F6hemmin asiakasportaalissa."),
                    React.createElement("div", { className: "border-2 border-dashed border-gray-700 rounded-lg p-6 text-center" },
                        React.createElement(Upload, { className: "mx-auto h-12 w-12 text-gray-400 mb-4" }),
                        React.createElement("p", { className: "text-sm text-gray-400 mb-2" }, "Ved\u00E4 tiedostot t\u00E4h\u00E4n tai"),
                        React.createElement("label", { className: "inline-block bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer" },
                            "Valitse tiedostot",
                            React.createElement("input", { type: "file", multiple: true, className: "hidden", onChange: handleFileChange }))),
                    formData.documents.length > 0 && (React.createElement("div", { className: "mt-4" },
                        React.createElement("h4", { className: "font-medium mb-2" }, "Ladatut tiedostot:"),
                        React.createElement("ul", { className: "space-y-2" }, formData.documents.map((file, index) => (React.createElement("li", { key: index, className: "flex items-center justify-between p-2 bg-gray-800 rounded-lg" },
                            React.createElement("span", { className: "truncate max-w-xs" }, file.name),
                            React.createElement("button", { onClick: () => handleRemoveFile(index), className: "text-red-400 hover:text-red-300" }, "Poista")))))))));
            default:
                return null;
        }
    };
    // Client Portal Component
    const ClientPortal = () => (React.createElement("div", { className: "fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50" },
        React.createElement("div", { className: "bg-gray-900 rounded-lg w-full max-w-2xl p-6" },
            React.createElement("div", { className: "flex justify-between items-center mb-6" },
                React.createElement("h2", { className: "text-2xl font-bold" }, "Asiakasportaali"),
                React.createElement("button", { onClick: () => setShowPortal(false), className: "text-gray-400 hover:text-white" }, "\u2715")),
            React.createElement("div", { className: "space-y-6" },
                React.createElement("div", { className: "p-4 bg-gray-800 rounded-lg" },
                    React.createElement("h3", { className: "text-lg font-medium mb-3 flex items-center" },
                        React.createElement(FileText, { className: "mr-2 h-5 w-5 text-blue-500" }),
                        "Perunkirjoitus: ",
                        formData.deceasedFirstName,
                        " ",
                        formData.deceasedLastName),
                    React.createElement("div", { className: "grid grid-cols-2 gap-4 text-sm text-gray-300" },
                        React.createElement("div", null,
                            "Kuolinp\u00E4iv\u00E4: ",
                            formData.deathDate),
                        React.createElement("div", null, "Tila: Aloitettu"))),
                React.createElement("div", null,
                    React.createElement("h3", { className: "text-lg font-medium mb-3" }, "Tarvittavat dokumentit"),
                    React.createElement("ul", { className: "space-y-2" },
                        React.createElement("li", { className: "flex items-center justify-between p-3 bg-gray-800 rounded-lg" },
                            React.createElement("div", { className: "flex items-center" },
                                React.createElement(FileText, { className: "mr-2 h-5 w-5 text-gray-400" }),
                                React.createElement("span", null, "Virkatodistus (vainaja)")),
                            React.createElement("button", { className: "bg-blue-600 text-white px-3 py-1 rounded-lg text-sm" }, "Lataa")),
                        React.createElement("li", { className: "flex items-center justify-between p-3 bg-gray-800 rounded-lg" },
                            React.createElement("div", { className: "flex items-center" },
                                React.createElement(FileText, { className: "mr-2 h-5 w-5 text-gray-400" }),
                                React.createElement("span", null, "Sukuselvitys")),
                            React.createElement("button", { className: "bg-blue-600 text-white px-3 py-1 rounded-lg text-sm" }, "Lataa")),
                        formData.hasWill && (React.createElement("li", { className: "flex items-center justify-between p-3 bg-gray-800 rounded-lg" },
                            React.createElement("div", { className: "flex items-center" },
                                React.createElement(FileText, { className: "mr-2 h-5 w-5 text-gray-400" }),
                                React.createElement("span", null, "Testamentti")),
                            React.createElement("button", { className: "bg-blue-600 text-white px-3 py-1 rounded-lg text-sm" }, "Lataa"))))),
                React.createElement("div", null,
                    React.createElement("h3", { className: "text-lg font-medium mb-3" }, "Tulevat tapaamiset"),
                    React.createElement("div", { className: "p-4 bg-gray-800 rounded-lg" },
                        React.createElement("p", { className: "text-center text-gray-400" }, "Ei tulevia tapaamisia."),
                        React.createElement("button", { className: "w-full mt-3 bg-blue-600 text-white py-2 rounded-lg flex items-center justify-center" },
                            React.createElement(Calendar, { className: "mr-2 h-4 w-4" }),
                            "Varaa aika"))),
                React.createElement("div", { className: "text-center" },
                    React.createElement("button", { className: "bg-gray-800 text-white px-6 py-2 rounded-lg", onClick: () => setShowPortal(false) }, "Sulje"))))));
    // Success/Completion View
    const SuccessView = () => (React.createElement("div", { className: "text-center space-y-6 py-6" },
        React.createElement("div", { className: "inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-full mb-4" },
            React.createElement(Check, { className: "h-10 w-10 text-white" })),
        React.createElement("h3", { className: "text-2xl font-bold" }, "Kiitos tiedoista!"),
        React.createElement("p", { className: "text-gray-400 max-w-md mx-auto" }, "Olemme vastaanottaneet tietosi ja asiantuntijamme k\u00E4sittelee asian mahdollisimman pian."),
        React.createElement("div", { className: "flex flex-col gap-4 mt-6 max-w-md mx-auto" },
            React.createElement("button", { onClick: () => setShowPortal(true), className: "w-full bg-blue-600 text-white py-3 px-6 rounded-lg flex items-center justify-center" },
                React.createElement(Shield, { className: "mr-2 h-5 w-5" }),
                "Siirry asiakasportaaliin"),
            React.createElement("button", { className: "w-full bg-gray-800 border border-gray-700 text-white py-3 px-6 rounded-lg flex items-center justify-center" },
                React.createElement(Calendar, { className: "mr-2 h-5 w-5" }),
                "Varaa aika asiantuntijalle"))));
    // Progress Indicator
    const ProgressIndicator = () => (React.createElement("div", { className: "flex items-center justify-between mb-8" }, [0, 1, 2, 3].map((index) => (React.createElement(React.Fragment, { key: index },
        React.createElement("div", { className: "flex flex-col items-center" },
            React.createElement("div", { className: `w-8 h-8 rounded-full flex items-center justify-center text-sm ${step >= index ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400'}` }, index + 1),
            React.createElement("span", { className: "text-xs mt-1 text-gray-400" },
                index === 0 && "Vainajan tiedot",
                index === 1 && "Perhetilanne",
                index === 2 && "Yhteystiedot",
                index === 3 && "Liitteet")),
        index < 3 && (React.createElement("div", { className: `h-1 flex-1 ${step > index ? 'bg-blue-600' : 'bg-gray-800'}` })))))));
    return (React.createElement("div", { className: "w-full max-w-3xl mx-auto rounded-xl overflow-hidden shadow-xl bg-gray-900 text-white border border-gray-800" },
        React.createElement("div", { className: "p-6 border-b border-gray-800 flex justify-between items-center" },
            React.createElement("h2", { className: "text-2xl font-bold flex items-center" },
                React.createElement(FileText, { className: "mr-2 h-6 w-6 text-blue-500" }),
                "Perunkirjoituspalvelu")),
        React.createElement("div", { className: "p-6" }, submitted ? (React.createElement(SuccessView, null)) : (React.createElement(React.Fragment, null,
            React.createElement(ProgressIndicator, null),
            renderStep(),
            React.createElement("div", { className: "flex justify-between mt-8" },
                step > 0 ? (React.createElement("button", { onClick: handleBack, className: "flex items-center px-4 py-2 bg-gray-800 rounded-lg" },
                    React.createElement(ChevronLeft, { className: "mr-1 h-4 w-4" }),
                    "Takaisin")) : (React.createElement("div", null) // Empty div to maintain spacing with flex justify-between
                ),
                React.createElement("button", { onClick: handleNext, disabled: !isStepValid(), className: `flex items-center px-6 py-2 rounded-lg ${isStepValid() ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-500 cursor-not-allowed'}` },
                    step === 3 ? 'Lähetä' : 'Seuraava',
                    step === 3 ? React.createElement(Check, { className: "ml-2 h-4 w-4" }) : React.createElement(ChevronRight, { className: "ml-2 h-4 w-4" })))))),
        React.createElement("div", { className: "px-6 py-4 bg-gray-950 text-gray-400 text-sm flex items-center justify-center" },
            React.createElement(Shield, { className: "mr-2 h-4 w-4" }),
            "Kaikki tiedot k\u00E4sitell\u00E4\u00E4n luottamuksellisesti ja turvallisesti"),
        showPortal && React.createElement(ClientPortal, null)));
};
export default PeRuKiRjaWidget;
