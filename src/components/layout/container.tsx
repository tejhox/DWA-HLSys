const Container = (props: any) => {
  return (
    <div className="flex flex-col px-1.5 mb-2 w-full lg:w-1/3">
      {props.content}
    </div>
  );
};
export default Container;
