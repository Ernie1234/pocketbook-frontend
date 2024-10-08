interface Props {
  children: React.ReactNode;
  className: string;
}

function Wrapper({ children, className }: Props) {
  return (
    <div
      className={`${className} w-full md:max-w-3xl lg:max-w-5xl xl:max-w-6xl px-3 lg:px-0 mx-auto`}
    >
      {children}
    </div>
  );
}

export default Wrapper;
