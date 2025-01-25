"use client";
import React, { FormEvent, useState } from "react";

function LinkedInForm() {
  const [linkedinUrl, setLinkedInUrl] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Define the regex for LinkedIn URL validation
    const pattern = /^https:\/\/(www\.)?linkedin\.com\/in\/[A-Za-z0-9-]+\/?$/;

    if (!pattern.test(linkedinUrl)) {
      setError(
        "Please enter a valid LinkedIn profile URL, e.g., https://www.linkedin.com/in/username"
      );
    } else {
      setError("");
      // Proceed with form submission logic (e.g., send the data somewhere)
      alert("Form submitted!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="linkedin-url">LinkedIn URL:</label>
      <input
        type="text"
        id="linkedin-url"
        name="linkedin-url"
        value={linkedinUrl}
        onChange={(e) => setLinkedInUrl(e.target.value)}
        required
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input type="submit" />
    </form>
  );
}

export default LinkedInForm;
