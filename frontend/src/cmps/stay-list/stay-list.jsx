export function StayList() {
  const [stays, setStays] = useState([]);

  return (
    <section className='stay-list-container'>
      <ul className='stay-list'>
        {stays.map((stay) => (
          <li key={stay._id} className='stay-list-item'>
            <StayPreview stay={stay} />
          </li>
        ))}
      </ul>
    </section>
  );
}
