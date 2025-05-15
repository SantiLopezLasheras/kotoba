"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

const TOPICS = ["home", "park", "beach"];

export default function TopicSelector() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Current topic from URL or default to 'home'
  const currentTopic = searchParams.get("topic") || "home";

  const [selectedTopic, setSelectedTopic] = useState(currentTopic);

  // Keep local state in sync with URL changes (if any)
  useEffect(() => {
    setSelectedTopic(currentTopic);
  }, [currentTopic]);

  function onChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newTopic = e.target.value;
    setSelectedTopic(newTopic);

    // Update the URL query param without refreshing the page
    const params = new URLSearchParams(window.location.search);
    params.set("topic", newTopic);

    // Push new URL with updated topic param
    router.push(`?${params.toString()}`);
  }

  return (
    <div className="mb-6 ">
      <label htmlFor="topic-select" className="mr-2 font-semibold">
        Select Topic:
      </label>
      <select
        id="topic-select"
        value={selectedTopic}
        onChange={onChange}
        className="border border-gray-300 rounded px-2 py-1 bg-gradient-to-r from-[var(--color-blue)] to-[var(--color-accent)] text-black cursor-pointer"
      >
        {TOPICS.map((topic) => (
          <option key={topic} value={topic}>
            {topic.charAt(0).toUpperCase() + topic.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
}
