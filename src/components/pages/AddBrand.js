import React, { useState } from 'react';

function AddBrand() {
  const [brandName, setBrandName] = useState('');
  const [brandDescription, setBrandDescription] = useState('');
  const [successMessage, setSuccessMessage] = useState('');  // State to show success message
  const [errorMessage, setErrorMessage] = useState('');  // State to show error message

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:7000/api/register_brand', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ brandName, brandDescription }),
      });

      if (response.ok) {
        setSuccessMessage('Brand added successfully!');
        setBrandName('');
        setBrandDescription('');
        setErrorMessage(''); // Clear any previous error message
      } else {
        setSuccessMessage('');
        setErrorMessage('Failed to add the brand. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setSuccessMessage('');
      setErrorMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <>
      <div className="page-content">
        {/* Start page title */}
        <div className="page-title-box">
          <div className="container-fluid">
            <div className="row align-items-center">
              <div className="col-sm-6">
                <div className="page-title">
                  <h4>Add Brand</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End page title */}
        
        <div className="container-fluid">
          <div className="page-content-wrapper">
            <div className="row">
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-body">
                    <h4 className="header-title">Brand Information</h4>
                    <p className="card-title-desc">Fill all information below</p>
                    
                    {/* Success Message */}
                    {successMessage && (
                      <div className="alert alert-success" role="alert">
                        {successMessage}
                      </div>
                    )}
                    
                    {/* Error Message */}
                    {errorMessage && (
                      <div className="alert alert-danger" role="alert">
                        {errorMessage}
                      </div>
                    )}

                    <form onSubmit={handleSubmit}>
                      {/* Brand Name */}
                      <div className="mb-3">
                        <label className="form-label" htmlFor="brandName">Brand Name</label>
                        <input
                          id="brandName"
                          name="brandName"
                          type="text"
                          className="form-control"
                          placeholder="Enter brand name"
                          value={brandName}
                          onChange={(e) => setBrandName(e.target.value)}
                          required
                        />
                      </div>
                      
                      {/* Brand Description */}
                      <div className="mb-3">
                        <label className="form-label" htmlFor="brandDescription">Brand Description</label>
                        <textarea
                          className="form-control"
                          id="brandDescription"
                          rows={5}
                          placeholder="Enter brand description"
                          value={brandDescription}
                          onChange={(e) => setBrandDescription(e.target.value)}
                          required
                        />
                      </div>
                      
                      {/* Submit Button */}
                      <button type="submit" className="btn btn-primary">Add Brand</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            {/* End row */}
          </div>
        </div> {/* End container-fluid */}
      </div>
      {/* End Page-content */}
      
      <footer className="footer">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-6">
              © Your Company.
            </div>
            <div className="col-sm-6">
              <div className="text-sm-end d-none d-sm-block">
                Crafted with <i className="mdi mdi-heart text-danger" /> by Your Company
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default AddBrand;
