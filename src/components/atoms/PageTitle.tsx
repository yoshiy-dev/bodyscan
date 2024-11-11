interface PageTitleProps {
  children: React.ReactNode;
}

const PageTitle: React.FC<PageTitleProps> = ({ children }) => {
  return (
    <div>
      <h1 className="text-3xl font-semibold">{children}</h1>
    </div>
  );
};

export default PageTitle;
