import * as React from "react";

interface CheckoutInputProps {
  value: any;
  setValue: (newValue: any, inputName: string) => void;
  inputName: string;
  type: string;
  labelName: string;
}

const CheckoutInput: React.FC<CheckoutInputProps> = ({
  labelName,
  setValue,
  inputName,
  type,
  value,
}) => {
  const [internalValue, setInternalValue] = React.useState(value);

  function setNewValue(newValueToSet: any) {
    setValue(newValueToSet, inputName);

    setInternalValue(newValueToSet);
  }

  return (
    <div className="input">
      <div className="form__group">
        <input
          type={type}
          className="form__input"
          id="name"
          placeholder={labelName}
          value={internalValue}
          onChange={(event) => {
            setNewValue(event.target.value);
          }}
        />
        <label className="form__label">{labelName}</label>
      </div>
    </div>
  );
};

export default CheckoutInput;
