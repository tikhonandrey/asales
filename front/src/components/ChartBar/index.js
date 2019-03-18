import React from 'react';
import PropTypes from 'prop-types';
import styles from './ChartBar.module.scss';
import tinycolor from 'tinycolor2';
const samplesColors = [
  '#ff761c',
  '#5856d5',
  '#ff9d1b',
  '#8bc34a',
  '#f5cc00',
  '#4d95f3',
  '#ef6a67',
];
//todo доделать генерацию цветов
const getColors = amount => {
  const start = tinycolor(samplesColors[Math.floor(Math.random() * 7)]);
  const arr = new Array(amount)
    .fill(0)
    .reduce((sum, item) => {
      const lastColor = sum[sum.length - 1] || start;
      return sum.concat(lastColor.tetrad());
    }, [])
    .map(item => {
      return item.toHexString();
    });
  console.log('arr', arr);

  return [...new Set(arr)];
};
const Bar = ({ loading, items, summ }) => {
  return (
    <div className={styles.bar}>
      {items.map(item => {
        const percent = Math.ceil((item.value * 100) / summ);
        return (
          <div
            key={item.color}
            style={{
              backgroundColor: item.color,
              width: `${percent}%`,
            }}
          />
        );
      })}
    </div>
  );
};
const Legenda = ({ color, name, value }) => {
  return (
    <div className={styles.legenda}>
      <span
        className={styles.color}
        style={{
          backgroundColor: color,
        }}
      />
      <span className={styles.value}>
        {name}: {value}
      </span>
    </div>
  );
};
const ChartBar = ({ loading, items }) => {
  const colorList = getColors(items.length);
  console.log('colorList', colorList);

  let errorsAmount = 0;
  const chartData = items.map((item, i) => {
    errorsAmount += item.count;
    return {
      color: colorList[i],
      name: item.code ? `Error ${item.code}` : 'Other',
      value: item.count,
    };
  });

  return (
    <div className={styles.chartBar}>
      <Bar loading={loading} items={chartData} summ={errorsAmount} />
      <div className={styles.legendaList}>
        {chartData.map(props => (
          <Legenda key={props.color} {...props} />
        ))}
      </div>
    </div>
  );
};
ChartBar.propTypes = {
  loading: PropTypes.bool,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
      count: PropTypes.number,
    })
  ),
};
export default ChartBar;
