"use client";

import { ATable, AFilter } from "@/components";
import usePosts from "@/hooks/usePosts";
import { Button, Result, Space } from "antd";
import { useMemo } from "react";

export default function Page() {
  const { postData, isLoading, error } = usePosts();

  const filterData = useMemo(
    () => [
      { type: "input", name: "s", label: "S", value: "" },
      { type: "select", name: "authors", label: "Authors", option: [] },
      { type: "select", name: "assets", label: "Assets", option: [] },
    ],
    []
  );

  if (error) {
    return (
      <Result
        status="error"
        title="Có lỗi xảy ra khi tải dữ liệu"
        extra={
          <Button type="primary" onClick={() => window.location.reload()}>
            Thử lại
          </Button>
        }
      />
    );
  }

  return (
    <Space className="flex flex-col">
      <div className='items-end'>
        <AFilter filterData={filterData} />
      </div>
      <ATable
        tableKey="posts"
        dataSource={postData?.datas}
        loading={isLoading}
        pagination={{
          current: postData?.page,
          pageSize: postData?.pageSize,
          showSizeChanger: true,
        }}
      />
    </Space>
  );
}
