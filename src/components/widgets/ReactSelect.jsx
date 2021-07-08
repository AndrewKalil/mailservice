import Select from "react-select";

export const CustomSelect = ({
  options,
  defaultValue,
  placeholder,
  onChange,
  value,
}) => {
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      fontSize: "13px",
    }),
    control: (provided, state) => ({
      // none of react-select's styles are passed to <Control />
      display: "flex",
      border: "1px solid #dce6e6",
      borderRadius: "7px",
      width: "100%",
      margin: "0",
      height: "35px",
      backgroundColor: "white",
      fontSize: "13px",
      color: "#757371",
      fontFamily: `'Open Sans', sans-serif`,
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
    placeholder: () => ({
      fontSize: "13px",
      color: "#757371",
      fontFamily: `'Open Sans', sans-serif`,
    }),
  };

  return (
    <Select
      styles={customStyles}
      options={options}
      defaultValue={defaultValue}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
    />
  );
};
