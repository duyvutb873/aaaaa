"use client";

import { ATable } from "@/components";
import useTags from "@/hooks/useTags";
import { Button, Result } from 'antd';

export default function Page() {
  const { tagData, isLoading, error, refetch } = useTags();

  if (error) {
    return (
      <Result
        status="error"
        title="Có lỗi xảy ra khi tải dữ liệu"
        extra={
          <Button type="primary" onClick={() => {refetch()}}>
            Thử lại
          </Button>
        }
      />
    );
  }

  return (
    <ATable
      tableKey="tags"
      dataSource={tagData?.datas}
      loading={isLoading}
      pagination={{
        current: tagData?.page, 
        pageSize: tagData?.pageSize, 
        showSizeChanger: true,
      }}
    />
  );
}
