import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { Heart, Phone, Mail, MapPin, Clock, MessageSquare } from "lucide-react";

const AppointmentForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [nic, setNic] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [department, setDepartment] = useState("Pediatrics");
  const [doctorFirstName, setDoctorFirstName] = useState("");
  const [doctorLastName, setDoctorLastName] = useState("");
  const [address, setAddress] = useState("");
  const [hasVisited, setHasVisited] = useState(false);

  const departmentsArray = [
    "Pediatrics",
    "Orthopedics",
    "Cardiology",
    "Neurology",
    "Oncology",
    "Radiology",
    "Physical Therapy",
    "Dermatology",
    "ENT",
  ];

  const [doctors, setDoctors] = useState([]);
  useEffect(() => {
    const fetchDoctors = async () => {
      const { data } = await axios.get(
        "https://mern-stack-hospital-management-system-61cw.onrender.com/api/v1/user/doctors",
        { withCredentials: true }
      );
      setDoctors(data.doctors);
      console.log(data.doctors);
    };
    fetchDoctors();
  }, []);
  const handleAppointment = async (e) => {
    e.preventDefault();
    try {
      const hasVisitedBool = Boolean(hasVisited);
      const { data } = await axios.post(
        "https://mern-stack-hospital-management-system-61cw.onrender.com/api/v1/appointment/post",
        {
          firstName,
          lastName,
          email,
          phone,
          nic,
          dob,
          gender,
          appointment_date: appointmentDate,
          department,
          doctor_firstName: doctorFirstName,
          doctor_lastName: doctorLastName,
          hasVisited: hasVisitedBool,
          address,
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success(data.message);
      setFirstName(""),
        setLastName(""),
        setEmail(""),
        setPhone(""),
        setNic(""),
        setDob(""),
        setGender(""),
        setAppointmentDate(""),
        setDepartment(""),
        setDoctorFirstName(""),
        setDoctorLastName(""),
        setHasVisited(""),
        setAddress("");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <div className="appointments-page">
        <section className="appointments-hero">
          <h1 className="appointments-hero-title">Book an Appointment</h1>
          <p className="appointments-hero-description">
            Schedule your visit with our expert medical team. We're here to
            provide you with the best healthcare experience.
          </p>
        </section>

        {/* <h2>Appointment</h2> */}

        <section className="appointments-main">
          <div className="appointments-main-container">
            <div className="appointments-main-grid">
              {/* Contact Info */}
              <div>
                <div className="appointments-card">
                  <h2 className="appointments-card-title">
                    Contact Information
                  </h2>
                  <p className="appointments-card-description">
                    Get in touch with us for any queries
                  </p>
                  <div className="appointments-contact-info">
                    <Phone className="appointments-brand-icon" />
                    <div>
                      <p className="appointments-contact-label">Phone</p>
                      <p className="appointments-contact-value">
                        +91 (555) 123-4567
                      </p>
                    </div>
                  </div>
                  <div className="appointments-contact-info">
                    <Mail className="appointments-brand-icon" />
                    <div>
                      <p className="appointments-contact-label">Email</p>
                      <p className="appointments-contact-value">
                        medicare@medicare.com
                      </p>
                    </div>
                  </div>
                  <div className="appointments-contact-info">
                    <Clock className="appointments-brand-icon" />
                    <div>
                      <p className="appointments-contact-label">Hours</p>
                      <p className="appointments-contact-value">
                        Mon-Fri: 8AM-6PM
                      </p>
                      <p className="appointments-contact-value">Sat: 9AM-4PM</p>
                    </div>
                  </div>
                </div>

                <div
                  className="appointments-card"
                  style={{ marginTop: "1.5rem" }}
                >
                  <h2 className="appointments-card-title">Emergency?</h2>
                  <p className="appointments-emergency-note">
                    For medical emergencies, please call 911 or visit our
                    emergency department immediately.
                  </p>
                  <button className="appointments-emergency-button">
                    Emergency: 911
                  </button>
                </div>
              </div>

              {/* **************************** */}
              {/* Appointment Form */}
              {/* **************************** */}

              <div>
                <div className="appointments-card">
                  <h2 className="appointments-card-title">
                    Schedule Your Appointment
                  </h2>
                  <p className="appointments-card-description">
                    Fill out the form below and we'll contact you to confirm
                    your appointment
                  </p>
                  <form
                    onSubmit={handleAppointment}
                    className="appointments-form"
                  >
                    <div className="appointments-form-group">
                      <div>
                        <label className="appointments-label">
                          First Name *
                        </label>
                        <input
                          className="appointments-input"
                          type="text"
                          placeholder="First Name"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                        />
                      </div>
                      <div>
                        {/*  */}
                        <label className="appointments-label">
                          Last Name *
                        </label>
                        <input
                          className="appointments-input"
                          type="text"
                          placeholder="Last Name"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="appointments-form-group">
                      <div>
                        <label className="appointments-label">Email *</label>
                        <input
                          className="appointments-input"
                          type="text"
                          placeholder="Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="appointments-label">
                          Phone Number *
                        </label>
                        <input
                          className="appointments-input"
                          type="number"
                          placeholder="Mobile Number"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="appointments-form-group">
                      <div>
                        <label className="appointments-label">NIC *</label>
                        <input
                          className="appointments-input"
                          type="number"
                          placeholder="NIC"
                          value={nic}
                          onChange={(e) => setNic(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="appointments-label">
                          Date Of Birth *
                        </label>
                        <input
                          className="appointments-input"
                          type="date"
                          placeholder="Date of Birth"
                          value={dob}
                          onChange={(e) => setDob(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="appointments-form-group">
                      <div>
                        <label className="appointments-label">Gender *</label>
                        <select
                          value={gender}
                          onChange={(e) => setGender(e.target.value)}
                          className="appointments-select"
                        >
                          <option value="">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                      </div>
                      <div>
                        <label className="appointments-label">
                          Appointment Date *
                        </label>
                        <input
                          className="appointments-input"
                          type="date"
                          placeholder="Appointment Date"
                          value={appointmentDate}
                          onChange={(e) => setAppointmentDate(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="appointments-form-group">
                      <div>
                        <label className="appointments-label">
                          Department *
                        </label>
                        <select
                          className="appointments-select"
                          value={department}
                          onChange={(e) => {
                            setDepartment(e.target.value);
                            setDoctorFirstName("");
                            setDoctorLastName("");
                          }}
                        >
                          {departmentsArray.map((depart, index) => {
                            return (
                              <option value={depart} key={index}>
                                {depart}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      <div>
                        <label className="appointments-label">
                          Select Doctor *
                        </label>
                        <select
                          className="appointments-select"
                          value={JSON.stringify({
                            firstName: doctorFirstName,
                            lastName: doctorLastName,
                          })}
                          onChange={(e) => {
                            const { firstName, lastName } = JSON.parse(
                              e.target.value
                            );
                            setDoctorFirstName(firstName);
                            setDoctorLastName(lastName);
                          }}
                          disabled={!department}
                        >
                          <option value="">Select Doctor</option>
                          {doctors
                            .filter(
                              (doctor) => doctor.doctorDepartment === department
                            )
                            .map((doctor, index) => (
                              <option
                                key={index}
                                value={JSON.stringify({
                                  firstName: doctor.firstName,
                                  lastName: doctor.lastName,
                                })}
                              >
                                {doctor.firstName} {doctor.lastName}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>
                    <textarea
                      className="appointments-textarea"
                      rows="10"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Address"
                    />
                    <div
                      style={{
                        gap: "10px",
                        justifyContent: "flex-end",
                        flexDirection: "row",
                      }}
                    >
                      <p style={{ marginBottom: 0 }}>
                        Have you visited before?
                      </p>
                      <input
                        type="checkbox"
                        checked={hasVisited}
                        onChange={(e) => setHasVisited(e.target.checked)}
                        style={{ flex: "none", width: "25px" }}
                      />
                    </div>
                    <button className="appointments-button">
                      GET APPOINTMENT
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AppointmentForm;
