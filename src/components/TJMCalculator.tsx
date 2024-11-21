import { useState } from "react"
import FunctionalCharges from "./FunctionalCharges";
import CurrencyConverter from "./CurrencyConverter";
import axios from "axios";

const TJMCalculator: React.FC = () => {
  const [desiredSalary, setDesiredSalary] = useState<number>(0);
  const [functionalChargesTotal, setFunctionalChargesTotal] = useState<number>(0);
  // const [diversesChargesTotal, setDiversesChargesTotal] = useState<number>(0);
  const [workDays, setWorkDays] = useState<number>(0);
  const [currency, setCurrency] = useState<string>('EUR');
  const [exchangeRate, setExchangeRate] = useState<number>(1);

  const fetchExchangeRate = (baseCurrency: string) => {
    const apiKey = '5635d7e9d2f336d926994df1';
    const endpoint = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${baseCurrency}`;

    axios.get(endpoint)
      .then(response => {
        setExchangeRate(response.data.conversion_rates['EUR']);
      })
      .catch(() => {
        setExchangeRate(1);
      });
  };

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCurrency = e.target.value;
    setCurrency(selectedCurrency);
    fetchExchangeRate(selectedCurrency);
  };

  const calculateTJM = () => {
    if (workDays === 0) return 0;
    const totalCharges = (desiredSalary + functionalChargesTotal);
    return (totalCharges / workDays);
  };

  const tjm = calculateTJM();

  return (
    <div className="container mt-5"> 
      <div className="mb-4 div-title">
      <h1>Votre simulateur de calcul du TJM</h1>
      <p className="text">Vous êtes freelance ?<br></br> Vous vous demandez c'est quoi votre taux/tarif journalier moyen ?</p>
      </div> 

      <div className="div ">
        <div className="div-right">  
          <div className="mb-4 div1">
            <label className="form-label">Salaire Souhaité ({currency})</label>
            <input
              type="number"
              className="form-control"
              value={desiredSalary}
              onChange={(e) => setDesiredSalary(parseFloat(e.target.value))}
            />
          </div>

          <FunctionalCharges onUpdate={setFunctionalChargesTotal} />
          

        </div>

        <div className="div-left">
          <div className="mb-4">
            <label className="form-text">Nombre de Jours Travaillés</label>
            <input
              type="number"
              className="form-control"
              value={workDays}
              onChange={(e) => setWorkDays(parseFloat(e.target.value))}
            />
          </div>

          <div className="mb-4">
            <label className="form-text">Choisir la Devise pour le Calcul</label>
            <select className="form-select" value={currency} onChange={handleCurrencyChange}>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="CAD">CAD</option>
              <option value="XOF">FRANC CFA</option>
              <option value="GNF">GNF</option>
              {/* Ajoutez d'autres devises si nécessaire */}
            </select>
          </div>

          <h2>TJM: {tjm.toFixed(2)} {currency}</h2>

          <CurrencyConverter amount={tjm} baseCurrency={currency} />
        </div>
      </div>

      <div className="inscription">
        <p>Vous êtes freelance ? <br></br> Rejoignez la communauté de freelance Nawaari</p>
        <button className="signup-btn">S'inscrire</button>
      </div>

    </div>
  );
};

export default TJMCalculator;