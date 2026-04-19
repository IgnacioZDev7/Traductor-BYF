import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Traductor Médico BYF</h1>
        <p>Aymara - Quechua - Español</p>
      </header>
      <main className="home-content">
        <div className="empty-container">
          {/* Aquí irá el buscador y los resultados */}
          <p>La estructura frontend está lista.</p>
        </div>
      </main>
    </div>
  );
};

export default Home;
