import React, { useContext, useEffect } from 'react';
import { UserDispatch } from './App';
// 재사용성을 높이기 위해 

const User = React.memo( function User({user, onRemove, onToggle}) {

    const dispatch = useContext(UserDispatch);

    // useEffect(() => {
    //     console.log(user);
    // })

    return (
        <div>
            <b style={{
                cursor:'pointer',
                color:user.active? 'green' : 'black'
            }}
            // onClick={() => onToggle(user.id)}
            onClick={() => {
                dispatch({ type: 'TOGGLE_USER', id:user.id});
            }}
            >
            
            {user.username}
            </b>
            &nbsp;
        
            <span>({user.email})</span>
            {/* <button onClick={() => onRemove(user.id)}>삭제</button> */}
            <button onClick={()=> {
                dispatch({ type: 'REMOVE_USER', id: user.id});
            }}>삭제</button>
        </div>
    );
});



// function UserList({ users,onRemove , onToggle}){
//     return(
//         <div>
//             {users.map(user => (
//                 <User 
//                 user={user} 
//                 key={user.id} 
//                 onRemove={onRemove}
//                 onToggle = {onToggle}
//                 />
//             ))}
//         </div>
//     );
// }

function UserList({ users}){
    return(
        <div>
            {users.map(user => (
                <User 
                user={user} 
                key={user.id} 
                // onRemove={onRemove}
                // onToggle = {onToggle}
                />
            ))}
        </div>
    );
}


export default React.memo(UserList);