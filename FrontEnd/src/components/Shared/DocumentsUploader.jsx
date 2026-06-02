import { useState } from "react";
import Button from "./Button"

export default function DocumentsUploader({ files, setFiles }) {
  const [dragActive, setDragActive] = useState(false);

  const handleFileSelect = (e) => {
    const newFiles = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles((prev) => [...prev, ...droppedFiles]);
  };

  const handleDragOver = (e) => e.preventDefault();
  const handleDragLeave = () => setDragActive(false);
  const handleDragEnter = () => setDragActive(true);

  const handleRemoveFile = (indexToRemove) => {
    setFiles((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div>
        {files.map((file, index) => (
        <li 
            key={index}
            className="flex items-center justify-between px-3 py-1.5 bg-gray-100 rounded-lg shadow-sm mb-1"
        >
            <div className="flex items-center gap-2 truncate">
            <span className="text-blue-500 text-sm">📄</span>
            <span className="text-sm text-gray-800 truncate">{file.name}</span>
            </div>
            <Button
              type="button"
              label="Supprimer"
              onClick={() => handleRemoveFile(index)}
              variant="text"
              className="text-xs ml-2"
            />
        </li>
        ))}

        {files.length > 0 && <div className="mb-4" />}

        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          className={`w-full h-20 flex flex-col items-center justify-center cursor-pointer rounded border-2
              ${dragActive ? "border-blue-500 bg-blue-50" : "border-dashed border-gray-400 bg-white"}
              transition-colors`}
          onClick={() => document.getElementById("cvInput").click()}
          >
          <p className="text-gray-400 text-sm text-center px-2">
              {dragActive
              ? "Déposez le(s) fichier(s) ici…"
              : "Cliquez ou déposez un document"}
          </p>
          <input
              type="file"
              id="cvInput"
              accept=".pdf,.doc,.docx"
              multiple
              className="hidden"
              onChange={handleFileSelect}
          />
        </div>
    </div>
    );
};