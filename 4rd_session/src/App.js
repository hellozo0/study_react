import React, { useRef, useReducer, useMemo, useCallback } from 'react';
import './App.css';
import CreateUser from './CreateUser';
import UserList from './UserList';
import useInputs from './hooks/useInputs';
import produce from 'immer';


function countActiveUsers(users){
  console.log('활성 사용자 수를 세는 중 ...');
  return users.filter(user => user.active).length;
}

const initialState = {
  inputs: {
    username : '',
    email: ''
  },

  users : [
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
  ]
};


function reducer(state, action){
  switch (action.type) {
    case 'CHANGE_INPUT':
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.name] : action.value
        }
        
      };
    case 'CREATE_USER':
      return produce(state, draft => {
        // inputs : initialState.inputs,
        // users: state.users.concat(action.user)
        draft.users.push(action.user);
      });
    case 'TOGGLE_USER' :
      return produce(state, draft =>  {
        // ...state,
        // users: state.users.map(user => 
          // user.id === action.id ? { ...user, active: !user.active} : user)
        const user = draft.users.find(user => user.id === action.id);
        user.active = !user.active;
      });
    case 'REMOVE_USER' :
      return produce(state, draft => {
        // ...state,
        // users: state.users.filter(user => user.id !== action.id)
        const index = draft.users.findIndex(user => user.id === action.id);
        draft.usrs.splice(index,1);
      });
    default:
      return state;
  }
}

//UserDispatch라는 이름으로 내보내줍니다.
export const UserDispatch = React.createContext(null);


function App() {
  // const [users, setUsers] = useState([
  //   {
  //     id:1,
  //     username:'likelion1',
  //     email:'likelion1@gmail.com',
  //     active: true
  //   },
  //   {
  //     id:2,
  //     username:'likelion2',
  //     email:'likelion2@gmail.com',
  //     active: true
  //   },
  //   {
  //     id:3,
  //     username:'likelion3',
  //     email:'likelion3@gmail.com',
  //     active: true
  //   }
  // ]);

  // const [inputs, setInputs] = useState({
  //   username : '',
  //   email:''
  // });

  // const { username, email } = inputs;

  // const onChange = useCallback(e => {
  //   const { name, value } = e.target;
  //   setInputs(inputs => ({
  //     ...inputs,
  //     [name]: value
  //   }));
  // }, []);




  // const onCreate = useCallback(() => {
  //   const user = {
  //     id: nextId.current,
  //     username,
  //     email
  //   };
  //   // setUsers([...users, user]);
  //   setUsers( users => users.concat(user));

  //   setInputs({
  //     username:'',
  //     email:''
  //   });
  //   nextId.current +=1;
  // }, [username, email]);


  




  // const onRemove = useCallback( id  => {
  //   setUsers(users => users.filter(user => user.id !== id));
  // },
  // [users]
  // );



  // const onToggle = useCallback( 
  //   id => {
  //   setUsers( users =>
  //       users.map(user =>
  //       user.id === id? {...user, active: !user.active} : user
  //       )
  //     );
  // },[]);





  
  // const count = useMemo(() => countActiveUsers(users), [users]);

  const [{username, email}, onChange, onReset] = useInputs({
    username: '',
    email: ''
  });

  const [state, dispatch] = useReducer(reducer, initialState);
  // const {users} = state;
  // const {username, email} = state.inputs;

  const {users} = state;

  const count = useMemo(() => countActiveUsers(users),  [users] );
  const nextId = useRef(4);

  

  // const onChange = useCallback(e => {
  //   const { name, value } = e.target;
  //   dispatch({
  //     type : 'CHANGE_INPUT',
  //     name, 
  //     value
  //   });
  // }, []);


  const onCreate = useCallback(() => {
    dispatch({
      type: 'CREATE_USER',
      user: {
        id: nextId.current,
        username,
        email
      }
    });
    onReset();
    nextId.current  += 1;
  }, [username, email, onReset]);
  
  // const onRemove = useCallback(id => {
  //   dispatch({
  //     type: 'REMOVE_USER',
  //     id
  //   });
  // }, []);


  // const onToggle = useCallback(id => {
  //   dispatch({
  //     type: 'TOGGLE_USER',
  //     id
  //   });
  // }, []);
  

  return (
    <UserDispatch.Provider value={dispatch}>
      <CreateUser
        // username={username}
        // email={email}
        // onChange={onChange}
        // onCreate={onCreate}
      />
      {/* <UserList users={users} onRemove={onRemove} onToggle={onToggle}/> */}
      <UserList users={users}/>
      <div>활성 사용자 수 : {count}</div>
    </UserDispatch.Provider>
  );

}

export default App;
