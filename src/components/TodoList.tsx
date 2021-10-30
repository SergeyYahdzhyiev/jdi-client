import React from 'react';
import styled from 'styled-components';
import { Todo } from './Todo';

const ListContainer = styled.div`
  width: 100%;
  max-width: 300px;
  max-height: 70vh;
  overflow-y: scroll;
  margin: 0 auto;

  @media screen and (min-width: 700px) {
    margin: unset;
  }
`;
const List = styled.div`
  width: 100%;
`;

export const TodoList: React.FC = () => {
  return (
    <ListContainer>
      <List>
        <Todo
          title="Todo"
          body="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis eaque, tenetur doloremque sequi consectetur voluptates corrupti eveniet accusantium odit recusandae tempora rerum consequatur inventore, commodi explicabo unde illum quia. In aut eaque sequi mollitia cum eius soluta tempora corporis labore odio. Libero reprehenderit deserunt deleniti iure iste facilis, similique ut!"
        />
        <Todo title="Todo" body="Todo Body" />
        <Todo title="Todo" body="Todo Body" />
        <Todo title="Todo" body="Todo Body" />
        <Todo title="Todo" body="Todo Body" />
        <Todo title="Todo" body="Todo Body" />
        <Todo title="Todo" body="Todo Body" />
        <Todo title="Todo" body="Todo Body" />
        <Todo title="Todo" body="Todo Body" />
      </List>
    </ListContainer>
  );
};
