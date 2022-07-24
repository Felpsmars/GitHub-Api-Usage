import React from 'react';
import axios from 'axios';
import { Search } from '../../molecules';
import { useState } from 'react';

const SearchPage = (): JSX.Element => {
  const [userName, setUserName] = useState<string>('');
  const [statusResponse, setStatusResponse] = useState<number>();

  const handleSubmit = () => {
    axios.get(`https://api.github.com/users/${userName}/repos`, {
      headers: {
        Authorization: `token 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`,
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
