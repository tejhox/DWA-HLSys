const Card = (props: any) => {
  return (
    <div className="card w-full bg-white shadow-xl mt-1 mb-2">
      <div className="card-body">
        <h2 className="card-title">{props.cardTitle}</h2>
        {props.cardBody}
      </div>
    </div>
  );
};

export default Card;
