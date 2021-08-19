import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
  },
}));
const ageNumbers = Array.from(Array(100).keys());
const MenuItems = ageNumbers.map((age) => (
  <MenuItem key={age} value={age + 18}>
    {age + 18}
  </MenuItem>
));
export default function SimpleSelect(props) {
  const classes = useStyles();

  const handleChange = (event) => {
    props.setAge(event.target.value);
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="age-native-simple">Age</InputLabel>
        <Select
          labelId="Age"
          id="age"
          defaultValue={"18"}
          value={props.age}
          onChange={handleChange}
        >
          {MenuItems}
        </Select>
      </FormControl>
    </div>
  );
}
