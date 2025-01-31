import React, { useState } from 'react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    prenom: '',
    nom: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f1f8e9',
    }}>
      <div style={{
        backgroundColor: '#dcedc8',
        padding: '60px',
        paddingRight: '80px',
        borderRadius: '20px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
        width: '70%', // Formulaire beaucoup plus large
        maxWidth: '1000px', // Limite maximale pour éviter un débordement sur très grands écrans
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px', fontSize: '2rem' }}>Nous contacter :</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="prenom" style={{ display: 'block', marginBottom: '10px', fontSize: '1.2rem' }}>Prénom</label>
            <input
              type="text"
              id="prenom"
              name="prenom"
              value={formData.prenom}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '15px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                fontSize: '1.1rem',
              }}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="nom" style={{ display: 'block', marginBottom: '10px', fontSize: '1.2rem' }}>Nom de famille</label>
            <input
              type="text"
              id="nom"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '15px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                fontSize: '1.1rem',
              }}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="email" style={{ display: 'block', marginBottom: '10px', fontSize: '1.2rem' }}>Adresse email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '15px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                fontSize: '1.1rem',
              }}
            />
          </div>
          <div style={{ marginBottom: '30px' }}>
            <label htmlFor="message" style={{ display: 'block', marginBottom: '10px', fontSize: '1.2rem' }}>Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="8"
              style={{
                width: '100%',
                padding: '15px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                fontSize: '1.1rem',
              }}
            />
          </div>
          <button type="submit" style={{
            backgroundColor: '#4CAF50',
            color: 'white',
            padding: '15px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            width: '100%',
            fontSize: '1.2rem',
          }}>Envoyer</button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;