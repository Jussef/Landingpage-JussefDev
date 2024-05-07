import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Box, Toolbar, Grid } from "@mui/material";
import Logo from "../../resources/images/header/logo.png";
import "./styles.scss";

export default function Header() {
  const navigate = useNavigate();

  useEffect(() => {
    window.onscroll = function () {
      scroll();
    };
  }, []);

  function scroll() {
    var header = document.getElementById("myHeader");
    if (window.scrollY > 0) {
      header.classList.add("scroll");
    } else {
      header.classList.remove("scroll");
    }
  }

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar id="myHeader" position="fixed" className="appBar">
          <Toolbar>
            <Grid item lg={3} md={4} sm={3} xs={4} className="padre">
              <img id="imgBanner" src={Logo} alt="logo" onClick={() => navigate("/home")} className="cursor logo hijos" />
            </Grid>
          </Toolbar>
        </AppBar>
        <div className="header"></div>
      </Box>
    </>
  );
}
