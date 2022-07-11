import React, { ChangeEvent, useState, FC, useEffect } from "react";
import { GetServerSideProps } from "next";
import {
  Button,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import Cookies from "js-cookie";
import axios from "axios";
// MIS COMPONENTES
import { Layout } from "../components/layouts";
// INTERFACES
interface Props {
  theme: string;
  name: string;
}
// INICIO
const ThemeChangerPage: FC<Props> = ({ theme }) => {
  // PROPS

  // STATE
  const [currentTheme, setCurrentTheme] = useState(theme);
  // EFFECT
  useEffect(() => {}, []);
  // FUNCIONES
  const onThemeChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const selectedTheme = e.target.value;
    setCurrentTheme(selectedTheme);
    Cookies.set("theme", selectedTheme);
  };
  const onClick = async () => {
    const { data } = await axios.get("/api/hello");
    console.log("theme-changer LINE 39 =>", { data });
  };
  // RENDER
  return (
    <Layout>
      <Card>
        <CardContent>
          <FormControl>
            <FormLabel>Theme</FormLabel>
            <RadioGroup value={currentTheme} onChange={onThemeChange}>
              <FormControlLabel
                value="ligth"
                control={<Radio />}
                label="Ligth"
              />
              <FormControlLabel value="dark" control={<Radio />} label="Dark" />
              <FormControlLabel
                value="custom"
                control={<Radio />}
                label="Custom"
              />
            </RadioGroup>
          </FormControl>
          <Button onClick={onClick}>Solicitud</Button>
        </CardContent>
      </Card>
    </Layout>
  );
};
// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { theme = "ligth", name = "Default" } = req.cookies;
  const validThemes = ["ligth", "dark", "custom"];
  return {
    props: {
      theme: validThemes.includes(theme) ? theme : "dark",
      name,
    },
  };
};

export default ThemeChangerPage;
