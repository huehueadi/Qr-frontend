import React, { useState, useEffect } from 'react';

const EditTemplate = () => {
  const [fileUrl, setFileUrl] = useState('');
  const [logo, setLogo] = useState(null);
  const [brandName, setBrandName] = useState('');
  const [brandDescription, setBrandDescription] = useState('');

  const [titles, setTitles] = useState([]);
  const [descriptions, setDescriptions] = useState([]);
  const [links, setLinks] = useState([]);
  const [images, setImages] = useState([]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the contentArray based on titles, descriptions, links, and images
    const contentArray = [];

    titles.forEach(title => {
      contentArray.push({ type: 'text', data: title });
    });

    descriptions.forEach(description => {
      contentArray.push({ type: 'text', data: description });
    });

    links.forEach(link => {
      contentArray.push({ type: 'link', data: link });
    });

    images.forEach(image => {
      if (image) {
        contentArray.push({ type: 'image', data: image });
      }
    });

    const formData = {
      title: brandName,
      slug: brandName.toLowerCase().replace(/ /g, '-'),
      template: 'flowpage1', // Assuming a template id for now
      contentArray: contentArray,
    };

    try {
      const response = await fetch('http://localhost:7000/api/add_brand_info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setShowSuccessMessage(true);
      } else {
        alert('Error saving data. Please try again!');
      }
    } catch (error) {
      alert('Network error. Please try again!');
    }
  };

  const handleAddTitle = () => setTitles([...titles, '']);
  const handleAddDescription = () => setDescriptions([...descriptions, '']);
  const handleAddLink = () => setLinks([...links, '']);
  const handleAddImage = () => setImages([...images, null]);

  const handleChange = (index, field, value) => {
    switch (field) {
      case 'title':
        const newTitles = [...titles];
        newTitles[index] = value;
        setTitles(newTitles);
        break;
      case 'description':
        const newDescriptions = [...descriptions];
        newDescriptions[index] = value;
        setDescriptions(newDescriptions);
        break;
      case 'link':
        const newLinks = [...links];
        newLinks[index] = value;
        setLinks(newLinks);
        break;
      default:
        break;
    }
  };

  const handleImageChange = (index, file) => {
    const newImages = [...images];
    newImages[index] = file;
    setImages(newImages);
  };

  const handleRemove = (index, field) => {
    switch (field) {
      case 'title':
        setTitles(titles.filter((_, i) => i !== index));
        break;
      case 'description':
        setDescriptions(descriptions.filter((_, i) => i !== index));
        break;
      case 'link':
        setLinks(links.filter((_, i) => i !== index));
        break;
      case 'image':
        setImages(images.filter((_, i) => i !== index));
        break;
      default:
        break;
    }
  };

  return (
    <div className="page-content">
      <div className="page-title-box">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-sm-6">
              <div className="page-title">
                <h4>Brand Information Form</h4>
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
                  <div className="d-flex justify-content-between mb-4">
                    <button type="button" className="btn btn-primary waves-effect waves-light" onClick={handleAddTitle}>Add Title</button>
                    <button type="button" className="btn btn-primary waves-effect waves-light" onClick={handleAddDescription}>Add Description</button>
                    <button type="button" className="btn btn-primary waves-effect waves-light" onClick={handleAddLink}>Add Link</button>
                    <button type="button" className="btn btn-primary waves-effect waves-light" onClick={handleAddImage}>Add Image</button>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="logo" className="form-label">Upload Logo</label>
                    <input
                      type="file"
                      id="logo"
                      className="form-control"
                      onChange={(e) => setLogo(e.target.files[0])}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="brandName" className="form-label">Brand Name</label>
                    <input
                      type="text"
                      id="brandName"
                      className="form-control"
                      value={brandName}
                      onChange={(e) => setBrandName(e.target.value)}
                      required
                      style={{ padding: '10px' }} // Increase input padding for larger form
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="brandDescription" className="form-label">Brand Description</label>
                    <textarea
                      id="brandDescription"
                      className="form-control"
                      rows="3"
                      value={brandDescription}
                      onChange={(e) => setBrandDescription(e.target.value)}
                      required
                      style={{ padding: '10px' }} // Increase textarea padding for larger form
                    />
                  </div>

                  {/* Add Title Fields */}
                  {titles.map((title, index) => (
                    <div key={index} className="mb-3">
                      <label htmlFor={`title-${index}`} className="form-label">Title {index + 1}</label>
                      <input
                        type="text"
                        id={`title-${index}`}
                        className="form-control"
                        value={title}
                        onChange={(e) => handleChange(index, 'title', e.target.value)}
                        style={{ padding: '10px' }} // Increase input padding for larger form
                      />
                      <button
                        type="button"
                        className="btn btn-danger waves-effect waves-light mt-2"
                        onClick={() => handleRemove(index, 'title')}
                      >
                        Remove Title
                      </button>
                    </div>
                  ))}

                  {/* Add Description Fields */}
                  {descriptions.map((description, index) => (
                    <div key={index} className="mb-3">
                      <label htmlFor={`description-${index}`} className="form-label">Description {index + 1}</label>
                      <textarea
                        id={`description-${index}`}
                        className="form-control"
                        value={description}
                        onChange={(e) => handleChange(index, 'description', e.target.value)}
                        style={{ padding: '10px' }} // Increase textarea padding for larger form
                      />
                      <button
                        type="button"
                        className="btn btn-danger waves-effect waves-light mt-2"
                        onClick={() => handleRemove(index, 'description')}
                      >
                        Remove Description
                      </button>
                    </div>
                  ))}

                  {/* Add Link Fields */}
                  {links.map((link, index) => (
                    <div key={index} className="mb-3">
                      <label htmlFor={`link-${index}`} className="form-label">Link {index + 1}</label>
                      <input
                        type="url"
                        id={`link-${index}`}
                        className="form-control"
                        value={link}
                        onChange={(e) => handleChange(index, 'link', e.target.value)}
                        style={{ padding: '10px' }} // Increase input padding for larger form
                      />
                      <button
                        type="button"
                        className="btn btn-danger waves-effect waves-light mt-2"
                        onClick={() => handleRemove(index, 'link')}
                      >
                        Remove Link
                      </button>
                    </div>
                  ))}

                  {/* Add Image Fields */}
                  {images.map((image, index) => (
                    <div key={index} className="mb-3">
                      <label htmlFor={`image-${index}`} className="form-label">Image {index + 1}</label>
                      <input
                        type="file"
                        id={`image-${index}`}
                        className="form-control"
                        onChange={(e) => handleImageChange(index, e.target.files[0])}
                      />
                      <button
                        type="button"
                        className="btn btn-danger waves-effect waves-light mt-2"
                        onClick={() => handleRemove(index, 'image')}
                      >
                        Remove Image
                      </button>
                    </div>
                  ))}

                  <button type="submit" className="btn btn-success waves-effect waves-light">Submit</button>
                </form>
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
              {fileUrl && (
                <iframe
                  src={fileUrl}
                  width="100%"
                  height="100%"
                  style={{
                    border: 'none',
                    borderRadius: '20px',
                  }}
                  title="Mobile Template"
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
