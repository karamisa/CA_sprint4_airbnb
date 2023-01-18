export function PreviewInfo({ info }) {
  return (
    <>
      <p>
        {info.location} {info.rate}
      </p>
      <p>Distance</p>
      <p>Dates</p>
      <p>{info.price.toLocaleString()}</p>
    </>
  );
}
