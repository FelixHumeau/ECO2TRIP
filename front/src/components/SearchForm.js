import React from 'react';
import { useNavigate } from "react-router-dom";

function SearchForm() {
  const navigate = useNavigate();
    return (
        <div>
          <div className="search-form">
            <div className="search-input">
                <div className='search-input-text'>
                    <div>Où allez-vous?</div>
                    <div>Destination</div>
                </div>
                 <img src={'./assets/Carte.png'} alt={'location'} style={{width: '20px'}} />
            </div>
            <div className="search-input">
                <div className='search-input-text'>
                    <div>Quand partez-vous?</div>
                    <div>Date d'arrivée</div>
                </div>
                <img src={'./assets/Calendrier.png'} alt={'date'} style={{width: '20px'}} />
            </div>
            <div className="search-input">
                <div className='search-input-text'>
                    <div>À combien de voyageurs?</div>
                    <div>Indifférent</div>
                </div>
                <img src={'./assets/personne.png'} alt={'people'} style={{width: '20px'}} />
            </div>
          </div>
          <button onClick={() => navigate("/trips")}>
            Rechercher
          </button>
      </div>
    );
}

export default SearchForm;