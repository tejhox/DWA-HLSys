const GeneralLayout = (props: any) => {
  return (
    <div className="flex flex-col justify-center px-1.5 h-full w-full lg:w-1/3">
      {props.content}
    </div>
  );
};
export default GeneralLayout;
