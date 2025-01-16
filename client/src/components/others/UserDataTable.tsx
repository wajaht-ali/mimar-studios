import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable, { TableStyles } from "react-data-table-component";

interface UserData {
  index: number;
  name: string;
  email: string;
  password: string;
  joined: string;
}

const customStyles: TableStyles = {
  table: {
    style: {
      padding: "4px",
      backgroundColor: "#FFFFFF",
      color: "#333",
    },
  },
  headCells: {
    style: {
      backgroundColor: "#F3F3F3",
      color: "#333",
      paddingBottom: "5px",
    },
  },
  rows: {
    style: {
      padding: "4px 0",
      margin: "2px 0",
      backgroundColor: "#F4F4F4",
      color: "#333",
    },
  },
  pagination: {
    style: {
      backgroundColor: "#F3F3F3",
      color: "#333",
    },
  },
};

const columns = [
  {
    name: "Sr #",
    selector: (data: UserData) => data.index,
    sortable: true,
  },
  {
    name: "Name",
    selector: (data: UserData) => data.name,
    sortable: true,
  },
  {
    name: "Joined",
    selector: (data: UserData) => data.joined,
    sortable: true,
  },
  {
    name: "Email",
    selector: (data: UserData) => data.email,
    sortable: true,
  },
  {
    name: "Password",
    selector: (data: UserData) => data.password,
  },
];

const UserDataTable = () => {
  const BASE_URL = import.meta.env.VITE_APP_URL;
  const token = sessionStorage.getItem("jwtToken");
  const [data, setData] = useState<UserData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const getUsersData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/users-list`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("res data: ", res);
      if (res.data.success) {
        const usersData = res.data.users.map((user: any, index: number) => ({
          index: index + 1,
          name: user.name,
          email: user.email,
          joined: user.createdAt.split("T")[0],
          password: "******",
        }));
        setData(usersData);
        setLoading(false);
      }
    } catch (error) {
      console.log(`Error with loading data ${error}`);
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsersData();
  }, []);

  return (
    <div className="w-full md:w-[80%] flex items-center justify-center mx-auto rounded-3xl">
      <div className="w-full">
        {/* <h2 className="text-2xl font-bold mb-4">User Data Table</h2> */}
        {loading ? (
          <div className="w-full animate-pulse">
            <div className="w-full animate-pulse">
              <div className="h-6 bg-gray-300 rounded-md mb-4"></div>{" "}
              <div className="h-4 bg-gray-300 rounded-md w-1/3 mx-auto"></div>{" "}
              <div className="h-6 bg-gray-300 rounded-md mb-4"></div>{" "}
            </div>
            <div className="w-full animate-pulse">
              <div className="h-6 bg-gray-300 rounded-md mb-4"></div>{" "}
              <div className="h-4 bg-gray-300 rounded-md w-1/3 mx-auto"></div>{" "}
              <div className="h-6 bg-gray-300 rounded-md mb-4"></div>{" "}
            </div>
          </div>
        ) : (
          <div className="w-full">
            <DataTable
              title="Users Data"
              columns={columns}
              data={data}
              pagination
              highlightOnHover
              customStyles={customStyles}
              striped
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDataTable;
