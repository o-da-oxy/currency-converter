import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Navigation from '../navigation/Navigation';
import s from './Converter.module.css';
import { useAppDispatch } from '../../reduxToolkit/typedHooks';
import { ActionType, convert } from '../../reduxToolkit/converterSlice';

interface IValuteOutputObj {
  name: string;
  code: string;
  value: number;
}

// With a capital letter!
interface IValuteFetchedObj {
  ID: string;
  NumCode: string;
  CharCode: string;
  Nominal: number;
  Name: string;
  Value: number;
  Previous: number;
}

type FormValues = {
  input: number;
  fromCode: string;
  toCode: string;
};

function Converter() {
  const [fetchedObj, setResult] = useState<Object>();
  const dispatch = useAppDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({
    mode: 'onBlur',
  });

  useEffect(() => {
    fetch(`https://www.cbr-xml-daily.ru/daily_json.js`)
      .then((res) => res.json())
      .then((res) => {
        setResult(res);
      });
  }, []);

  // array of {Name, Code, Value}
  const getValuteObjArray = (fetchedObj: Object) => {
    const valuteOutputObjs: IValuteOutputObj[] = [];
    if (fetchedObj) {
      const valuteValues = Object.values(fetchedObj)[4];
      if (valuteValues) {
        const valuteFetchedObjs: IValuteFetchedObj[] =
          Object.values(valuteValues);
        for (const valuteFetchedObj of valuteFetchedObjs) {
          valuteOutputObjs.push({
            name: valuteFetchedObj.Name,
            code: valuteFetchedObj.CharCode,
            value: valuteFetchedObj.Value,
          });
        }
        return valuteOutputObjs;
      }
    }
    return 'Fetching Error!';
  };

  // ['AUD', 'AZN', ...]
  const getAllCodes = (fetchedObj: Object) => {
    if (fetchedObj) {
      const valuteValues = Object.values(fetchedObj)[4];
      if (valuteValues) {
        const valuteCodes: string[] = Object.keys(valuteValues);
        return valuteCodes;
      }
    }
    return 'AUD';
  };

  // JSX options
  const createOptionsForSelect = (allCodes: string[] | string) => {
    if (Array.isArray(allCodes)) {
      return (
        <>
          {allCodes.map((code, i) => (
            <option key={i}>{code}</option>
          ))}
        </>
      );
    }
    return <option>{allCodes}</option>;
  };

  function handleFromSelect() {
    const select = document.getElementById('fromCode') as HTMLSelectElement;
    const { text } = select.options[select.selectedIndex];
    return text;
  }

  function handleToSelect() {
    const select = document.getElementById('toCode') as HTMLSelectElement;
    const { text } = select.options[select.selectedIndex];
    return text;
  }

  // {Currency code} => {Currency code} from options
  function fromNameToName(fetchedObj: Object) {
    if (fetchedObj) {
      let fromValuteName = '';
      let toValuteName = '';
      const fromValuteCode = handleFromSelect();
      const toValuteCode = handleToSelect();
      const valutesInfo = getValuteObjArray(fetchedObj!);
      if (Array.isArray(valutesInfo)) {
        for (const valuteCodeValueObj of valutesInfo) {
          if (valuteCodeValueObj.code === fromValuteCode) {
            fromValuteName = valuteCodeValueObj.name;
          }
          if (valuteCodeValueObj.code === toValuteCode) {
            toValuteName = valuteCodeValueObj.name;
          }
        }
      }
      return `${fromValuteName} => ${toValuteName}`;
    }
    return 'Австралийский доллар => Австралийский доллар';
  }

  // submit handler
  const handleConvertBtn: SubmitHandler<FormValues> = (data) => {
    const valutesInfo = getValuteObjArray(fetchedObj!);
    let fromValutesValue = 0;
    let toValutesValue = 0;
    if (Array.isArray(valutesInfo)) {
      for (const valuteCodeValueObj of valutesInfo) {
        if (valuteCodeValueObj.code === data.fromCode) {
          fromValutesValue = valuteCodeValueObj.value;
        }
        if (valuteCodeValueObj.code === data.toCode) {
          toValutesValue = valuteCodeValueObj.value;
        }
      }
    }
    const actionPayload: ActionType = {
      inputValue: data.input,
      fromCode: data.fromCode,
      fromValue: fromValutesValue,
      toCode: data.toCode,
      toValue: toValutesValue,
    };
    dispatch(convert(actionPayload));
    const resultValue = (fromValutesValue / toValutesValue) * data.input;
    const resultField = document.getElementById('result') as HTMLSelectElement;
    resultField.textContent = resultValue.toString();
  };

  return (
    <div className={s.converterWrapper}>
      <div className={s.indent}>
        <form className={s.input} onSubmit={handleSubmit(handleConvertBtn)}>
          <input
            {...register('input', {
              required: 'Please, enter an amount!',
              pattern: {
                value: /^([0-9]*[.]?[0-9]+)$/,
                message:
                  'Please, enter a valid number of the form {1} or {1.1} !',
              },
            })}
            id="input"
            placeholder="0"
            className={s.inputField}
          />
          <select
            {...register('fromCode')}
            id="fromCode"
            className={s.selectField}
            onChange={handleFromSelect}
          >
            {createOptionsForSelect(getAllCodes(fetchedObj!))}
          </select>
          <select
            {...register('toCode')}
            id="toCode"
            className={s.selectField}
            onChange={handleToSelect}
          >
            {createOptionsForSelect(getAllCodes(fetchedObj!))}
          </select>
          <button
            id="button"
            name="button"
            type="submit"
            className={s.convertButton}
          >
            Convert
          </button>
        </form>
        <div id="errors" className={s.errorsField}>
          {errors?.input && <p>{errors?.input?.message || 'Error!'}</p>}
        </div>
        <div id="names" className={s.result}>
          {fromNameToName(fetchedObj!)}
        </div>
        <div id="result" className={s.result} />
      </div>
      <Navigation text="History" />
    </div>
  );
}

export default Converter;
