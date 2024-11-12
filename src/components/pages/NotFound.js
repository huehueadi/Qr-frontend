import React from 'react'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="authentication-bg bg-primary">
      <div className="home-center">
        <div className="home-desc-center">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-8 col-lg-6 col-xl-5">
                <div className="card">
                  <div className="card-body">
                    <div className="px-2 py-3">
                      <div className="text-center">
                        <a href="index.html">
                          <img src="assets/images/logo-light.png" height={22} alt="logo" />
                        </a>
                      </div>
                      <div className="text-center p-3">
                        <h1 className="error-page mt-5"><span>404!</span></h1>
                        <h4 className="mb-4 mt-5">Sorry, page not found</h4>
                        <p className="mb-4 mx-auto">It will be as simple as Occidental in fact, it will Occidental to an English person</p>
                        <Link className="btn btn-primary waves-effect waves-light" to="/qrmanagement">
                          <i className="mdi mdi-home" /> Back to Dashboard
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
        {/* End Log In page */}
      </div>
    </div>

  )
}

export default NotFound