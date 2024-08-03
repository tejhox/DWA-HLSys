const Wrapper = (props: any) => {
  return (
    <div
      className={`container w-full relative mt-1.5 p-2 rounded-lg bg-gray-50/90 shadow-lg shadow-gray-600/60 ${props.class}`}
      style={props.style}>
      {props.content}
    </div>
  );
};
export default Wrapper;
