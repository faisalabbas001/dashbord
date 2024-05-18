export default function Button({ text, onClick }) {
  return (
    <button
    onClick={onClick}
      type="button"
      className="inline-flex items-center justify-center bg-black px-6 py-2 text-lg text-white font-medium uppercase tracking-wide "
    >
      {text}
    </button>
  );
}
