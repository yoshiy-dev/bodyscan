interface Props {
  children: React.ReactNode;
  score: string;
}

export const AngleCard: React.FC<Props> = ({ children, score }) => {
  return (
    <div className="glass-card h-28 w-40 rounded-xl p-5">
      <h1 className="mb-2 text-xl font-semibold">{children}</h1>
      <p className="text-center text-4xl">{score}</p>
    </div>
  );
};
