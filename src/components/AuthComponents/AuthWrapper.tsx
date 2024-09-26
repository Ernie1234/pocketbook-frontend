interface Props {
  children: React.ReactNode;
}

export default function AuthWrapper({ children }: Props) {
  return (
    <div className="flex w-full max-h-dvh">
      <div className="flex flex-1 w-auto h-auto">{children}</div>
      <div className="md:flex flex-1 hidden bg-green">
        <img
          src="/assets/adele-payman-2oYMwuFgnTg-unsplash 1.svg"
          alt="bg-agric"
          className="object-bottom w-full object-cover"
        />
      </div>
    </div>
  );
}
