"use client";

import { useState, useEffect } from "react";

type Props = {
  onChange: (content: string) => void;
  value: string;
};

const NewsletterEditor = ({ onChange, value }: Props) => {
  const [editorContent, setEditorContent] = useState("");

  useEffect(() => {
    setEditorContent(value);
  }, [value]);

  const handleEditorChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const content = event.target.value;
    setEditorContent(content);
    onChange(content);
  };

  return (
    <div className="space-y-4">
      <textarea
        value={editorContent}
        onChange={handleEditorChange}
        placeholder="Escribe aquí el contenido de la newsletter..."
        className="w-full h-64 p-4 border rounded-md"
      />
    </div>
  );
};

export default NewsletterEditor;
