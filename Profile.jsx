import React, { useState, useEffect } from 'react';

const Profile = () => {
  // Initial state for the form inputs
  const [vendor, setVendor] = useState('');
  const [name, setName] = useState('');
  const [aadhar, setAadhar] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [remark, setRemark] = useState('');
  const [profession, setProfession] = useState(''); // Profession state

  // State for holding existing profile data (for update)
  const [profiles, setProfiles] = useState([]);

  // Fetch profiles from localStorage on initial render
  useEffect(() => {
    const savedProfiles = JSON.parse(localStorage.getItem('profiles')) || [];
    setProfiles(savedProfiles);
  }, []);

  // Handle form submission (Create and Update)
  const handleSubmit = (e) => {
    e.preventDefault();
    const newProfile = {
      id: Date.now(), // Unique ID using current timestamp
      vendor,
      name,
      aadhar,
      mobile,
      address,
      remark,
      profession, // Add profession to the new profile
    };

    const updatedProfiles = [...profiles, newProfile];
    setProfiles(updatedProfiles);
    localStorage.setItem('profiles', JSON.stringify(updatedProfiles));

    // Reset the form after submission
    resetForm();
  };

  // Handle Update operation
  const handleEdit = (id) => {
    const profileToEdit = profiles.find(profile => profile.id === id);
    setVendor(profileToEdit.vendor);
    setName(profileToEdit.name);
    setAadhar(profileToEdit.aadhar);
    setMobile(profileToEdit.mobile);
    setAddress(profileToEdit.address);
    setRemark(profileToEdit.remark);
    setProfession(profileToEdit.profession); // Set profession during edit

    // Remove the profile from the list for later update
    setProfiles(profiles.filter(profile => profile.id !== id));
  };

  // Handle Delete operation
  const handleDelete = (id) => {
    const updatedProfiles = profiles.filter(profile => profile.id !== id);
    setProfiles(updatedProfiles);
    localStorage.setItem('profiles', JSON.stringify(updatedProfiles));
  };

  // Reset form fields
  const resetForm = () => {
    setVendor('');
    setName('');
    setAadhar('');
    setMobile('');
    setAddress('');
    setRemark('');
    setProfession(''); // Reset profession
  };

  return (
    <div>
      <h1>Profile Management</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="vendor">Vendor:</label>
          <select
            id="vendor"
            value={vendor}
            onChange={(e) => setVendor(e.target.value)}
            required
          >
            <option value="">Select Vendor</option>
            <option value="wheat">Wheat</option>
            <option value="soyabean">Soyabean</option>
            <option value="crude oil">Crude Oil</option>
          </select>
        </div>

        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="aadhar">Aadhar Card No.:</label>
          <input
            type="text"
            id="aadhar"
            value={aadhar}
            onChange={(e) => setAadhar(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="mobile">Mobile Number:</label>
          <input
            type="text"
            id="mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="remark">Remark:</label>
          <textarea
            id="remark"
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
          ></textarea>
        </div>

        {/* Profession Field */}
        <div>
          <label htmlFor="profession">Profession:</label>
          <select
            id="profession"
            value={profession}
            onChange={(e) => setProfession(e.target.value)}
            required
          >
            <option value="">Select Profession</option>
            <option value="farmer">Farmer</option>
            <option value="middleman">Middleman</option>
            <option value="driver">Driver</option>
            <option value="coolie">Coolie</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Show a custom input box if 'Other' is selected for profession */}
        {profession === 'other' && (
          <div>
            <label htmlFor="customProfession">Custom Profession:</label>
            <input
              type="text"
              id="customProfession"
              value={profession}
              onChange={(e) => setProfession(e.target.value)}
              required
            />
          </div>
        )}

        <button type="submit">Save Profile</button>
      </form>

      <h2>Profile List</h2>
      <ul>
        {profiles.map((profile) => (
          <li key={profile.id}>
            <strong>Vendor:</strong> {profile.vendor} <br />
            <strong>Name:</strong> {profile.name} <br />
            <strong>Aadhar:</strong> {profile.aadhar} <br />
            <strong>Mobile:</strong> {profile.mobile} <br />
            <strong>Address:</strong> {profile.address} <br />
            <strong>Remark:</strong> {profile.remark} <br />
            <strong>Profession:</strong> {profile.profession} <br />
            <button onClick={() => handleEdit(profile.id)}>Edit</button>
            <button onClick={() => handleDelete(profile.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;
