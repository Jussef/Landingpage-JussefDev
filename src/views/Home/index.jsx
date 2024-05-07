import React from "react";
import { Container, Box, Grid } from "@mui/material";
import Header from "../../components/Header";

export default function Home() {
  return (
    <div>
      <Header />
      <Container maxWidth="sm">
        <Box textAlign="center">
          <Grid container direction="row" spacing={2}>
            <Grid item md={6} xs={12}>
              <p className="">HOLA</p>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
}
