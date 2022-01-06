import './ChartBar.css';

const ChartBar = (props) => {
  //
  let fillBarWidth = '0%';

  fillBarWidth = Math.round(props.value) + '%';

  return (
    <div className="chart-bar">
      <div className="chart-bar__inner">
        <div className="chart-bar__label">{fillBarWidth}</div>
        <div className="chart-bar__fill" style={{ width: fillBarWidth }}></div>
      </div>
    </div>
  );
};

export default ChartBar;
