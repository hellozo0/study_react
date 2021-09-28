import React, { useRef, useState, useMemo, useCallback } from 'react';
import './App.css';
import CreateUser from './CreateUser';
import UserList from './UserList';

function countActiveUsers(users){
  console.log('활성 사용자 수를 세는 중 ...');
  return users.filter(user => user.active).length;
}


function App() {
  const [users, setUsers] = useState([
    {
      id:1,
      username:'likelion1',
      email:'likelion1@gmail.com',
      active: true
    },
    {
      id:2,
      username:'likelion2',
      email:'likelion2@gmail.com',
      active: true
    },
    {
      id:3,
      username:'likelion3',
      email:'likelion3@gmail.com',
      active: true
    }
  ]);

  const [inputs, setInputs] = useState({
    username : '',
    email:''
  });

  const { username, email } = inputs;

  const onChange = e => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  };




  const nextId = useRef(4);
  const onCreate = useCallback(() => {
    const user = {
      id: nextId.current,
      username,
      email
    };
    // setUsers([...users, user]);
    setUsers(users.concat(user));

    setInputs({
      username:'',
      email:''
    });
    nextId.current +=1;
  }, [users, username, email]);


  const onRemove = useCallback( id  => {
    setUsers(users.filter(user => user.id !== id));
  },
  [users]
  );

  const onToggle = useCallback( 
    id => {
    setUsers(
      users.map(user =>
        user.id === id? {...user, active: !user.active} : user
        )
      );
  },
  [users]
  );

  const count = useMemo(() => countActiveUsers(users), [users]);

  return (
    <>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList users={users} onRemove={onRemove} onToggle={onToggle}/>
      <div>활성 사용자 수 : {count}</div>
    </>
  );

}

export default App;
