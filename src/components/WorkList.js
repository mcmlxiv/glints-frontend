import React from "react";
import { Container, Grid } from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import WorkCard from "./WorkItem";

// Rendering job list and handling props multiplication and grid
const WorkList = (props) => {
  const matches = useMediaQuery("(min-width:600px)");
  const spacingsY = matches ? 6 : 0;

  return (
    <Container>
      <Grid container direction={"row"} spacing={spacingsY}>
        <div
          className={
            "flex flex-col items-start lg:flex-row mt-4 lg:mt-10 lg:space-x-4"
          }
        >
          {/*Material Ui grid*/}
          {props.jobs?.map((job) => (
            <WorkCard
              key={job.id}
              id={job.id}
              date={job.Date}
              company={job.company}
              title={job.title}
              startDate={job.startDate}
              endDate={job.endDate}
              description={job.description}
              setShow={props.setShow}
              jobUpdateHandler={props.jobUpdateHandler}
              jobDeleteHandler={props.jobDeleteHandler}
            />
          ))}
        </div>
      </Grid>
    </Container>
  );
};
export default WorkList;
