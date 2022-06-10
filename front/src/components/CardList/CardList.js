const CardList = ({ products }) => (
  <div className='card-list'>
    {products.map((product) => {
      <>
        {JSON.stringify(products)}
        <img src={product.brandImg} alt='Logo' />
        <p>{product.restoName}</p>
      </>;
    })}
  </div>
);

export default CardList;
