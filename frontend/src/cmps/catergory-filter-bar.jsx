// import { useFilter } from '../customHooks/useFilter'; 
import { filterService } from '../services/filter.service';
import { BiChevronLeftCircle } from 'react-icons/bi';



export function CategoryFilterBar({handleChange, currcategory='none'}) {
  // const updateFilter = useFilter(filterService.getDefaultFilter());
  const categories = filterService.getCategories();

  function onSelectCategory(newCategory) {
    // updateCurrCategory(newCategory)
    handleChange({field: 'category', value: newCategory})
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
            className={category.url === currcategory ? 'category active' : 'category'}
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
