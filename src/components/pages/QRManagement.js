import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { QRCodeCanvas } from 'qrcode.react'; // For rendering QR codes

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

  // Handle downloading QR code
  const handleDownload = (qrId) => {
    const qrUrl = `https://qrbackend-aio3.onrender.com/api/redirect/${qrId}`;
    const canvas = document.getElementById(`qr-${qrId}`);
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png'); // Get the image URL from the canvas
    link.download = `QR_Code_${qrId}.png`; // Set the filename for the download
    link.click(); // Trigger the download
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
                      {qrList.map((qr) => {
                        const qrUrl = `https://qrbackend-aio3.onrender.com/api/redirect/${qr.qrCodeId}`;

                        return (
                          <div key={qr.qrCodeId} className="col-md-4 text-center mb-3">
                            {/* Display QR Code */}
                            <QRCodeCanvas
                              id={`qr-${qr.qrCodeId}`} // Assigning ID to canvas for download
                              value={qrUrl}
                              size={150}
                              bgColor={"#ffffff"}
                              fgColor={"#000000"}
                              level={"H"}
                            />

                            {/* Display QR Code ID */}
                            <p className="mt-2">QR ID: {qr.qrCodeId}</p>

                            <div className="button-items mt-3">
                              {/* Book Slot Button */}
                              <button
                                className="btn btn-primary"
                                onClick={() => navigate('/slot_management')}
                              >
                                Book Slot
                              </button>

                              {/* Download QR Button */}
                              <button
                                className="btn btn-success ml-2"
                                onClick={() => handleDownload(qr.qrCodeId)} // Trigger download
                              >
                                Download QR
                              </button>
                            </div>
                          </div>
                        );
                      })}
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
