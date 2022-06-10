const Card = ({ product }) => {
  console.log(product);
  const { id, name, email } = product;

  return (
    <div className='card-container'>
      <img
        alt={`product ${name}`}
        src={`https://robohash.org/${id}?set=set2&size=180x180`}
      />
      <h2>{name}</h2>
      <p>{email}</p>
    </div>
  );
};

export default Card;
