import { useFilter } from '../hooks/useFilter';
import { filterService } from '../services/filter.service';
import useQueryParams from '../customHooks/useQueryParams';

const categories = filterService.getCategories();

export function CategoryFilterBar() {
  // const updateFilter = useFilter(filterService.getDefaultFilter());
  const [currcategory, updateCurrCategory] = useQueryParams('category')


  function onSelectCategory(newCategory) {
    // updateFilter(newCategory);
    updateCurrCategory(newCategory);

  }

  return (
    <div className='carousel' role='radiogroup'>
      {categories.map((category) => {
        return (
          <div
            className = {(category.name === currcategory) ? `${category.name} active`: category.name}
            key={category.url}
            // role='radio'
            onClick={() => {
              onSelectCategory(category.name);
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
