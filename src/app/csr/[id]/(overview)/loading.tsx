export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-3">
        <article className="bg-white border border-gray-300 p-6 rounded-lg">
          <div className="flex items-center mb-4">
            <div
              className="w-8 h-8 rounded-full cursor-pointer"
              style={{ height: '32px', background: '#eee' }}
            />
            <span className="font-bold ml-1" style={{ width: '50px', background: '#eee' }}>
              <span
                className="font-normal text-gray-400 ml-2"
                style={{ width: '50px', background: '#eee' }}
              ></span>
            </span>
            <span className="font-bold ml-1" style={{ width: '80px', background: '#eee' }}>
              <span
                className="font-normal text-gray-400 ml-2"
                style={{ width: '80px', background: '#eee' }}
              ></span>
            </span>
          </div>
          <div className="bg-gray mb-4" style={{ height: '100px', background: '#eee' }} />
        </article>
      </div>
    </div>
  );
}
