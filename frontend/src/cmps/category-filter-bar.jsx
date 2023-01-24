import { filterService } from '../services/filter.service';

import { Carousel } from './ui/carousel/carousel';

export function CategoryFilterBar({ handleChange, currCategory = 'none' }) {
  const categories = filterService.getCategories();

  function onSelectCategory(newCategory) {
    handleChange({ field: 'category', value: newCategory });
  }

  return (
    <>
      <section className='main-layout category-filter-bar'>
        <Carousel>
          {categories.map((category) => {
            return (
              <div
                className={
                  category.url === currCategory ? 'category active' : 'category'
                }
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
                <p className='category-name'>{category.name}</p>
              </div>
            );
          })}{' '}
        </Carousel>
        {/* </div> */}
      </section>
    </>
  );
}
