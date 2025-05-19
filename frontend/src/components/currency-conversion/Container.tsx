interface Props {
  children: React.ReactNode;
}

export const Container = ({ children }: Props) => (
  <main className={"w-screen h-screen grid place-items-center"}>
    <div>
      <h1 className={"text-2xl font-bold my-5"}>Currency converter</h1>
      <div>{children}</div>
    </div>
  </main>
);
