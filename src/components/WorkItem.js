import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Tooltip } from "@material-ui/core";
import WorkModal from "./WorkModal";
import { buttonWork, messageWork, titleWork } from "../text";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: "27rem",
    boxShadow: "0 2px 4px 0 rgba( 0, 0, 0, 0.37 )",
    maxWidth: "27rem",
    maxHeight: "40rem",
    [theme.breakpoints.down("md")]: {
      display: "flex",
      flexDirection: "column",
      width: "30vw",
      padding: "0 1rem",
      maxWidth: "75vw",
      minWidth: "75vw",
    },
  },
  title: {
    fontSize: 14,
  },
  grid: {
    gridRowEnd: "span 2",
    marginBottom: "1rem",
  },
  pos: {
    marginBottom: 12,
    fontSize: "0.9rem",
  },
}));

export default function WorkCard(props) {
  const classes = useStyles();
  const [show, setShow] = useState(false);

  if (!props.company) return null;

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      className={classes.grid}
      key={props.id}
    >
      <WorkModal
        showIn={show}
        title={titleWork}
        message={messageWork}
        buttonText={buttonWork}
        onClose={() => setShow(false)}
        onUpdateJob={props.jobUpdateHandler}
        onDeleteJob={props.jobDeleteHandler}
        id={props.id}
        company={props.company}
        jobTitle={props.title}
        startDate={props.startDate}
        endDate={props.endDate}
        jobDescription={props.description}
        update={true}
      />
      <Card className={classes.root} elevation={3} variant="outlined">
        <div className={"flex items-center w-full "}>
          <div className={"px-2"}>
            <div className=" rounded-full h-12 w-12 bg-indigo-400 flex items-center justify-center p-10 text-white">
              <div className="uppercase font-bold mx-1">
                {props.company[0] + props.company[1]}
              </div>
            </div>
          </div>
          <CardContent className={" w-full"}>
            <div className={"flex  justify-between items-center "}>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                💼 <span className="mx-2 text-gray-400 ">{props.company}</span>
              </Typography>
              <div className="flex lg:space-x-2 lg:space-y-0 space-y-2  lg:flex-row flex-col">
                <Tooltip title={"Edit"} arrow>
                  <button
                    onClick={(e) => {
                      setShow(true);
                      e.stopPropagation();
                    }}
                    className="bg-blue-400 p-1 rounded-full text-sm shadow-md hover:bg-gray-600"
                  >
                    ✏️
                  </button>
                </Tooltip>
                <Tooltip title={"Delete"} arrow>
                  <button
                    onClick={(e) => {
                      props.jobDeleteHandler(props.id);
                    }}
                    className="bg-red-400 p-1 rounded-full text-sm shadow-md hover:bg-gray-600"
                  >
                    🗑️
                  </button>
                </Tooltip>
              </div>
            </div>

            <Typography variant="h6" component="h2">
              {props.title}
            </Typography>
            <div className={"text-xs text-gray-400 "}>
              {props.startDate} to {props.endDate}
            </div>
            <Typography
              variant="body2"
              component="p"
              className={" pt-2 break-all"}
            >
              {props.description}
            </Typography>
          </CardContent>
        </div>
      </Card>
    </Grid>
  );
}
