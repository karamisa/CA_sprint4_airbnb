import { useFilter } from '../hooks/useFilter';
import { filterService } from '../services/filter.service';

const categories = filterService.getCategories();

export function CategoryFilterBar() {
  const updateFilter = useFilter(filterService.getDefaultFilter());

  function onSelectCategory(currentCategory) {
    updateFilter({ category: currentCategory });
  }

  return (
    <div className='carousel' role='radiogroup'>
      {categories.map((category) => {
        return (
          <div
            className='category'
            key={category.url}
            role='radio'
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
