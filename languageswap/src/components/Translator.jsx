// import React, { useState } from "react";

// const languages = [
//   { code: "en", name: "English" },
//   { code: "es", name: "Spanish" },
//   { code: "fr", name: "French" },
//   { code: "de", name: "German" },
//   { code: "am", name: "Amharic" }, // Include if your backend supports this
// ];

// const Translator = () => {
//   const [text, setText] = useState("");
//   const [translated, setTranslated] = useState("");
//   const [from, setFrom] = useState("en");
//   const [to, setTo] = useState("fr");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const translateText = async () => {
//     if (!text.trim()) {
//       setError("Please enter text to translate.");
//       setTranslated("");
//       return;
//     }

//     setError("");
//     setLoading(true);

//     try {
//       const response = await fetch("http://localhost:3001/translate", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ text, from, to }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.error || "Server returned an error.");
//       }

//       setTranslated(data.translated || "");
//     } catch (err) {
//       setError(err.message || "Failed to fetch translation.");
//       setTranslated("");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-2xl mx-auto">
//       <h2 className="text-2xl font-bold mb-4">🌐 Multi-language Translator</h2>

//       <textarea
//         className="w-full border p-3 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         placeholder="Enter text..."
//         rows={4}
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//       />

//       <div className="flex gap-4 mb-4">
//         <select
//           className="p-2 border rounded-md"
//           value={from}
//           onChange={(e) => setFrom(e.target.value)}
//         >
//           {languages.map((lang) => (
//             <option key={lang.code} value={lang.code}>
//               {lang.name}
//             </option>
//           ))}
//         </select>

//         <span className="flex items-center select-none">➡️</span>

//         <select
//           className="p-2 border rounded-md"
//           value={to}
//           onChange={(e) => setTo(e.target.value)}
//         >
//           {languages.map((lang) => (
//             <option key={lang.code} value={lang.code}>
//               {lang.name}
//             </option>
//           ))}
//         </select>
//       </div>

//       <button
//         onClick={translateText}
//         disabled={loading}
//         className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md transition disabled:opacity-50"
//       >
//         {loading ? "Translating..." : "Translate"}
//       </button>

//       {error && (
//         <div className="mt-4 p-3 border border-red-400 bg-red-100 text-red-700 rounded-md">
//           ❌ {error}
//         </div>
//       )}

//       {translated && !error && (
//         <div className="mt-4 p-3 border bg-gray-100 rounded-md whitespace-pre-wrap">
//           <strong>Translated:</strong>
//           <p>{translated}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Translator;



import React, { useState } from "react";

const languages = [
  { code: "en", name: "English" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "am", name: "Amharic" }, // If supported by backend
];

const url = import.meta.env.VITE_API_URL + "/translate";


const Translator = () => {
  const [text, setText] = useState("");
  const [translated, setTranslated] = useState("");
  const [from, setFrom] = useState("en");
  const [to, setTo] = useState("fr");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const translateText = async () => {
    if (!text.trim()) {
      setError("Please enter text to translate.");
      setTranslated("");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${url}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text, from, to }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Server error occurred.");
      }

      setTranslated(data.translated || "");
    } catch (err) {
      setError(err.message || "Failed to fetch translation.");
      setTranslated("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">🌐 Multi-language Translator</h2>

      <textarea
        className="w-full border p-3 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter text..."
        rows={4}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div className="flex gap-4 mb-4">
        <select
          className="p-2 border rounded-md"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </select>

        <span className="flex items-center select-none">➡️</span>

        <select
          className="p-2 border rounded-md"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={translateText}
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md transition disabled:opacity-50"
      >
        {loading ? "Translating..." : "Translate"}
      </button>

      {error && (
        <div className="mt-4 p-3 border border-red-400 bg-red-100 text-red-700 rounded-md">
          ❌ {error}
        </div>
      )}

      {translated && !error && (
        <div className="mt-4 p-3 border bg-gray-100 rounded-md whitespace-pre-wrap">
          <strong>Translated:</strong>
          <p>{translated}</p>
        </div>
      )}
    </div>
  );
};

export default Translator;
