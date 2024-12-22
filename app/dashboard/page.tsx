const Dashboard = () => {
  return (
    <div className="m-4">
      <div className="my-4 p-4 flex items-center justify-around ">
        <div className="bg-green-300 px-10 py-6 rounded">
          <div>+10</div>
          <div>Clients</div>
        </div>
        <div className="bg-green-300 px-10 py-6 rounded">
          <div>10</div>
          <div>Users</div>
        </div>
        <div className="bg-green-300 px-10 py-6 rounded">
          <div>+10</div>
          <div>Projects</div>
        </div>
      </div>
      <div className="bg-orange-200">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="w-full bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left w-1/3">Project</th>
              <th className="py-3 px-6 text-left w-1/3">Client</th>
              <th className="py-3 px-6 text-left w-1/3">Developer</th>
              <th className="py-3 px-6 text-left w-1/3">Status</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            <tr className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6">Project</td>
              <td className="py-3 px-6">Client</td>
              <td className="py-3 px-6">Developer</td>
              <td className="py-3 px-6">Active</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
