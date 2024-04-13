const Container = (props: any) => {
  return (
    <div
      className={` ${props.contentClass} flex flex-col px-1.5 w-full lg:w-1/3`}>
      {props.content}
    </div>
  );
};
export default Container;
