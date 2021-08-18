
const Search= ({search, setSearch}) => {

  
  const handleSubmit = event => {
    event.preventDefault()
    setSearch(event.target.elements.userInput.value)
    console.log(event.target.elements.userInput.value)
  }


  return (
    <div className='App'>
      <form className="SearchForm mb-5" onSubmit={handleSubmit}>
        <input 
          type="text"
          name='userInput'
          defaultValue={search}
          aria-label="search for type"
          placeholder="search for type"
      />
        <input type="submit" value="Search" />
      </form>


    </div>
  );
}

export default Search;