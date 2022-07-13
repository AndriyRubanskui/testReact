import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Select, Input } from "antd";
import "./App.css";
import { map, get } from "lodash";

function App() {
  const [usersData, setUsersData] = useState([]);
  const [usersCountOnPage, setUsersCountOnPage] = useState(5);
  const [searchText, setSearchText] = useState("");

  const { Option } = Select;
  const Search = Input.Search;

  useEffect(() => {
    const fetchData = async () => {
      const users = await axios
        .get("https://reqres.in/api/users")
        .then((res) => res.data);
      setUsersData(users?.data);
    };
    fetchData();
  }, []);

  const handleChange = (value) => {
    setUsersCountOnPage(value);
  };

  const onSearch = (e) => {
    const reg = new RegExp(e.target.value, "gi");
    const filteredData = map(usersData, (record) => {
      const first_name = get(record, "first_name").match(reg);
      const last_name = get(record, "last_name").match(reg);
      if (!first_name && !last_name) {
        return null;
      }
      return record;
    }).filter((record) => !!record);
    setSearchText(e.target.value);
    setUsersData(filteredData);
  };

  const columns = [
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (text, record) => {
        return (
          <div>
            <img src={record.avatar}></img>
          </div>
        );
      },
    },
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "first_name",
      key: "first_name",
    },
    {
      title: "Last Name",
      dataIndex: "last_name",
      key: "last_name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
  ];

  return (
    <div className="App">
      <Table
        dataSource={usersData}
        columns={columns}
        pagination={{
          pageSize: usersCountOnPage,
          defaultCurrent: 1,
        }}
      />
      <Search
        size="large"
        onChange={onSearch}
        placeholder="Search Records"
        value={searchText}
      />
      <Select
        defaultValue="5"
        style={{
          width: 120,
        }}
        onChange={handleChange}
      >
        <Option value="5">5</Option>
        <Option value="10">10</Option>
        <Option value="20">20</Option>
      </Select>
    </div>
  );
}

export default App;
