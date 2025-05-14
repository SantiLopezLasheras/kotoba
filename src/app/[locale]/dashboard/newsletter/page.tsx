"use client";

import { useState } from "react";
import NewsletterEditor from "./Editor";
import toast from "react-hot-toast";

const NewsletterPage = () => {
  const [subject, setSubject] = useState("");
  const [recipients, setRecipients] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("/api/send-newsletter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subject,
        recipients: recipients.split(",").map((email) => email.trim()),
        content,
      }),
    });

    if (response.ok) {
      toast.success("¡La newsletter se ha enviado correctamente!");
      setSubject("");
      setRecipients("");
      setContent("");
    } else {
      toast.error("Ha habido un error al enviar la newsletter.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Create Newsletter</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="subject" className="block text-lg">
            Asunto
          </label>
          <input
            type="text"
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full p-3 border rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="recipients" className="block text-lg">
            Destinatarios (separados por comas)
          </label>
          <input
            type="text"
            id="recipients"
            value={recipients}
            onChange={(e) => setRecipients(e.target.value)}
            className="w-full p-3 border rounded-md"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-lg">Contenido</label>
          <NewsletterEditor onChange={setContent} value={content} />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded cursor-pointer hover:bg-blue-700"
        >
          Enviar Newsletter
        </button>
      </form>
    </div>
  );
};

export default NewsletterPage;
