"use client";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col mt-4">
      <div className=" flex w-full items-start justify-start">
        <h1 className=" text-custom-150 text-xl font-bold">Profile Form</h1>
      </div>
      <div className="w-[95%] bg-custom-50 my-4">{children}</div>
    </div>
  );
}
