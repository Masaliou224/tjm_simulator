import { useEffect, useState } from "react";
import logo from '../assets/images/Flêche.jpeg';

interface DiversesCharges {
  expenses: number;
  insurance: number;
  others: number;
}

interface DiversesChargesProps {
  onUpdate: (total: number) => void;
}

const DiversesCharges: React.FC<DiversesChargesProps> = ({ onUpdate }) => {
  const [isVisible, setVisible] = useState(false);

  const basculeVisibility = () => {
    setVisible(!isVisible);
  };

  const [charges, setCharges] = useState<DiversesCharges>({
    expenses: 0,
    insurance: 0,
    others: 0,
  });

  const calculateTotal = () => {
    return Object.values(charges).reduce((acc, charges) => acc + charges, 0);
  };

  useEffect(() => {
    onUpdate(calculateTotal());
  }, [charges]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCharges({
      ...charges,
      [e.target.name]: parseFloat(e.target.value) || 0,
    });
  };

  return (
    <div className="card div2">
      <div className="card-body">
        <h5 className="card-title">Charges Diverses</h5>
        <button onClick={basculeVisibility} className="button">{isVisible ? 'Frais diverses' : 'Frais diverses'} <img src={logo} alt="Flêche logo" className="fleche"/> </button>
        <div style={{ display: isVisible ? 'block' : 'none'}}>
          <div className="mb-3">
            <label className="form-label">Dépenses</label>
            <input
              type="number"
              className="form-control"
              name="expenses"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Assurances</label>
            <input
              type="number"
              className="form-control"
              name="insurance"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Autres</label>
            <input
              type="number"
              className="form-control"
              name="others"
              onChange={handleChange}
            />
          </div>
          
        </div>
        <h6><span> Soit un total de: </span> <span> {calculateTotal()} Par mois</span></h6>
      </div>
    </div>
  ); 
};

export default DiversesCharges;