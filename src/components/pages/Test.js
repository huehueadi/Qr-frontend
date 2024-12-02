import React, { useState, useEffect } from 'react';

const Test = () => {
  const [htmlContent, setHtmlContent] = useState(''); // State to store HTML content

  // Fetch the HTML content from the backend API
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const templateId = urlParams.get('templateId'); // Get templateId from URL

    if (templateId) {
      const fetchHtmlContent = async () => {
        try {
          const response = await fetch(`http://localhost:7000/api/get-file/${templateId}`);
          if (!response.ok) throw new Error('Failed to load HTML file');
          const text = await response.text(); // Get HTML content as text
          setHtmlContent(text); // Set HTML content in state
        } catch (error) {
          console.error('Error fetching HTML content:', error);
        }
      };
      fetchHtmlContent();
    }
  }, []);

  return (
    <div className="page-content">
      <div className="container-fluid">
        <div className="page-content-wrapper" style={{ display: 'flex' }}>
          {/* Left Side: Form (You can add the form part here) */}
          
          {/* Right Side: Render HTML content directly */}
          <div
            style={{
              width: '30%',
              position: 'sticky',
              top: '20px',
              height: 'auto',
              maxHeight: '90vh',
            }}
          >
            <div
              style={{
                position: 'sticky',
                top: '20px',
                width: '350px',
                height: '650px',
                border: '16px solid #e7e7e7',
                borderRadius: '20px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                backgroundColor: '#fff',
                overflow: 'hidden',
              }}
            >
              {/* Render HTML content directly */}
              {htmlContent && (
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    overflow: 'auto',
                  }}
                  dangerouslySetInnerHTML={{ __html: htmlContent }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test;
