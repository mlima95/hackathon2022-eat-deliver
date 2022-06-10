import { useState, useEffect } from 'react';
import SearchBox from './components/SearchBox/SearchBox';
import CardList from './components/CardList/CardList';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchField, setSearchField] = useState('');
  const [filteredData, setFilterData] = useState(data);
  console.log({ filteredData });
  console.log({ searchField });
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await fetch('http://localhost:8000/EatDeliver');
      const json = await res.json();
      setData(json);

      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const newFilteredData = data.filter((d) => {
      return d.restoName.includes(searchField);
    });

    setFilterData(newFilteredData);
  }, [data, searchField]);

  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
  };

  return (
    <>
      <SearchBox
        className='monsters-search-box'
        onChangeHandler={onSearchChange}
        placeholder='Search food'
      />
      <CardList products={filteredData} />
      {/* {loading ? (
        <p>Loading ...</p>
      ) : (
        <div className='App'>
          {data.map((item) => (
            <>
              <img src={item.brandImg} alt='Logo' />
              <p>{item.restoName}</p>
            </>
          ))}
        </div>
      )} */}
    </>
  );
}

export default App;
