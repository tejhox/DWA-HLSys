const Container = (props: any) => {
  return (
    <div className="container w-full relative mt-2 p-2 border-2 rounded-lg bg-gray-200 shadow-md shadow-gray-500/60">
      {props.content}
    </div>
  );
};
export default Container;
