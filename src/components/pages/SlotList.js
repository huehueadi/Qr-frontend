import React, { useEffect, useState } from 'react';
import axios from 'axios';

function SlotList() {
  const [slots, setSlots] = useState([]);
  const [filterQrId, setFilterQrId] = useState(''); // State for QR ID filter
  const [inputQrId, setInputQrId] = useState(''); // State for input ID to search

  // Fetch slots data from the API when the component mounts
  useEffect(() => {
    axios.get('http://localhost:7000/api/get_slots')
      .then(response => {
        if (response.data.success) {
          setSlots(response.data.Slots || []); // Access the Slots array
        } else {
          console.error('Failed to fetch slots');
        }
      })
      .catch(error => {
        console.error("There was an error fetching the slots:", error);
      });
  }, []);

  // Filter slots based on the selected QR ID
  const filteredSlots = slots.filter(slot => {
    if (filterQrId && inputQrId) {
      return slot.qrId === filterQrId && slot._id.includes(inputQrId);
    } else if (filterQrId) {
      return slot.qrId === filterQrId;
    }
    return true; 
  });

  return (
    <div className="page-content">
      <div className="page-title-box">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-sm-6">
              <div className="page-title">
                <h4>Slot List</h4>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid">
        <div className="page-content-wrapper">
          <div className="card">
            <div className="card-body">
              <h4 className="header-title">Available Slots</h4>
              <p className="card-title-desc">Below are the filtered slots based on your selection.</p>

              {/* Filters Section */}
              <div className="row mb-3 align-items-center">
                <div className="col-md-4">
                  <label htmlFor="qrIdFilter">Select QR ID</label>
                  <select
                    id="qrIdFilter"
                    className="form-control"
                    value={filterQrId}
                    onChange={(e) => setFilterQrId(e.target.value)}
                  >
                    <option value="">All QR IDs</option>
                    {[...new Set(slots.map(slot => slot.qrId))].map((qrId, index) => (
                      <option key={index} value={qrId}>{qrId}</option>
                    ))}
                  </select>
                </div>

                <div className="col-md-4">
                  <label htmlFor="inputFilter">Filter by Slot ID</label>
                  <input
                    type="text"
                    id="inputFilter"
                    className="form-control"
                    placeholder="Enter Slot ID"
                    value={inputQrId}
                    onChange={(e) => setInputQrId(e.target.value)}
                  />
                </div>

                <div className="col-md-4 text-end">
                  <h5>Total Slots: {filteredSlots.length}</h5>
                </div>
              </div>
              {/* End Filters Section */}

              <div className="table-rep-plugin">
                <div className="table-responsive mb-0" data-pattern="priority-columns">
                  <table id="tech-companies-1" className="table table-striped">
                    <thead>
                      <tr>
                        <th>Slot ID</th>
                        <th>QR ID</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredSlots.length > 0 ? (
                        filteredSlots.map((slot) => (
                          <tr key={slot._id}>
                            <td>{slot._id}</td>
                            <td>{slot.qrId}</td>
                            <td>{slot.startTime}</td>
                            <td>{slot.endTime}</td>
                            <td>{slot.status || "Available"}</td> {/* Default status if not present */}
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5" className="text-center">No slots found</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SlotList;
