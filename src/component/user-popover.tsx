import styled from "@emotion/styled";
import { Button, Divider, List, Popover, Typography } from "antd";
import { useUsers } from "utils/user";

// export const ProjectPopover = (props: {projectButton: JSX.Element }) => {
export const UserPopover = () => {
  const { data: users, isLoading, refetch } = useUsers();
  const content = (
    <ContentContainer>
      <Typography.Text type={"secondary"}>组员列表</Typography.Text>
      <List>
        {users?.map((user) => (
          <List.Item key={user.id}>
            <List.Item.Meta title={user.name}></List.Item.Meta>
          </List.Item>
        ))}
      </List>
      <Divider />
    </ContentContainer>
  );

  return (
    <Popover
      onVisibleChange={() => refetch()}
      placement={"bottom"}
      content={content}
    >
      组员
    </Popover>
  );
};

const ContentContainer = styled.div`
  min-width: 30rem;
`;
