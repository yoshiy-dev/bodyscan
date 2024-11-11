/* eslint-disable tailwindcss/classnames-order */
/* eslint-disable tailwindcss/no-custom-classname */

type ButtonStyleProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant: keyof typeof ButtonStyleVariant;
};

const ButtonStyleVariant = {
  save: [
    'bg-white px-20 text-xl font-medium text-secondary py-4 ring ring-secondary rounded-lg hover:scale-105 duration-300',
    '変更したポイントを保存',
  ],
} as const;

export const Button: React.FC<ButtonStyleProps> = ({
  children,
  variant,
  ...buttonHTMLAttributes
}) => {
  return (
    <button role="button" className={`${ButtonStyleVariant[variant][0]}`} {...buttonHTMLAttributes}>
      {ButtonStyleVariant[variant][1]}
      {children}
    </button>
  );
};
