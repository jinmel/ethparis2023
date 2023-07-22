export const Button = ({
  text,
  ...props
}: { text: string } & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>) => (
  <button
    {...props}
    className="relative h-12 w-45 overflow-hidden border border-pink-500 text-pink-600 
  shadow-2xl transition-all duration-200 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:mx-auto
  before:h-0 before:w-0 before:rounded-sm before:bg-pink-600 before:duration-300 before:ease-out
hover:text-white hover:shadow-pink-600 hover:before:h-40 hover:before:w-full hover:before:opacity-80"
  >
    <span className="relative z-10 p-4">{text}</span>
  </button>
);
