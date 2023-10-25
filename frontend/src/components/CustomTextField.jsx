import React, { useEffect, useRef, useState } from 'react';
import TextField from '@mui/material/TextField';
const CustomTextField = (props) => {
  const { value, onChange, ...rest } = props;
  const [cursor, setCursor] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const input = inputRef.current;
    if (input) {
      input.setSelectionRange(cursor, cursor);
    }
  }, [cursor, value]);

  const handleChange = (e) => {
    setCursor(e.target.selectionStart);
    onChange && onChange(e);
  };

  return (
    <TextField
      inputRef={inputRef}
      value={value}
      onChange={handleChange}
      {...rest}
    />
  );
};

export default CustomTextField;
