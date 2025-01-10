"use client";

import React from "react";
import { Space, Table, Tag, Avatar, Tooltip, Flex } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const getInitial = (name) => {
  return name?.charAt(0).toUpperCase();
}

const getRandomColor = (() => {
  let counter = 0;
  return () => {
    const colors = [
      "magenta",
      "red",
      "volcano",
      "orange",
      "gold",
      "lime",
      "green",
      "cyan",
      "blue",
      "geekblue",
      "purple",
    ];
    counter = (counter + 1) % colors.length;
    return colors[counter];
  };
})();

export default function ATable({ tableKey, dataSource, loading, ...props }) {
  const generateColumns = (key: string) => {
    switch (key) {
      case "posts":
        return [
          {
            title: "TITLE",
            dataIndex: "title",
            key: "title",
            render: (_, record) => (
              <div
                className="flex flex-col items-start gap-2 pr-2 border-gray-200"
                key={record.id}
              >
                <div className="w-full">
                  <strong>{record.title}</strong>
                </div>
                <div className="w-full">
                  <strong>Excerpt: </strong> {record.excerpt}
                </div>
                <div className="w-full flex items-center justify-start gap-1  ">
                  <strong className="text-black mr-2">Authors: </strong>
                  <Avatar.Group
                    max={{
                      count: 3,
                      style: {
                        color: "#f56a00",
                        backgroundColor: "#fde3cf",
                        padding: "0xp 4px",
                      },
                    }}
                    className="pl-2"
                  >
                    {record.authors.map((author, index) => (
                      <React.Fragment key={author.id}>
                        {index <= 2 && (
                          <Avatar
                            title={author.name}
                            src={author.avatar ? author.avatar : null}
                            style={{ backgroundColor: "#ccc" }}
                            border="2px solid #ccc"
                          >
                            {!author.avatar && getInitial(author.name)}
                          </Avatar>
                        )}
                        {index >= 3 && (
                          <Tooltip title={author.name} placement="top">
                            <Avatar
                              title={author.name}
                              src={author.avatar ? author.avatar : null}
                              style={{ backgroundColor: "#ccc" }}
                              border="2px solid #ccc"
                            >
                              {!author.avatar && getInitial(author.name)}
                            </Avatar>
                          </Tooltip>
                        )}
                      </React.Fragment>
                    ))}
                  </Avatar.Group>
                </div>
                <div className="w-full flex justify-start1 gap-1">
                  <span className="flex-shrink-0 font-bold">Tags:</span>
                  <Space>
                    <Flex gap="4px 0" wrap>
                      {record.tags.map((tag) => (
                        <Tag
                          key={tag.id}
                          color={getRandomColor()}
                          className="text-wrap"
                        >
                          {tag.name}
                        </Tag>
                      ))}
                    </Flex>
                  </Space>
                </div>
              </div>
            ),
            width: "40%",
            className: "text-wrap",
          },
          {
            title: "TYPE",
            dataIndex: "type",
            key: "type",
            render: (_, record) => (
              <div
                className="flex flex-row justify-start items-center"
                key={record.id}
              >
                <Flex gap="4px 0" wrap>
                  {record.postType && (
                    <Tag className="bg-slate-400 rounded-2xl text-white text-wrap text-center">
                      {record.postType.name}
                    </Tag>
                  )}
                </Flex>
              </div>
            ),
            width: "10%",
            className: "text-wrap",
          },
          {
            title: "SECTORS",
            dataIndex: "sectors",
            key: "sectors",
            render: (_, record) => (
              <div
                className="flex flex-row justify-start items-center"
                key={record.id}
              >
                <Flex gap="4px 0" wrap>
                  {record.sectors.map((sector) => (
                    <Tag
                      key={sector.id}
                      className="bg-slate-400 rounded-2xl text-white text-wrap text-center"
                    >
                      {sector.name}
                    </Tag>
                  ))}
                </Flex>
              </div>
            ),
            width: "20%",
            className: "text-wrap",
          },
          {
            title: "ASSETS",
            dataIndex: "assets",
            key: "assets",
            render: (_, record) => (
              <div
                className="flex flex-row justify-start items-center"
                key={record.id}
              >
                <Avatar.Group
                  max={{
                    count: 3,
                    style: {
                      color: "#f56a00",
                      backgroundColor: "#fde3cf",
                      padding: "0xp 4px",
                    },
                  }}
                  className="pl-2"
                >
                  {record.assets.map((asset, index) => (
                    <React.Fragment key={asset.id}>
                      {index <= 2 && (
                        <Avatar
                          title={asset.name}
                          src={asset.iconUrl ? asset.iconUrl : null}
                          style={{ backgroundColor: "#ccc" }}
                          border="2px solid #ccc"
                          key={asset.id}
                        >
                          {!asset.iconUrl && getInitial(asset.name)}{" "}
                        </Avatar>
                      )}
                      {index >= 3 && (
                        <Tooltip title={asset.name} placement="top">
                          <Avatar
                            title={asset.name}
                            src={asset.iconUrl ? asset.iconUrl : null}
                            style={{ backgroundColor: "#ccc" }}
                            border="2px solid #ccc"
                            key={asset.id}
                          >
                            {!asset.iconUrl && getInitial(asset.name)}{" "}
                          </Avatar>
                        </Tooltip>
                      )}
                    </React.Fragment>
                  ))}
                </Avatar.Group>
              </div>
            ),
            width: "20%",
            className: "text-wrap",
          },
          {
            title: "ACTIONS",
            dataIndex: "actions",
            key: "actions",
            render: (_, record) => (
              <div
                className="flex flex-row justify-start items-center pl-3"
                key={record.id}
              >
                <EditOutlined />
              </div>
            ),
            width: "10%",
            className: "text-wrap",
          },
        ];
      case "tags":
        return [
          {
            title: "NAME",
            dataIndex: "name",
            key: "name",
            render: (text: string, record) => (
              <div style={{ display: "flex", alignItems: "center" }}>
                <Avatar
                  title={record.name}
                  src={record.featureImage ? record.featureImage : null}
                  style={{
                    width: "50px",
                    height: "50px",
                    backgroundColor: "#ccc",
                    marginRight: "8px",
                    border: "2px solid #ccc",
                  }}
                >
                  {!record?.featureImage && getInitial(record.name)}
                </Avatar>
                <span
                  className="truncate max-w-96 block text-ellipsis overflow-hidden whitespace-nowrap"
                  title={record.name}
                >
                  {text}
                </span>
              </div>
            ),
            width: "35%",
            className: "text-wrap",
          },
          {
            title: "SLUG",
            dataIndex: "slug",
            key: "slug",
            width: "35%",
            className: "text-wrap",
          },
          {
            title: "TOTAL POST",
            dataIndex: "totalPost",
            key: "totalPost",
            width: "20%",
            className: "text-wrap",
          },
          {
            title: "ACTIONS",
            dataIndex: "actions",
            key: "actions",
            render: (_, record) => (
              <div className="flex justify-start gap-3">
                <EditOutlined onClick={() => handleEdit(record)} />
                <DeleteOutlined onClick={() => handleDelete(record)} />
              </div>
            ),
            width: "10%",
            className: "text-wrap",
          },
        ];
      default:
        break;
    }
  };

  return (
    <Space>
      
      <Table
        columns={generateColumns(tableKey)}
        dataSource={dataSource}
        loading={loading}
        scroll={{
          y: 550,
        }}
        {...props}
      />
    </Space>
  );
}
