import React from "react";
import { useAppSelector } from "../store/hooks";
import { ABILITY_ORDER, selectSquadAbilityAverages } from "../store/selectors";

export const AbilitySummary: React.FC = () => {
  const averages = useAppSelector(selectSquadAbilityAverages);

  return (
    <div className="ability-summary">
      <div className="ability-summary__row">
        {ABILITY_ORDER.map((k) => (
          <div key={k} className={`ability-item ${k === 'Technique' ? 'ability-item--tech' : ''}`} style={{ textAlign: "center" }}>
            <div
              style={{
                fontFamily: 'Roboto, Arial, sans-serif',
                fontWeight: 400,
                fontSize: 16,
                lineHeight: '100%',
                letterSpacing: 0,
                textAlign: 'center',
              }}
            >
              {k}
            </div>
            <div
              style={{
                marginTop: 8,
                fontFamily: 'Roboto, Arial, sans-serif',
                fontWeight: 700,
                fontSize: 24,
                lineHeight: '100%',
                letterSpacing: 0,
                textAlign: 'center',
              }}
            >
              {averages[k] == null ? "-" : averages[k]}
            </div>
          </div>
        ))}
      </div>
      <div className="ability-summary__note">* Totals as average for squad</div>
    </div>
  );
};

export default AbilitySummary;
