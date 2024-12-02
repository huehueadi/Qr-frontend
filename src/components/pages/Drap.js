import React, { useEffect, useState } from "react";
 
const Drap = () => {
  // State to hold user input for customization
  const [brandName, setBrandName] = useState("");
  const [tagline, setTagline] = useState("");
  const [heroHeadline, setHeroHeadline] = useState("");
  const [heroDescription, setHeroDescription] = useState("");
  const [ctaText, setCtaText] = useState("");
  const [feature1Name, setFeature1Name] = useState("");
  const [feature1Description, setFeature1Description] = useState("");
  const [feature2Name, setFeature2Name] = useState("");
  const [feature2Description, setFeature2Description] = useState("");
  const [feature3Name, setFeature3Name] = useState("");
  const [feature3Description, setFeature3Description] = useState("");
  const [ctaHeadline, setCtaHeadline] = useState("");
  const [ctaDescription, setCtaDescription] = useState("");
  const [signupButtonText, setSignupButtonText] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [bgColor, setBgColor] = useState("#f0f8ff");
  const [textColor, setTextColor] = useState("#333");
  const [customizedHtml, setCustomizedHtml] = useState("");
  const [templateUrl, setTemplateUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);  // Loading state
  const [error, setError] = useState(null);  // Error state
 
  // Fetch template URL from API when component mounts
  useEffect(() => {
    const fetchTemplateUrl = async () => {
      try {
        setIsLoading(true);  // Start loading
        const response = await fetch("http://localhost:7000/api/g");
        const data = await response.json();
 
        if (data.success && data.files[0]?.fileUrl) {
          setTemplateUrl(data.files[0].fileUrl);  // Set the template URL from API
        } else {
          setError("Failed to fetch template URL.");
        }
      } catch (error) {
        setError("Error fetching template URL.");
      } finally {
        setIsLoading(false);  // End loading
      }
    };
 
    fetchTemplateUrl(); // Fetch the template URL when component mounts
  }, []);
 
  // Fetch the HTML template and replace placeholders
  const fetchAndCustomizeTemplate = async (event) => {
    event.preventDefault();
 
    if (!templateUrl) {
      console.error("Template URL is not available");
      return;  // Don't proceed if templateUrl is not set
    }
 
    try {
      setIsLoading(true); // Start loading
      const response = await fetch(templateUrl);
      const template = await response.text();
 
      // Replace placeholders with user input
      const customizedTemplate = replacePlaceholders(template, {
        BRAND_NAME: brandName,
        TAGLINE: tagline,
        HERO_HEADLINE: heroHeadline,
        HERO_DESCRIPTION: heroDescription,
        CTA_TEXT: ctaText,
        FEATURE_1_NAME: feature1Name,
        FEATURE_1_DESCRIPTION: feature1Description,
        FEATURE_2_NAME: feature2Name,
        FEATURE_2_DESCRIPTION: feature2Description,
        FEATURE_3_NAME: feature3Name,
        FEATURE_3_DESCRIPTION: feature3Description,
        CTA_HEADLINE: ctaHeadline,
        CTA_DESCRIPTION: ctaDescription,
        SIGNUP_BUTTON_TEXT: signupButtonText,
        CONTACT_EMAIL: contactEmail,
        YEAR: new Date().getFullYear(),
        BACKGROUND_COLOR: bgColor,
        TEXT_COLOR: textColor
      });
 
      // Set the customized HTML to state
      setCustomizedHtml(customizedTemplate);
    } catch (error) {
      setError("Error fetching template from S3.");
    } finally {
      setIsLoading(false); // End loading
    }
  };
 
  const replacePlaceholders = (htmlTemplate, userData) => {
    let customizedHtml = htmlTemplate;
 
    Object.keys(userData).forEach((key) => {
      const placeholder = `{${key}}`;  // Using curly braces for dynamic values
      const value = userData[key] || "";
      customizedHtml = customizedHtml.replace(new RegExp(placeholder, "g"), value);
    });
 
    return customizedHtml;
  };
 
 
  const saveHtmlToS3 = async () => {
    try {
      if (!customizedHtml) {
        alert("Please generate the template before saving.");
        return;
      }
 
    
      const blob = new Blob([customizedHtml], { type: "text/html" });
      const formData = new FormData();
      formData.append("htmlcontent", blob, "customized-landing-page.html");  
 
 
      setIsLoading(true);
      const response = await fetch("http://localhost:7000/api/editupload", {
        method: "POST",
        body: formData,
      });
 
      const data = await response.json();
 
      setIsLoading(false);
 
      if (data.success) {
        alert("Landing page saved successfully to S3!");
      } else {
        setError("Error uploading file to S3.");
      }
    } catch (error) {
      setError("Error uploading file to S3.");
      setIsLoading(false); // End loading
    }
  };
 
  return (
    <div>
      <h1>Customize Your Landing Page</h1>
 
      {/* Error message if template URL or fetching fails */}
      {error && <div style={{ color: "red" }}>{error}</div>}
 
      {/* Loading state */}
      {isLoading && <div>Loading...</div>}
 
      {/* Form for user customization */}
      <form onSubmit={fetchAndCustomizeTemplate}>
        <div>
          <label htmlFor="brandName">Brand Name:</label>
          <input
            type="text"
            id="brandName"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
            placeholder="Enter your brand name"
            disabled={isLoading} // Disable inputs while loading
          />
        </div>
 
        <div>
          <label htmlFor="tagline">Tagline:</label>
          <input
            type="text"
            id="tagline"
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
            placeholder="Enter your tagline"
            disabled={isLoading} // Disable inputs while loading
          />
        </div>
 
        <div>
          <label htmlFor="heroHeadline">Hero Headline:</label>
          <input
            type="text"
            id="heroHeadline"
            value={heroHeadline}
            onChange={(e) => setHeroHeadline(e.target.value)}
            placeholder="Enter the hero headline"
            disabled={isLoading} // Disable inputs while loading
          />
        </div>
 
        <div>
          <label htmlFor="heroDescription">Hero Description:</label>
          <input
            type="text"
            id="heroDescription"
            value={heroDescription}
            onChange={(e) => setHeroDescription(e.target.value)}
            placeholder="Enter the hero description"
            disabled={isLoading}
          />
        </div>
 
        <div>
          <label htmlFor="ctaText">CTA Text:</label>
          <input
            type="text"
            id="ctaText"
            value={ctaText}
            onChange={(e) => setCtaText(e.target.value)}
            placeholder="Enter call-to-action text"
            disabled={isLoading}
          />
        </div>
 
        {/* Feature Inputs */}
        <div>
          <label htmlFor="feature1Name">Feature 1 Name:</label>
          <input
            type="text"
            id="feature1Name"
            value={feature1Name}
            onChange={(e) => setFeature1Name(e.target.value)}
            placeholder="Enter Feature 1 Name"
            disabled={isLoading}
          />
        </div>
 
        <div>
          <label htmlFor="feature1Description">Feature 1 Description:</label>
          <input
            type="text"
            id="feature1Description"
            value={feature1Description}
            onChange={(e) => setFeature1Description(e.target.value)}
            placeholder="Enter Feature 1 Description"
            disabled={isLoading}
          />
        </div>
 
        {/* Repeat for Feature 2 and Feature 3 */}
 
        <div>
          <label htmlFor="ctaHeadline">CTA Headline:</label>
          <input
            type="text"
            id="ctaHeadline"
            value={ctaHeadline}
            onChange={(e) => setCtaHeadline(e.target.value)}
            placeholder="Enter CTA Headline"
            disabled={isLoading}
          />
        </div>
 
        <div>
          <label htmlFor="ctaDescription">CTA Description:</label>
          <input
            type="text"
            id="ctaDescription"
            value={ctaDescription}
            onChange={(e) => setCtaDescription(e.target.value)}
            placeholder="Enter CTA Description"
            disabled={isLoading}
          />
        </div>
 
        <div>
          <label htmlFor="signupButtonText">Signup Button Text:</label>
          <input
            type="text"
            id="signupButtonText"
            value={signupButtonText}
            onChange={(e) => setSignupButtonText(e.target.value)}
            placeholder="Enter Signup Button Text"
            disabled={isLoading}
          />
        </div>
 
        <div>
          <label htmlFor="contactEmail">Contact Email:</label>
          <input
            type="email"
            id="contactEmail"
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
            placeholder="Enter Contact Email"
            disabled={isLoading}
          />
        </div>
 
        <div>
          <label htmlFor="bgColor">Background Color:</label>
          <input
            type="color"
            id="bgColor"
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
            disabled={isLoading}
          />
        </div>
 
        <div>
          <label htmlFor="textColor">Text Color:</label>
          <input
            type="color"
            id="textColor"
            value={textColor}
            onChange={(e) => setTextColor(e.target.value)}
            disabled={isLoading}
          />
        </div>
 
        <button type="submit" disabled={isLoading}>Generate Landing Page</button>
      </form>
 
      {/* Render the customized HTML if available */}
      <div
        id="template-container"
        dangerouslySetInnerHTML={{ __html: customizedHtml }}
        style={{ marginTop: "20px", border: "1px solid #ccc", padding: "20px" }}
      />
 
      {/* Save button */}
      <button onClick={saveHtmlToS3} disabled={isLoading}>Save to S3</button>
    </div>
  );
};
 
export default Drap;
 
 