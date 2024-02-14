import React, { useEffect, useState } from "react";
import "./styles.scss";

export default function Home() {
  useEffect(() => {}, []);

  return (
    <>
      <Box id="Home" textAlign="center" className="mt">
        <Grid container direction="row" spacing={2}>
          <Grid item md={6} xs={12}>
            <p className="">ss</p>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
