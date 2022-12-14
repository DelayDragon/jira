import React from "react";
import { User } from "../../types/User";
import { Dropdown, Menu, Modal, Table, TableProps } from "antd";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { Pin } from "component/pin";
import { useDeleteProject, useEditProject } from "utils/project";
import { ButtonNoPadding } from "component/lib";
import { useProjectModal, useProjectQueryKey } from "./util";
import { Content } from "antd/lib/layout/layout";
import { useDeleteConfig } from "utils/use-optimistic-options";
import { Project } from "../../types/Project";

interface ListProps extends TableProps<Project> {
  users: User[];
  refresh?: () => void;
  // projectButton: JSX.Element
}

export const List = ({ users, ...props }: ListProps) => {
  // const { open } = useProjectModal()
  const { mutate } = useEditProject(useProjectQueryKey());
  // const pinProject = (id: number, pin: boolean)=>mutate({id, pin})
  // const pinProject = (id: number) => (pin: boolean) => mutate({id, pin}).then(props.refresh)
  const pinProject = (id: number) => (pin: boolean) => mutate({ id, pin });

  return (
    <Table
      rowKey={"id"}
      pagination={false}
      columns={[
        {
          title: <Pin checked={true} disabled={true}></Pin>,
          render(value, project) {
            // return <Pin checked={project.pin} onCheckedChange={pin => pinProject(project.id, pin)}></Pin>
            return (
              <Pin
                checked={project.pin}
                onCheckedChange={pinProject(project.id)}
              ></Pin>
            );
          },
        },
        {
          title: "名称",
          // dataIndex: 'name',
          sorter: (a, b) => a.name.localeCompare(b.name),
          render(value, project) {
            return <Link to={String(project.id)}>{project.name}</Link>;
          },
        },
        {
          title: "部门",
          dataIndex: "organization",
          // sorter:(a, b) =>a.organization.localeCompare(b.organization)
        },
        {
          title: "负责人",
          render(value, project) {
            return (
              <span key={project.personId}>
                {users.find((user) => user.id === project.personId)?.name ||
                  "未知"}
              </span>
            );
          },
        },
        {
          title: "创建时间",
          dataIndex: "",
          render(value, project) {
            return (
              <span>
                {project.created
                  ? dayjs(project.created).format("YYYY-MM-DD")
                  : "无"}
              </span>
            );
          },
        },
        {
          render(value, project) {
            return <More project={project} />;
          },
        },
      ]}
      {...props}
    ></Table>
  );
};

const More = ({ project }: { project: Project }) => {
  const { startEdit } = useProjectModal();
  const editProject = (id: number) => () => startEdit(id);
  const { mutate: deleteProject } = useDeleteProject(useProjectQueryKey());
  const confirmDeleteProject = (id: number) => {
    Modal.confirm({
      title: "确定删除这个项目吗？",
      content: "点击确定删除！",
      okText: "确定",
      onOk() {
        deleteProject({ id });
      },
    });
  };

  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key={"edit"} onClick={editProject(project.id)}>
            {/* <ButtonNoPadding type={'link'} onClick={open}>编辑</ButtonNoPadding> */}
            {/* {props.projectButton} */}
            编辑
          </Menu.Item>
          <Menu.Item
            key={"delete"}
            onClick={() => confirmDeleteProject(project.id)}
          >
            删除
          </Menu.Item>
        </Menu>
      }
    >
      <ButtonNoPadding type={"link"}>...</ButtonNoPadding>
    </Dropdown>
  );
};
