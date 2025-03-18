const DataTransferItemList = async (): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
};

export default async function Test2() {
  // Fetch data directly in the server component
  await DataTransferItemList();

  return <div className="space-y-6">로딩완료!!</div>;
}
