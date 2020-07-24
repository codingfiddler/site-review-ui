import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { Rating } from "@material-ui/lab";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import christine from "./christine.jpg";

// TODO: Accordion to see details?

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
});

const StyledRating = withStyles({
  iconFilled: {
    color: "#ff6d75",
  },
})(Rating);

export default function PageSummary({ averageRating, totalPerRating }) {
  const classes = useStyles();

  return (
    <div style={{ padding: "0% 0% 2.5%" }}>
      <h2 style={{ textAlign: "left" }}>Page Summary</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div style={{ maxWidth: "30%" }}>
          <Accordion style={{ backgroundColor: "#fff1f3" }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontWeight: "bold",
                }}
              >
                Average Rating: {averageRating}
              </div>
              {/* <StyledRating
                name="customized-color"
                precision={1}
                value={5}
                icon={<FavoriteIcon fontSize="inherit" />}
                style={{ margin: "10px" }}
                readOnly={true}
              /> */}
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        fontWeight: "bold",
                      }}
                    >
                      {totalPerRating[5]}
                    </div>
                    <StyledRating
                      name="customized-color"
                      precision={1}
                      value={5}
                      icon={<FavoriteIcon fontSize="inherit" />}
                      style={{ margin: "10px" }}
                      readOnly={true}
                    />
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        fontWeight: "bold",
                      }}
                    >
                      {totalPerRating[4]}
                    </div>
                    <StyledRating
                      name="customized-color"
                      precision={1}
                      value={4}
                      icon={<FavoriteIcon fontSize="inherit" />}
                      style={{ margin: "10px" }}
                      readOnly={true}
                    />
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        fontWeight: "bold",
                      }}
                    >
                      {totalPerRating[3]}
                    </div>
                    <StyledRating
                      name="customized-color"
                      precision={1}
                      value={3}
                      icon={<FavoriteIcon fontSize="inherit" />}
                      style={{ margin: "10px" }}
                      readOnly={true}
                    />
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        fontWeight: "bold",
                      }}
                    >
                      {totalPerRating[2]}
                    </div>
                    <StyledRating
                      name="customized-color"
                      precision={1}
                      value={2}
                      icon={<FavoriteIcon fontSize="inherit" />}
                      style={{ margin: "10px" }}
                      readOnly={true}
                    />
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        fontWeight: "bold",
                      }}
                    >
                      {totalPerRating[1]}
                    </div>
                    <StyledRating
                      name="customized-color"
                      precision={1}
                      value={1}
                      icon={<FavoriteIcon fontSize="inherit" />}
                      style={{ margin: "10px" }}
                      readOnly={true}
                    />
                  </div>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </div>
        <div style={{ maxWidth: "30%" }}>
          <Accordion style={{ backgroundColor: "#fff1f3" }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <div style={{ fontWeight: "bold" }}>Total Reviews: 5</div>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <div style={{ width: "100%", display: "flex" }}>
                    <Avatar alt="Christine Luo" src={christine} />
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginLeft: "10px",
                      }}
                    >
                      Christine (@christineluo)
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <div style={{ width: "100%", display: "flex" }}>
                    <Avatar alt="Christine Luo" src={christine} />
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginLeft: "10px",
                      }}
                    >
                      Christine
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <div style={{ width: "100%", display: "flex" }}>
                    <Avatar alt="Christine Luo" src={christine} />
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginLeft: "10px",
                      }}
                    >
                      Christine
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <div style={{ width: "100%", display: "flex" }}>
                    <Avatar alt="Christine Luo" src={christine} />
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginLeft: "10px",
                      }}
                    >
                      Christine
                    </div>
                  </div>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </div>
        <div style={{ minWidth: "30%" }}>
          <Accordion style={{ backgroundColor: "#fff1f3" }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <div style={{ fontWeight: "bold" }}>Page Metrics</div>
            </AccordionSummary>
            <AccordionDetails>Total Views: 100</AccordionDetails>
          </Accordion>
        </div>
      </div>
    </div>
  );
}
