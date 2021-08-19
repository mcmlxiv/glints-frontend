import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import WorkList from "../components/WorkList";
import { buttonWork, messageWork, titleWork } from "../text";
import WorkModal from "../components/WorkModal";
import { useCrud } from "../Hooks/useCrud";
import UserAccount from "../components/UserAccount";
import SignOut from "../components/SignOut";

const Account = (props) => {
  const [show, setShow] = useState(false);

  const { jobAddHandler, jobDeleteHandler, jobUpdateHandler, jobs } = useCrud();

  return (
    <div id={"app-root"} className={"flex justify-center h-full"}>
      <div
        className={"flex items-center justify-center min-h-screen"}
        onClick={() => {
          setShow(false);
        }}
      >
        <WorkModal
          showIn={show}
          title={titleWork}
          message={messageWork}
          buttonText={buttonWork}
          onClose={() => setShow(false)}
          onAddJob={jobAddHandler}
        />
        <div className="flex flex-col space-y-8 lg:space-y-12 items-center justify-center w-screen h-full ">
          <section className="self-start w-full text-base lg:text-2xl px-10 lg:px-4  md:px-20 py-6 flex  items-center justify-between shadow-md ">
            <div className="flex  ">
              <div className="cursor-pointer flex ">
                AllHands <p className="px-2">🙌</p>
              </div>
            </div>
            <SignOut handleLogout={props.handleLogout} />
          </section>

          <UserAccount handleLogout={props.handleLogout} />
          <section className=" h-full w-full flex lg:items-start justify-center px-10 md:px-20 ">
            <div className="flex flex-col items-center space-y-4">
              <div className={"flex items-center"}>
                <AddIcon
                  className={
                    "cursor-pointer hover:bg-blue-400 rounded-full mr-4"
                  }
                  onClick={(e) => {
                    setShow(true);
                    e.stopPropagation();
                  }}
                />
                Add your Work Experience 👔
              </div>
              <WorkList
                jobs={jobs}
                setShow={setShow}
                jobUpdateHandler={jobUpdateHandler}
                jobDeleteHandler={jobDeleteHandler}
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Account;
