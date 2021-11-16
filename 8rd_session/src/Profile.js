import React from 'react';
import { useParams } from  'react-router-dom';

// 프로필에서 사용 할 데이터
const profileData = {
  yungu: {
    name: '강윤서',
    description:
      '다음학기 휴학해야지'
  },
  likelion: {
    name: '멋쟁이사자처럼',
    description: '9기 짱'
  }
};

const Profile = () => {
  // 파라미터를 받아올 땐 useParams 사용, match.params 안됨
  const {username} = useParams();
  const profile = profileData[username];
  if (!profile) {
    return <div>존재하지 않는 유저입니다.</div>;
  }
  return (
    <div>
      <h3>
        {username}({profile.name})
      </h3>
      <p>{profile.description}</p>
    </div>
  );
};

export default Profile;