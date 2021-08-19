import { useEffect, useState } from "react";
import {
  createJobs,
  loadUserJobs,
  deleteJobs,
  updateJobs,
} from "../api/requests";
import { getUserToken } from "../api/auth";

//Crud operations
const useCrud = () => {
  const [jobs, setJobs] = useState([]);

  //Saving and Render from db
  useEffect(() => {
    //store state as side effect to local storage for easy persistence through page reload
    //load gql data from post req in requests file
    (async () => {
      //jobList for specific users
      const userQuery = await loadUserJobs(getUserToken());
      if (userQuery) {
        setJobs(userQuery.jobList);
      } else {
        setJobs([]);
      }
    })();
  }, []);

  ////ADDING Jobs
  const jobAddHandler = (company, title, startDate, endDate, description) => {
    //uniqueId only produces an id set per session upon refresh the count goes back 0 causing localstorage clash
    //read local storage and make unique check and add 1 if id found maintaining +1 pattern
    //check database obj for highest occurring id and store
    const highestId = !jobs
      ? 0
      : Math.max.apply(
          Math,
          jobs.map((high) => {
            return Number(high.id);
          })
        );
    //check for -infinity value that occurs when local storage is empty and return undefined
    const highCheck = highestId > 0 ? highestId : undefined;
    //if undefined value return 1 for first job
    const id = highCheck ? `${String(highCheck + 1)}` : "1";

    setJobs((prevJobs) => [
      ...(prevJobs || []),
      {
        id,
        company,
        title,
        startDate,
        endDate,
        description,
        userId: getUserToken(),
      },
    ]);
    //Database operation Create
    createJobs({
      id,
      company,
      title,
      startDate,
      endDate,
      description,
      userId: getUserToken(),
    }).then();
  };

  ////DELETE Jobs
  const jobDeleteHandler = (jobId) => {
    setJobs((prevJobs) => {
      //return obj with all the arr with id !== to current Jobs
      return prevJobs.filter((job) => job.id !== jobId);
    });
    //Database operation Delete
    deleteJobs(jobId).then(() => console.log("successfully deleted job"));
  };

  const jobUpdateHandler = (
    jobId,
    company,
    title,
    startDate,
    endDate,
    description
  ) => {
    const updatedJob = jobs.find((element) => element.id === jobId);
    if (!updatedJob) {
      return null;
    } else {
      //checking for undefined values from text,date, title updates if none return
      updatedJob.title = title ? title : updatedJob.title;
      updatedJob.company = company ? company : updatedJob.company;
      updatedJob.startDate = startDate ? startDate : updatedJob.startDate;
      updatedJob.endDate = endDate ? endDate : updatedJob.endDate;
      updatedJob.description = description
        ? description
        : updatedJob.description;
      //on successful update of jobs find and set the date to new date and Edited time
    }

    setJobs((prevJob) => {
      return prevJob.filter((updatedJob) => updatedJob.id !== jobId);
    });

    setJobs((prevJob) => [...prevJob, updatedJob]);
    updateJobs(updatedJob).then();
  };

  return {
    jobAddHandler,
    jobDeleteHandler,
    jobUpdateHandler,
    jobs,
  };
};

export { useCrud };
