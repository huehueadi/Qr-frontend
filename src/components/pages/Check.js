// // src/components/CreateFlowpageForm.js
// import axios from 'axios';
// import React, { useState } from 'react';
 
// const CreateFlowpageForm = () => {
//   // State to manage the form inputs
//   const [title, setTitle] = useState('');
//   const [slug, setSlug] = useState('');
//   const [template, setTemplate] = useState('flowpage1');
//   const [contentArray, setContentArray] = useState([
//     { type: 'text', data: '' },
//   ]);
 
//   const handleTitleChange = (e) => setTitle(e.target.value);
//   const handleSlugChange = (e) => setSlug(e.target.value);
//   const handleTemplateChange = (e) => setTemplate(e.target.value);
 
//   const handleContentChange = (index, e) => {
//     const newContentArray = [...contentArray];
//     newContentArray[index][e.target.name] = e.target.value;
//     setContentArray(newContentArray);
//   };
 
//   const addContentBlock = () => {
//     setContentArray([...contentArray, { type: 'text', data: '' }]);
//   };
 
//   const removeContentBlock = (index) => {
//     const newContentArray = contentArray.filter((_, i) => i !== index);
//     setContentArray(newContentArray);
//   };
 
//   const handleSubmit = async (e) => {
//     e.preventDefault();
 
//     const flowpageData = {
//       title,
//       slug,
//       template,
//       contentArray,
//     };
 
//     try {
//       const response = await axios.post('http://localhost:8000/api/create', flowpageData);
//       console.log('Flowpage created successfully:', response.data);
     
//     } catch (error) {
//       console.error('Error creating Flowpage:', error);
//     }
//   };
 
//   return (
//     <div>
//       <h1>Create a New Flowpage</h1>
//       <form onSubmit={handleSubmit}>
//         {/* Title */}
//         <div>
//           <label htmlFor="title">Title</label>
//           <input
//             type="text"
//             id="title"
//             name="title"
//             value={title}
//             onChange={handleTitleChange}
//             required
//           />
//         </div>
 
//         {/* Slug */}
//         <div>
//           <label htmlFor="slug">Slug</label>
//           <input
//             type="text"
//             id="slug"
//             name="slug"
//             value={slug}
//             onChange={handleSlugChange}
//             required
//           />
//         </div>
 
//         {/* Template */}
//         <div>
//           <label htmlFor="template">Template</label>
//           <select
//             id="template"
//             name="template"
//             value={template}
//             onChange={handleTemplateChange}
//           >
//             <option value="flowpage1">Flowpage 1</option>
//             <option value="flowpage2">Flowpage 2</option>
//             <option value="defaultTemplate">Default Template</option>
//           </select>
//         </div>
 
//         {/* Content Blocks */}
//         <h3>Content Blocks</h3>
//         {contentArray.map((block, index) => (
//           <div key={index}>
//             {/* Content Type */}
//             <div>
//               <label htmlFor={`contentType-${index}`}>Content Type</label>
//               <select
//                 name="type"
//                 id={`contentType-${index}`}
//                 value={block.type}
//                 onChange={(e) => handleContentChange(index, e)}
//               >
//                 <option value="text">Text</option>
//                 <option value="link">Link</option>
//                 <option value="image">Image</option>
//               </select>
//             </div>
 
//             {/* Content Data (e.g., text, URL, image URL) */}
//             <div>
//               <label htmlFor={`contentData-${index}`}>Content</label>
//               <input
//                 type="text"
//                 name="data"
//                 id={`contentData-${index}`}
//                 value={block.data}
//                 onChange={(e) => handleContentChange(index, e)}
//                 required
//               />
//             </div>
 
//             {/* Remove Block */}
//             <button type="button" onClick={() => removeContentBlock(index)}>
//               Remove Block
//             </button>
//           </div>
//         ))}
 
//         {/* Add New Content Block */}
//         <button type="button" onClick={addContentBlock}>
//           Add More Content
//         </button>
 
//         {/* Submit Button */}
//         <div>
//           <button type="submit">Create Flowpage</button>
//         </div>
//       </form>
//     </div>
//   );
// };
 
// export default CreateFlowpageForm;
 
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditTemplate = () => {
  const [fileUrl, setFileUrl] = useState('');
  const [logo, setLogo] = useState(null);
  const [brandName, setBrandName] = useState('');
  const [brandDescription, setBrandDescription] = useState('');

  // States for content management
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [template, setTemplate] = useState('flowpage1');
  const [contentArray, setContentArray] = useState([{ type: 'text', data: '' }]);
  const [htmlContent, setHtmlContent] = useState('');

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const templateId = urlParams.get('templateId');
    if (templateId) {
      const fetchFileUrl = async () => {
        try {
          const response = await fetch(`http://localhost:7000/api/get-file/${templateId}`);
          const data = await response.json();
          if (data.fileUrl) {
            setFileUrl(data.fileUrl);
          }
        } catch (error) {
          console.error('Error fetching file URL:', error);
        }
      };
      fetchFileUrl();
    }
  }, []);

  // Fetch HTML content from API
  useEffect(() => {
    const fetchHtmlContent = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/get/${slug}`);
        if (response.status === 200) {
          // If HTML content is returned, store it in state
          setHtmlContent(response.data);
        }
      } catch (error) {
        console.error('Error fetching HTML content:', error);
      }
    };

    if (slug) {
      fetchHtmlContent();
    }
  }, [slug]);

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleSlugChange = (e) => setSlug(e.target.value);
  const handleTemplateChange = (e) => setTemplate(e.target.value);

  const handleContentChange = (index, e) => {
    const newContentArray = [...contentArray];
    newContentArray[index][e.target.name] = e.target.value;
    setContentArray(newContentArray);
  };

  const addContentBlock = () => {
    setContentArray([...contentArray, { type: 'text', data: '' }]);
  };

  const removeContentBlock = (index) => {
    const newContentArray = contentArray.filter((_, i) => i !== index);
    setContentArray(newContentArray);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const flowpageData = {
      title,
      slug,
      template,
      contentArray,
    };

    try {
      const response = await axios.post('http://localhost:8000/api/create', flowpageData);
      if (response.data.success) {
        setShowSuccessMessage(true);
      }
    } catch (error) {
      console.error('Error creating Flowpage:', error);
    }
  };

  return (
    <div className="page-content">
      <div className="page-title-box">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-sm-6">
              <div className="page-title">
                <h4>Edit Brand Information</h4>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid">
        <div className="page-content-wrapper" style={{ display: 'flex', gap: '20px' }}>
          {/* Left Side: Form */}
          <div style={{ width: 'calc(60% + 10px)', paddingRight: '5%', overflowY: 'auto', maxHeight: '80vh' }}>
            <div className="card">
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  {/* Title */}
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input
                      type="text"
                      id="title"
                      className="form-control"
                      value={title}
                      onChange={handleTitleChange}
                      required
                    />
                  </div>

                  {/* Slug */}
                  <div className="mb-3">
                    <label htmlFor="slug" className="form-label">Slug</label>
                    <input
                      type="text"
                      id="slug"
                      className="form-control"
                      value={slug}
                      onChange={handleSlugChange}
                      required
                    />
                  </div>

                  {/* Template Dropdown */}
                  <div className="mb-3">
                    <h4 className="header-title">Choose a template for your flowpage:</h4>
                    <div className="btn-group me-1 mt-1">
                      <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {template} <i className="mdi mdi-chevron-down"></i>
                      </button>
                      <div className="dropdown-menu">
                        <a className="dropdown-item" onClick={() => setTemplate('flowpage1')}>Flowpage 1</a>
                        <a className="dropdown-item" onClick={() => setTemplate('flowpage2')}>Flowpage 2</a>
                        <a className="dropdown-item" onClick={() => setTemplate('defaultTemplate')}>Default Template</a>
                      </div>
                    </div>
                  </div>

                  {/* Content Blocks */}
                  <h3 className="header-title">Content Type</h3>
                  {contentArray.map((block, index) => (
                    <div key={index} className="mb-3">
                      {/* Content Type Dropdown */}
                      <div className="btn-group me-1 mt-1">
                        <button type="button" className="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          {block.type.charAt(0).toUpperCase() + block.type.slice(1)} <i className="mdi mdi-chevron-down"></i>
                        </button>
                        <div className="dropdown-menu">
                          <a className="dropdown-item" onClick={() => handleContentChange(index, { target: { name: 'type', value: 'text' } })}>Text</a>
                          <a className="dropdown-item" onClick={() => handleContentChange(index, { target: { name: 'type', value: 'link' } })}>Link</a>
                          <a className="dropdown-item" onClick={() => handleContentChange(index, { target: { name: 'type', value: 'image' } })}>Image</a>
                        </div>
                      </div>

                      {/* Content Data */}
                      <div className="mt-2">
                        <label htmlFor={`contentData-${index}`} className="card-title-desc mb-3">Content</label>
                        <input
                          type="text"
                          name="data"
                          id={`contentData-${index}`}
                          value={block.data}
                          onChange={(e) => handleContentChange(index, e)}
                          className="form-control"
                          required
                        />
                      </div>

                      {/* Remove Block */}
                      <button
                        type="button"
                        className="btn btn-danger waves-effect waves-light mt-2"
                        onClick={() => removeContentBlock(index)}
                      >
                        Remove Block
                      </button>
                    </div>
                  ))}

                  {/* Add New Content Block */}
                  <button
                    type="button"
                    className="btn btn-primary waves-effect waves-light mt-3"
                    onClick={addContentBlock}
                  >
                    Add More Content
                  </button>

                  {/* Submit Button */}
                  <div className="mt-4">
                    <button type="submit" className="btn btn-success waves-effect waves-light">Submit</button>
                  </div>
                </form>
                {showSuccessMessage && (
                  <div className="alert alert-success mt-4">Flowpage created successfully!</div>
                )}
              </div>
            </div>
          </div>

          {/* Right Side: Sticky Mobile Frame with HTML Content */}
          <div
            style={{
              width: '30%',
              position: 'sticky',
              top: '20px',
              height: 'auto',
              maxHeight: '90vh',
              paddingRight: '0', // Remove right padding
            }}
          >
            <div
              style={{
                position: 'sticky',
                top: '20px',
                width: '100%',  // Fill the container entirely
                height: '650px',
                border: '16px solid #e7e7e7',
                borderRadius: '20px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                backgroundColor: '#fff',
                overflow: 'hidden',
              }}
            >
              {/* Display HTML content in mobile frame */}
              {htmlContent && (
                <div
                  style={{
                    borderRadius: '20px',
                    overflowY: 'scroll',
                    height: '100%',
                    width: '100%',
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

export default EditTemplate;
