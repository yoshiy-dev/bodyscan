import { useState } from 'react';

const SearchBox: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // 検索の処理を追加する
    // console.log(`Search term: ${searchTerm}`);
    setSearchTerm('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="検索..."
        className=" glass-card w-2/3 rounded-full border px-8 py-4 text-xl focus:border-transparent focus:outline-none"
        value={searchTerm}
        onChange={handleChange}
      />
    </form>
  );
};

export default SearchBox;
