const Container = (props: any) => {
  return (
    <div className={` ${props.contentClass} flex flex-col px-1`}>
      {props.content}
    </div>
  );
};
export default Container;
