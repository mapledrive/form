import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

/**
 * Types and interfaces
 */
interface Model {
  paramValues: ParamValue[];
  colors?: Color[];
}

interface Color {
  cover: string;
  background: string;
}

interface Param {
  id: number;
  name: string;
  type?: 'string';
}

interface ParamValue {
  paramId: number;
  value: string;
}

type InputType = [
  InputValues,
  (event: React.ChangeEvent<HTMLInputElement>) => void
];
type InputValues = { [key: number]: string };

/**
 * All data structures
 */

const initialModelData: Model = {
  paramValues: [
    {
      paramId: 1,
      value: 'повседневное',
    },
    {
      paramId: 2,
      value: 'макси',
    },
  ],
};

const initialProductParameters: Param[] = [
  {
    id: 1,
    name: 'Назначение',
  },
  {
    id: 2,
    name: 'Длина',
  },
];

/**
 * Custom hook to extract stateful logic with input handler from component
 */
const useInputHook = (): InputType => {
  const [inputs, setInputs] = useState<InputValues>(() => {
    const initialInputValues = initialModelData.paramValues.reduce(
      (acc, curr) => {
        acc[curr.paramId] = curr.value;
        return acc;
      },
      {} as any
    );
    return initialInputValues;
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, id } = event.target;
    setInputs(prevInputs => ({
      ...prevInputs,
      [id]: value,
    }));
  };

  return [inputs, handleChange];
};

/**
 * Root component that renders inputs and summary data
 */
const ParamEditor: React.FC = () => {
  const [inputs, handleChange] = useInputHook();
  return (
    <>
      <div className='input-group'>
        {initialProductParameters.map(param => (
          <div className='input-item' key={param.id}>
            <label htmlFor={param.id.toString()}>{param.name}</label>
            <input
              type='text'
              id={param.id.toString()}
              value={inputs[param.id] || ''}
              onChange={handleChange}
            />
          </div>
        ))}
      </div>
      <ParamSummary params={initialProductParameters} inputs={inputs} />
    </>
  );
};

/**
 * Model visualization component
 */
const ParamSummary: React.FC<{ params: Param[]; inputs: InputValues }> = ({
  params,
  inputs,
}) => (
  <div className='input-group'>
    <pre>
      {JSON.stringify(
        params.map(({ id, name }) => ({
          [name]: inputs[id],
        })),
        null,
        2
      )}
    </pre>
  </div>
);

ReactDOM.createRoot(document.getElementById('root')!).render(<ParamEditor />);
