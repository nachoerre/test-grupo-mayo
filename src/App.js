import "./App.css";

import React, { useState, useEffect } from "react";

function App() {
  const [banners, setBanners] = useState([]);
  const [subBanners, setSubBanners] = useState([]);
  const [texts, setTexts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Función para obtener datos de la API y actualizar los estados
  async function fetchData() {
    try {
      // Obtener todos los banners
      const bannersResponse = await fetch(
        "https://test.edicionesmayo.es/api/banner"
      );
      const bannersData = await bannersResponse.json();
      setBanners(bannersData);

      // Obtener los sub-banners
      const subBannersResponse = await fetch(
        "https://test.edicionesmayo.es/api/subbanner"
      );
      const subBannersData = await subBannersResponse.json();
      setSubBanners(subBannersData);

      // Obtener los textos
      let textsResponse;
      if (searchTerm) {
        // Si se ha introducido una búsqueda, obtener los textos filtrados
        textsResponse = await fetch(
          `https://test.edicionesmayo.es/api/texts?search=${searchTerm}`
        );
      } else {
        // Si no se ha introducido una búsqueda, obtener todos los textos
        textsResponse = await fetch("https://test.edicionesmayo.es/api/texts");
      }
      const textsData = await textsResponse.json();
      setTexts(textsData);
    } catch (error) {
      console.error(error);
    }
  }

  // Llamar a la función de actualización de datos al montar el componente
  useEffect(() => {
    fetchData();
  }, [searchTerm]);

  return (
    <div className="App">
      <div id="banner-container">
        {banners.map((banner) => (
          <div>
            <img
              src={`https://test.edicionesmayo.es/storage/banners/${banner.url}`}
              key={banner.id}
              alt={banner.title}
            />
            <p>{banner.title}</p>
          </div>
        ))}
      </div>
      <div id="sub-banner-container">
        {subBanners.map((subBanner) => (
          <div>
            <img
              src={`https://test.edicionesmayo.es/storage/sub-banners/${subBanner.icon}`}
              key={subBanner.id}
              alt={subBanner.title}
            />
            <div>{subBanner.title}</div>
            <div>Período lectivo:
            <time>{subBanner.period}</time>
            <button>Acceder</button>
            </div>
            <br id="break-element"></br>
          </div>
        ))}
      </div>
      <div id="text-container">
        <input
          type="text"
          placeholder="Buscar"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        {texts.map((text) => (
          <div key={text.id}>
            <img
              src={`https://test.edicionesmayo.es/storage/texts_images/${text.url}`}
              alt={text.title}
            />
            <h2>{text.title}</h2>
            <section>
              <h3>{text.doctor}</h3>
              <p>{text.location}</p>
            </section>
            <p>{text.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
