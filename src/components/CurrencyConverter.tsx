import axios from "axios";
import { useEffect, useState } from "react";

interface CurrencyConverterProps {
  amount: number;
  baseCurrency: string;
}

const CurrencyConverter: React.FC<CurrencyConverterProps> = ({ amount, baseCurrency }) => {
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);
  const [targetCurrency, setTargetCurrency] = useState<string>('USD');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (amount > 0) {
      setLoading(true);
      setError(null);

      const apiKey = '5635d7e9d2f336d926994df1';
      const endpoint = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${baseCurrency}/${targetCurrency}/${amount}`;

      axios.get(endpoint) 
        .then(response => {
          setConvertedAmount(response.data.conversion_result);
          setLoading(false);
        })
        .catch(() => {
          setError('Erreur lors de la récupération des données de conversion.');
          setLoading(false);
        });
    }
  }, [amount, baseCurrency, targetCurrency]);

  return (
    <div className="mt-4">
      <h5>Convertir le TJM en une autre devise</h5>
      <div className="mb-3">
        <label className="form-text">Choisissez une devise</label>
        <select
          className="form-select"
          value={targetCurrency}
          onChange={(e) => setTargetCurrency(e.target.value)}
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="CAD">CAD</option>
          <option value="XOF">FRANC CFA</option>
          <option value="GNF">GNF</option>
          {/* Ajoutez d'autres devises si nécessaire */}
        </select>
      </div>
      {loading ? (
        <p>Chargement...</p>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : (
        <h5>TJM Converti: {convertedAmount?.toFixed(2)} {targetCurrency}</h5>
      )}
    </div>
  );
};

export default CurrencyConverter;