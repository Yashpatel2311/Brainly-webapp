export function Input({
  reference,
  placeholder,
}: {
  placeholder: string;
  reference?: any;
}) {
  return (
    <div>
      <input
        placeholder={placeholder}
        type="text"
        className="px-4 py-2 border rounded m-2 text-black"
        ref={reference}
      />
    </div>
  );
}
