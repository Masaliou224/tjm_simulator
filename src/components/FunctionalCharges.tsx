import { useEffect, useState } from "react";
import '../App.css';
interface Charge {
  type: string;
  amount: number;
}

interface FunctionalChargesProps {
  onUpdate: (total: number) => void;
}

const chargeOptions = [
  { value: "workTools", label: "Outils de Travail" },
  { value: "rent", label: "Loyer bureau" },
  { value: "bills", label: "Factures" },
  { value: "expenses", label: "Dépenses"},
  { value: "insurance", label: "Assurances" },
  { value: "others", label: "Autres" }
];

const FunctionalCharges : React.FC<FunctionalChargesProps> = ({ onUpdate }) => {
  const [charges, setCharges] = useState<Charge[]>([]);
  const [newChargeType, setNewChargeType] = useState<string>(chargeOptions[0].value);
  const [newChargeAmount, setNewChargeAmount] = useState<number>(0);

  const isChargeAdded = charges.some(charge => charge.type === newChargeType);

  const handleAddCharge = () => {
    setCharges([...charges, { type: newChargeType, amount: newChargeAmount }]);
    setNewChargeAmount(0);
  };

  const calculateTotal = () => {
    return charges.reduce((acc, charge) => acc + charge.amount, 0);
  };

  useEffect(() => {
    onUpdate(calculateTotal());
  }, [charges]);



  return (
    <div className="card div2">
      <div className="card-body">
        <h5 className="card-title">Charges Fonctionnelles</h5>

          <div className="mb-3">
            <label className="form-label">Type de charge</label>
            <select 
              className="form-select"
              value={newChargeType}
              onChange={(e) => setNewChargeType(e.target.value)}
            >
              {chargeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Montant</label>
            <input
              type="number"
              className="form-control"
              value={newChargeAmount}
              onChange={(e) => setNewChargeAmount(parseFloat(e.target.value) )}
            />
          </div>
          <button 
            onClick={handleAddCharge} 
            className="signup-btn"
            disabled={isChargeAdded}
          >
              Ajouter Charge
          </button>
        <h6><span> Soit un total de: </span> <span> {calculateTotal()} Par mois </span></h6>
      </div>
    </div>
  );
};

export default FunctionalCharges;