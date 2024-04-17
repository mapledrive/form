import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

// данные с информацией о товаре
interface Model {
  paramValues: ParamValue[];
  colors?: Color[];
}

interface Color {
  cover: string;
  background: string;
}

interface ParamValue {
  paramId: number;
  value: string;
}

const initialData: Model = {
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

// набор параметров товара
// Решение должно быть легко расширяемым
// (например, позволять легко добавлять новые типы параметров –
// не только текстовые, но например числовые или со списком значений)
interface Param {
  id: number;
  name: string;
  type?: 'string';
}

// interface Props {
//   params: Param[];
//   model: Model;
// }

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

type InputType = [
  Param[],
  (event: React.ChangeEvent<HTMLInputElement>) => void
];

const useInputHook = (): InputType => {
  const [inputs, setInputs] = useState<any>(() => {
    const initialInputValues = initialData.paramValues.reduce((acc, curr) => {
      acc[curr.paramId] = curr.value;
      return acc;
    }, {} as any);
    return initialInputValues;
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, id } = event.target;
    setInputs((prevInputs: { id: string; value: string }) => ({
      ...prevInputs,
      [id]: value,
    }));
  };

  return [inputs, handleChange];
};

const ProductParameterInputs: React.FC = () => {
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
      <br />
      <div className='input-group'>
        <pre>
          {JSON.stringify(
            initialProductParameters.map(({ id, name }) => ({
              [name]: inputs[id],
            })),
            null,
            2
          )}
        </pre>
      </div>
    </>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ProductParameterInputs />
);
