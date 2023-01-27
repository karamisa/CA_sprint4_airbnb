export function ChartInfo({ info }) {
  const { amount, lastMonthAmount, title, icon } = info
  return (
    <article className='chart-info chart-column accent'>
      <div className='image-wrapper'>{icon}</div>
      <h4 className='chart-info-title'>{title}</h4>
      <span className='chart-info-amount'>{amount}</span>
      <p>
        <span className='chart-info-last-amount'>{lastMonthAmount}</span> %
        since last month
      </p>
    </article>
  )
}
