// Get Users function
export const getUsers = async (authUser: any) => {
  // GET users data
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/users/auth/${authUser}`,
    {
      cache: "no-store",
    }
  );
  const users = await res.json();
  return users;
};

// Get Projects function
export const getProjects = async (authUser: any) => {
  // GET Projects data
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/projects/auth/${authUser}`,
    {
      cache: "no-store",
    }
  );
  const projects = await res.json();
  return projects;
};

// Get Developers function
export const getDevelopers = async (authUser: any) => {
  // GET Developers data
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/developers/auth/${authUser}`,
    {
      cache: "no-store",
    }
  );
  const developers = await res.json();
  return developers;
};

// Get Clients function
export const getClients = async (authUser: any) => {
  // GET Clients data
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/clients/auth/${authUser}`,
    {
      cache: "no-store",
    }
  );
  const clients = await res.json();
  return clients;
};
