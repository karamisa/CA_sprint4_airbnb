import { CategoryFilterBar } from '../cmps/catergory-filter-bar';
import { StayList } from '../cmps/stay-list/stay-list';

export function StayIndex() {
  return (
    <section>
      <h1>Stay Index</h1>
      <CategoryFilterBar />
      <StayList />
    </section>
  );
}
