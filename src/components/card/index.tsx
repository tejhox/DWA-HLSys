const Card = (props: any) => {
  return (
    <div
      className={`card w-full shadow-md shadow-gray-800/50 ${props.cardClass}`}>
      <div className="card-body">
        <h2 className="card-title">{props.cardTitle}</h2>
        {props.cardBody}
      </div>
    </div>
  );
};

export default Card;
