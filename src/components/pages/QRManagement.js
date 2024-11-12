import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function QRManagement() {
  const [qrList, setQrList] = useState([]);
  const navigate = useNavigate();

  // Fetch QR codes from the backend
  useEffect(() => {
    const fetchQRCodes = async () => {
      try {
        const response = await axios.get('http://localhost:7000/api/get_qrs');
        setQrList(response.data.Qrs);
      } catch (error) {
        console.error('Error fetching QR codes:', error);
      }
    };
    fetchQRCodes();
  }, []);

  // Handle "Book Slot" button click to navigate to the booking page
  const handleBookSlot = () => {
    navigate('/slot_management');
  };

  // Handle QR code download by fetching the image from the backend
  const handleDownload = async (qrId) => {
    try {
      // Dynamically construct the URL for this QR code
      const qrCodeUrl = `https://qrbackend-aio3.onrender.com/api/redirect/${qrId}`;

      // Request the QR code image from the backend
      const response = await axios.get(`http://localhost:7000/api/download_qr/${qrId}`, {
        responseType: 'blob', // Ensure the response is in blob format to handle the image file
      });

      // Create a link element to download the file
      const link = document.createElement('a');
      link.href = URL.createObjectURL(new Blob([response.data]));
      link.download = `QR_Code_${qrId}.png`;
      link.click();
      URL.revokeObjectURL(link.href); // Clean up the URL reference
    } catch (error) {
      console.error('Error downloading QR code:', error);
    }
  };

  return (
    <div className="page-content">
      {/* start page title */}
      <div className="page-title-box">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-sm-6">
              <div className="page-title">
                <h4>QR Management</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* end page title */}
      
      <div className="container-fluid">
        <div className="page-content-wrapper">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <div className="p-4" style={{ minHeight: 300 }}>
                    <h5>QR Code Management</h5>

                    {/* Render dynamic QR code list */}
                    <div className="row mt-4">
                      {qrList.map((qr) => (
                        <div key={qr.qrCodeId} className="col-md-4 text-center mb-3">
                          {/* Display QR Code ID */}
                          <p className="mt-2">QR - {qr.qrCodeId}</p>
                          <p>{`URL: https://qrbackend-aio3.onrender.com/api/redirect/${qr.qrCodeId}`}</p>
                          <div className="button-items">
                            {/* Book Slot Button */}
                            <button
                              className="btn btn-primary"
                              onClick={handleBookSlot}
                            >
                              Book Slot
                            </button>

                            {/* Download Button */}
                            <button
                              className="btn btn-success waves-effect waves-light"
                              onClick={() => handleDownload(qr.qrCodeId)}
                            >
                              Download QR
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div> {/* end col */}
          </div> {/* end row */}
        </div>
      </div> {/* container-fluid */}
    </div>
  );
}

export default QRManagement;
