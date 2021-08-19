import gql from "graphql-tag";
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloLink,
  concat,
} from "apollo-boost";
import { getAccessToken, isLoggedIn } from "./auth";

// GraphQL requests
//using Apollo Client
//HttpLink handling from apollo
const httpLink = new HttpLink({ uri: process.env.REACT_APP_GRAPHQL });
//custom middleware to add authorization to the POST header
const authLink = new ApolloLink((operation, forward) => {
  if (isLoggedIn()) {
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        userAuthorization: getAccessToken() || null,
      },
    }));
  }
  return forward(operation);
});
//Apollo Client config
const client = new ApolloClient({
  //to let us connect to the server use HTTPLink
  //uri config to accept server address

  link: concat(authLink, httpLink),

  //cache implementation this is cached objects stays in memory
  cache: new InMemoryCache({
    addTypename: false,
  }),
});

// Load all users on Sign up to compare credentials for auth
export const loadAllUsers = async () => {
  const query = gql`
    {
      users {
        id
        email
        password
        firstName
        lastName
        location
        age
        jobTitle
        showEmail
        showFirstName
        showLastName
        showLocation
        showJobTitle
        showAge
      }
    }
  `;
  const {
    data: { users },
  } = await client.query({ query });
  return await users;
};

//Load user account to do list on page mount
export const loadUserJobs = async (id) => {
  const query = gql`
    query UserQuery($id: ID!) {
      user(id: $id) {
        id
        email
        #        password
        firstName
        lastName
        location
        age
        jobTitle
        showEmail
        showFirstName
        showLastName
        showLocation
        showJobTitle
        showAge
        jobList {
          id
          company
          title
          startDate
          endDate
          description
          userId
        }
      }
    }
  `;

  const {
    data: { user },
  } = await client.query({ query, variables: { id } });
  return await user;
};

//create jobs
export const createJobs = async (input) => {
  const mutation = gql`
    mutation CreateJob($input: JobInput) {
      job: createJob(input: $input) {
        id
        company
        title
        startDate
        endDate
        description
        userId
      }
    }
  `;

  const {
    data: { job },
  } = await client.mutate({
    mutation,
    variables: { input },
  });
  return job;
};

// update jobs
export const updateJobs = async (input) => {
  const mutation = gql`
    mutation UpdateJob($input: JobInput) {
      job: updateJob(input: $input) {
        id
        company
        title
        startDate
        endDate
        description
      }
    }
  `;

  const {
    data: { job },
  } = await client.mutate({ mutation, variables: { input } });
  return await job;
};

//Delete jobs
export const deleteJobs = async (id) => {
  const mutation = gql`
    mutation DeleteJob($id: ID!) {
      job: deleteJob(id: $id) {
        id
      }
    }
  `;

  const {
    data: { job },
  } = await client.mutate({ mutation, variables: { id } });
  return await job;
};

///
//Create User
export const createUser = async (input) => {
  const mutation = gql`
    mutation CreateUser($input: UserInput) {
      user: createUser(input: $input) {
        id
        email
        password
        firstName
        lastName
        age
        jobTitle
        location
        showEmail
        showFirstName
        showLastName
        showLocation
        showJobTitle
        showAge
      }
    }
  `;
  const {
    data: { user },
  } = await client.mutate({ mutation, variables: { input } });
  return user;
};
///Update users
export const updateUser = async (input) => {
  const mutation = gql`
    mutation UpdateUser($input: UserInput) {
      user: updateUser(input: $input) {
        id
        email
        password
        firstName
        lastName
        age
        jobTitle
        location
        showEmail
        showFirstName
        showLastName
        showLocation
        showJobTitle
        showAge
      }
    }
  `;

  const {
    data: { user },
  } = await client.mutate({ mutation, variables: { input } });
  return user;
};
//Delete User
export const deleteUser = async (id) => {
  const mutation = gql`
    mutation deleteUser($id: ID) {
      user: deleteUser(id: $id) {
        id
        jobList {
          id
          company
          title
          startDate
          endDate
          description
          userId
        }
      }
    }
  `;
  const {
    data: { user },
  } = await client.mutate({ mutation, variables: { id } });
  return user;
};
