import React from 'react';
import map from '../assets/Carte.png';
import calender from '../assets/Calendrier.png';
import people from '../assets/personne.png'

function SearchForm() {
  return (
      <div className="search-form">
          <div className="inputs-container">
              <div className="input-container">
                  <input type="text" placeholder="Où allez-vous?" className="search-input" />
                  <div className="icon-container">
                    <img src={map} alt={'date'} className="icon"/>
                  </div>
              </div>
              <div className="input-container">
                  <input type="text" placeholder="Quand partez-vous?" className="search-input"/>
                  <div className="icon-container">
                    <img src={calender} alt={'date'} className="icon"/>
                  </div>
              </div>
              <div className="input-container">
                  <input type="text" placeholder="À combien de voyageurs?" className="search-input" />
                  <div className="icon-container">
                   <img src={people} alt={'people'} className="icon"/>
                  </div>
              </div>
          </div>
          <button className="search-button">Rechercher</button>
      </div>
  );
}

export default SearchForm;