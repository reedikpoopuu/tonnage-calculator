import './App.css';
import React from 'react';

function App() {
  const [model, setModel] = React.useState({
    tonnage: 500,
    year: 1950
  });

  function changeModel(event) {
    const {name, value} = event.target
    setModel(prevState => {
      return {
          ...prevState, 
          [name]: Number(value)}
  })
  }

  function calculation(tonnage, year) {
    var age = new Date().getFullYear()-year;
    var result, coefficient;
    if (tonnage <= 1000) {
      result = tonnage * 0.0084;
    } else if (tonnage > 1000 && tonnage <= 10000) {
      result = 1000 * 0.0084 + (tonnage - 1000) * 0.0062;
    } else if (tonnage > 10000 && tonnage <= 25000) {
      result = 1000 * 0.0084 + 10000 * 0.0062 + (tonnage - 10000) * 0.0040;
    } else if (tonnage > 25000) {
      result = 1000 * 0.0084 + 9000 * 0.0062 + 15000 * 0.0040 + (tonnage - 25000) * 0.002;
    } else {
      result = 0;
    };

    if(age <= 5) {
      coefficient = 0.5;
    } else if (age > 5 && age <= 10) {
      coefficient = 0.75;
    } else {
      coefficient = 1;
    };

    if(tonnage < 500) {
      return <p>See ei ole laev, vaid paat...</p>
    } else if (year < 1950) {
      return <p>See laev on nüüd vanuselt lähemal Lembitule kui tänasele...</p>
    } else if (year > new Date().getFullYear()) {
      return <p>Et siis rohkem nagu kosmoselaev tulevikust?</p>
    } else {
      return <div>
              <p>Maksustatav tulu päevas: {Math.round(result * coefficient*100)/100}</p>
              <p>Maksustatav tulu aastas: {Math.round(result * coefficient*365*100)/100}</p>
              <p>Maksustatav tulu päevas {Math.round(result * coefficient*365*0.2*100)/100}</p>
            </div>
    }
  }

  return (
    <div className="App">
        <h1>
          Tonnaažikorra kalkulaator
        </h1>
        <h2>Laeva andmed</h2>
        <form>
          <label for="tonnage" id="tonnage_label">Laeva tonnaaž </label><br></br>
          <input 
          type="number" 
          name="tonnage"
          onChange={changeModel}
          value={model.tonnage}
          /><br></br>
          <label for="year" id="year_label">Laeva ehitusaasta </label><br></br>
          <input 
          type="number"
          name="year"
          onChange={changeModel}
          value={model.year}
          /><br></br><br></br>
        </form>
        <h2>Maksustatav tulu</h2>
        {calculation(model.tonnage, model.year)}
      </div>
  );
}

export default App;
