import React from 'react'
import AccountDetails from '../components/AccountDetails';
import Address from '../components/Address';

const Profile = () => {
  return (
    <>
      <div className="container-fluid profile-section py-5">
        <div className="">
          <div className="row">
            <div className="col-lg-3 col-md-5 col-sm-12 col-12 ">
              <div className='profile_tabs p-2 position-sticky top-0'>
                <div
                  className="nav flex-column nav-pills rounded-2"
                  id="v-pills-tab"
                  role="tablist"
                  aria-orientation="vertical"
                >
                  <button
                    className="nav-link rounded-0 py-3 active  d-flex align-items-center justify-content-between"
                    id="v-pills-details-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-details"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-details"
                    aria-selected="true"
                  >
                    <p className="mb-0">Account Details</p>
                    <i className="fa fa-user" aria-hidden="true" />
                  </button>
                  <button
                    className="nav-link rounded-0 py-3  d-flex align-items-center justify-content-between"
                    id="v-pills-address-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-address"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-address"
                    aria-selected="true"
                  >
                    <p className="mb-0">Address</p>
                    <i className="fa fa-map-marker" aria-hidden="true"></i>
                  </button>
                </div>
              </div>
            </div>
            <div className="col-lg-9 col-md-7 col-sm-12 col-12 pt-md-0 pt-sm-5 pt-5">
              <div className="tab-content p-2" id="v-pills-tabContent">
                <div
                  className="tab-pane fade show active"
                  id="v-pills-details"
                  role="tabpanel"
                  aria-labelledby="v-pills-details-tab"
                  tabIndex={0}
                >
                  <AccountDetails />
                </div>
                <div
                  className="tab-pane fade"
                  id="v-pills-address"
                  role="tabpanel"
                  aria-labelledby="v-pills-address-tab"
                  tabIndex={0}
                >
                  <Address />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Profile;
