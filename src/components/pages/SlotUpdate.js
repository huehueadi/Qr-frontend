import React, { useState, useEffect } from 'react';

const SlotUpdate = () => {
  const [slotId, setSlotId] = useState(''); // State to store selected Slot ID
  const [qrId, setQrId] = useState(''); // State to store selected QR ID
  const [date, setDate] = useState(''); // State for date
  const [slotTime, setSlotTime] = useState(''); // State for slot time
  const [endTime, setEndTime] = useState(''); // State for end time
  const [redirectUrl, setRedirectUrl] = useState(''); // State for redirect URL
  const [brandNames, setBrandNames] = useState([]); // State for storing fetched brand names
  const [qrIds, setQrIds] = useState([]); // State for storing fetched QR IDs
  const [selectedBrandName, setSelectedBrandName] = useState(''); // State for selected brand name

  // Fetch QR IDs from backend
  useEffect(() => {
    const fetchQrIds = async () => {
      try {
        const response = await fetch('http://localhost:7000/api/get_qrs'); // API endpoint for QR IDs
        const data = await response.json();

        if (data.success && Array.isArray(data.Qrs)) {
          setQrIds(data.Qrs); // Set qrIds state with the correct array from the 'Qrs' key
        } else {
          console.error('Invalid response format for QR IDs:', data);
        }
      } catch (error) {
        console.error('Error fetching QR IDs:', error);
      }
    };

    fetchQrIds();
  }, []);

  // Fetch brand names from backend
  useEffect(() => {
    const fetchBrandNames = async () => {
      try {
        const response = await fetch('http://localhost:7000/api/get_brand');
        const data = await response.json();
        console.log('Fetched Brands:', data); // Debugging line

        if (data.success && Array.isArray(data.Brands)) {
          setBrandNames(data.Brands); // Set brand names if the response structure is correct
        } else {
          console.error("Error: Brands data is not in expected array format.");
        }
      } catch (error) {
        console.error('Error fetching brand names:', error);
      }
    };

    fetchBrandNames();
  }, []);

  // Fetch the existing slot data to update
  useEffect(() => {
    const fetchSlotData = async () => {
      try {
        const response = await fetch(`http://localhost:7000/api/get_slot/${slotId}`);
        const data = await response.json();

        if (data.success) {
          const { qrCodeId, date, startTime, endTime, redirectionUrl, brandId } = data.slot;
          setQrId(qrCodeId);
          setDate(date);
          setSlotTime(startTime);
          setEndTime(endTime);
          setRedirectUrl(redirectionUrl);
          setSelectedBrandName(brandId);
        } else {
          console.error('Error fetching slot data:', data.message);
        }
      } catch (error) {
        console.error('Error fetching slot data:', error);
      }
    };

    if (slotId) {
      fetchSlotData();
    }
  }, [slotId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      qrId,
      brandId: selectedBrandName,
      date,
      startTime: slotTime,
      endTime,
      redirectionUrl: redirectUrl,
    };

    try {
      const response = await fetch(`http://localhost:7000/api/update_slot/${slotId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        alert('Slot updated successfully!');
      } else {
        alert('Error updating slot. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting the form:', error);
      alert('Network error. Please try again!');
    }
  };

  return (
    <div className="page-content">
      <div className="page-title-box">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-sm-6">
              <div className="page-title">
                <h4>Update Slot</h4>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid">
        <div className="page-content-wrapper">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    {/* Slot ID Dropdown */}
                    <div className="mb-3">
                      <label htmlFor="slotId" className="form-label">Select Slot ID to Update</label>
                      <select
                        id="slotId"
                        className="form-select"
                        value={slotId}
                        onChange={(e) => setSlotId(e.target.value)}
                        required
                      >
                        <option value="">Select Slot ID</option>
                        {/* Map over the slots to display */}
                        <option value="123">Slot 123</option>
                        <option value="124">Slot 124</option>
                      </select>
                    </div>

                    {/* QR ID Dropdown */}
                    <div className="mb-3">
                      <label htmlFor="qrId" className="form-label">Select QR ID</label>
                      <select
                        id="qrId"
                        className="form-select"
                        value={qrId}
                        onChange={(e) => setQrId(e.target.value)}
                        required
                      >
                        <option value="">Select QR ID</option>
                        {qrIds.map((qr) => (
                          <option key={qr._id} value={qr.qrCodeId}>
                            {qr.qrCodeId}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Brand Name Dropdown */}
                    <div className="mb-3">
                      <label htmlFor="brandName" className="form-label">Select Brand Name</label>
                      <select
                        id="brandName"
                        className="form-select"
                        value={selectedBrandName}
                        onChange={(e) => setSelectedBrandName(e.target.value)}
                        required
                      >
                        <option value="">Select Brand Name</option>
                        {brandNames.map((brand) => (
                          <option key={brand._id} value={brand._id}>
                            {brand.brandName}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Date Input */}
                    <div className="mb-3">
                      <label htmlFor="date" className="form-label">Select Date</label>
                      <input
                        type="date"
                        id="date"
                        className="form-control"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                      />
                    </div>

                    {/* Slot Time Input */}
                    <div className="mb-3">
                      <label htmlFor="slotTime" className="form-label">Select Slot Time</label>
                      <input
                        type="time"
                        id="slotTime"
                        className="form-control"
                        value={slotTime}
                        onChange={(e) => setSlotTime(e.target.value)}
                        required
                      />
                    </div>

                    {/* End Time Input */}
                    <div className="mb-3">
                      <label htmlFor="endTime" className="form-label">Select End Time</label>
                      <input
                        type="time"
                        id="endTime"
                        className="form-control"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        required
                      />
                    </div>

                    {/* Redirect URL Input */}
                    <div className="mb-3">
                      <label htmlFor="redirectUrl" className="form-label">Redirect URL</label>
                      <input
                        type="url"
                        id="redirectUrl"
                        className="form-control"
                        value={redirectUrl}
                        onChange={(e) => setRedirectUrl(e.target.value)}
                        required
                      />
                    </div>

                    <button type="submit" className="btn btn-primary">Update Slot</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlotUpdate;
