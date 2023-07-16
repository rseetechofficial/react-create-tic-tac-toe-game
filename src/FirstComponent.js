import "./FirstComponent.scss";

const FirstComponent = ({ ind, updateCircle, clsName }) => {
  const handleClick = () => {
    updateCircle(ind);
  };
  return (
    <div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="circle"
      onClick={handleClick}
    >
      {clsName && (
        <span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className={clsName}
        ></span>
      )}
    </div>
  );
};

export default FirstComponent;
