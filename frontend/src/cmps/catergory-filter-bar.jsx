import { useFilter } from '../customHooks/useFilter';
import { filterService } from '../services/filter.service';
import { BiChevronLeftCircle } from 'react-icons/bi';

const categories = filterService.getCategories();

export function CategoryFilterBar() {
  const updateFilter = useFilter(filterService.getDefaultFilter());

  function onSelectCategory(currentCategory) {
    updateFilter({ category: currentCategory });
  }

  return (
    <div className='main-layout carousel'>
      <div className='shevron-left'>
        <div className='chevron'>
          <BiChevronLeftCircle />
        </div>
      </div>

      {categories.map((category) => {
        return (
          <div
            className='category'
            key={category.url}
            onClick={() => {
              onSelectCategory(category.url);
            }}>
            <img
              style={{}}
              className='icon24 clr-secondary'
              src={require(`../assets/img/categories/${category.url}.png`)}
              alt={category.name}
            />
            <p>{category.name}</p>
          </div>
        );
      })}
      {/* <button onClick={prevCategories}>Prev</button>
      <button onClick={displayCategories}>Next</button> */}
    </div>
  );
}
