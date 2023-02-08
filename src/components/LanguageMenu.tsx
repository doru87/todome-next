import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import { spacing } from "@mui/system";
import { Box, Container, Typography } from "@mui/material";
import { useRouter } from "next/router";
import Router from "next/router";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import cookie from "js-cookie";

export default function LanguageMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event:any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // const handleSelectLanguage = (event) => {
  //   const { myValue } = event.currentTarget.dataset;
  //   console.log(myValue); // --> 123
  //   cookie.set("language", myValue, { expires: 360 });
  // };
 
  const { locale, locales } = useRouter();

  const [values, setValues] = React.useState({
    language: ""
  });

React.useEffect(() => {

}, [values])

  function handleChange(event:any) {
    
    setValues(oldValues => ({
      ...oldValues,
      [event.target.name]: event.target.value
    }));
    cookie.set("language", values.language, { expires: 360 });
  }
  return (
    <Container maxWidth="lg">
      {/* <Button
        id="fade-button"
        aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        Selectati limba
      </Button> */}
      {/* <Menu
        id="fade-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      > */}
        <FormControl variant="standard" sx={{ m: 1, minWidth: 150 }}>
        <InputLabel htmlFor="language">
          Language
        </InputLabel>
          <Select
            value={values.language}
            onChange={handleChange}
            displayEmpty
            // defaultOpen={true}
            // defaultValue={locale}
            // inputProps={{ "aria-label": "Without label" }}
            inputProps={{
                name: "language",
                id: "language"
              }}
          >
        {locales && locales.map((locale) => {
          return (
            <MenuItem
              // onClick={handleSelectLanguage}
              // data-my-value={locale}
              value={locale}
              key={locale}
              sx={{ width: 150 }}
            >
              <Box 
                className={`${
                  locale == "gb"
                    ? "fi fi-gb"
                    : locale == "ro"
                    ? "fi fi-ro"
                    : locale == "fr"
                    ? "fi fi-fr"
                    : "fi fi-de"
                } `}
              ></Box>
              <Box sx={{ ml: 1 }}>
                {locale == "ro"
                  ? "Romana"
                  : locale == "gb"
                  ? "English"
                  : locale == "fr"
                  ? "Français"
                  : "Deutsch"}
              </Box>
            </MenuItem>
          );
        })}
        </Select>
        </FormControl>
      {/* </Menu> */}
    </Container>
  );
}