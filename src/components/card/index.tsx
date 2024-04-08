const Card = (props: any) => {
  return (
    <div className="card w-full bg-base-300 shadow-xl mt-1">
      <div className="card-body">
        <div>{props.cardBody}</div>
      </div>
    </div>
  );
};

export default Card;
