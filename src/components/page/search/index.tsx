import React from 'react';
import axios from 'axios';
import { Search } from '../../molecules';
import { useState } from 'react';

const SearchPage = (): JSX.Element => {
  const [userName, setUserName] = useState<string>('');
  const [statusResponse, setStatusResponse] = useState<number>(0);

  const handleSubmit = () => {
    console.log(userName);
    axios.get(`https://api.github.com/users/${userName}/repos`, {
      headers: {
        Authorization: `token ${process.env.Github_Token}`,
      },
      validateStatus: function (status) {
        setStatusResponse(status);
        return status < 400;
      },
    });
  };

  return (
    <div>
      <Search
        statusResponse={statusResponse}
        userName={userName}
        setUserName={setUserName}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export { SearchPage };
