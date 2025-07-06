import { useDispatch, useSelector } from 'react-redux';
import {
  selectCategories,
  selectIngredients,
} from '../../redux/filters/selectors.js';
import {
  fetchCategories,
  fetchIngredients,
} from '../../redux/filters/operations.js';
import { useEffect, useState } from 'react';
import s from './Filters.module.css';
import sprite from '../../assets/icon/sprite.svg';
import Select, { components } from 'react-select';

export default function Filters({
  onApplyFilters,
  currentFilters,
  onResetAndCloseFilters,
  openFiltersModal,
}) {
  const [selectedCategory, setSelectedCategory] = useState(
    currentFilters.category || ''
  );
  const [selectedIngredient, setSelectedIngredient] = useState(
    currentFilters.ingredient || ''
  );

  const [isMobileOrTablet, setIsMobileOrTablet] = useState(
    window.innerWidth < 1440
  );

  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const ingredients = useSelector(selectIngredients);

  // Кастомний DropdownIndicator з вашою іконкою
  const DropdownIndicator = props => (
    <components.DropdownIndicator {...props}>
      <svg width={16} height={16}>
        <use
          href={`${sprite}#${
            // Перевірте, чи icon-icon-up відповідає ID у вашому sprite.svg
            // Якщо у вашому SVG є icon-Icon-up (з великою I), то тут теж має бути 'icon-Icon-up'
            props.selectProps.menuIsOpen ? 'icon-icon-up' : 'icon-Icon-down'
          }`}
        />
      </svg>
    </components.DropdownIndicator>
  );

  // Формування опцій для react-select (мають бути { value, label })
  const categoryOptions = [
    { value: '', label: 'Category' },
    ...categories.map(category => ({
      value: category.name,
      label: category.name,
    })),
  ];

  const ingredientOptions = [
    { value: '', label: 'Ingredient' },
    ...ingredients.map(ingredient => ({
      value: ingredient.name,
      label: ingredient.name,
    })),
  ];

  // Знайти обраний об'єкт для react-select за value
  const selectedCategoryOption = categoryOptions.find(
    opt => opt.value === selectedCategory
  );
  const selectedIngredientOption = ingredientOptions.find(
    opt => opt.value === selectedIngredient
  );

  // *** ЦЕЙ РЯДОК БУВ ПЕРЕМІЩЕНИЙ ВИЩЕ ***
  // Визначаємо, чи є активні фільтри для активації кнопки Reset
  const hasActiveFilters = selectedCategory !== '' || selectedIngredient !== '';

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchIngredients());
  }, [dispatch]);

  useEffect(() => {
    setSelectedCategory(currentFilters.category || '');
    setSelectedIngredient(currentFilters.ingredient || '');
  }, [currentFilters]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileOrTablet(window.innerWidth < 1440);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleCategoryChange = selectedOption => {
    const categoryValue = selectedOption ? selectedOption.value : '';
    setSelectedCategory(categoryValue);
    onApplyFilters({ category: categoryValue, ingredient: selectedIngredient });
  };

  const handleIngredientChange = selectedOption => {
    const ingredientValue = selectedOption ? selectedOption.value : '';
    setSelectedIngredient(ingredientValue);
    onApplyFilters({ category: selectedCategory, ingredient: ingredientValue });
  };

  const handleReset = () => {
    onResetAndCloseFilters();
  };

  return (
    <div className={s.filtersContainer}>
      {isMobileOrTablet ? (
        <button
          type="button"
          className={s.filtersLinkBtn}
          onClick={openFiltersModal}
        >
          <span className={s.filterText}>Filters</span>
          <svg className={s.filterIcon}>
            <use href={`${sprite}#icon-Icon-filters-new`} />{' '}
          </svg>
        </button>
      ) : (
        <>
          <button
            type="button"
            // Класи для кнопки Reset filters
            className={`${s.resetLinkBtn} ${
              hasActiveFilters ? s.resetLinkBtnUnderlined : ''
            }`}
            onClick={handleReset}
            disabled={!hasActiveFilters} // Вимкнути кнопку, якщо фільтрів немає
          >
            Reset filters
          </button>
          <div className={s.selectsWrapper}>
            <Select
              classNamePrefix="custom-select"
              options={categoryOptions}
              value={selectedCategoryOption}
              onChange={handleCategoryChange}
              components={{ DropdownIndicator }}
              isSearchable={false}
              styles={{
                container: base => ({ ...base, width: '179px' }),
                control: (base, state) => ({
                  ...base,
                  minHeight: '33px',
                  cursor: 'pointer',
                  outline: 'none',
                  borderColor: state.isFocused ? '#000' : '#d9d9d9',
                  boxShadow: 'none',
                  transition: 'border-color 0.3s ease-in-out',
                  '&:hover': {
                    borderColor: '#3d2218',
                  },
                }),
                placeholder: base => ({
                  ...base,
                  color: '#595d62',
                  paddingLeft: '8px',
                }),
                singleValue: base => ({
                  ...base,
                  color: '#595d62',
                  paddingLeft: '8px',
                }),

                indicatorContainer: (base, state) => ({
                  ...base,
                  color: '#000000',
                  opacity: 1,
                  ':hover': {
                    color: '#000000',
                  },
                }),
                dropdownIndicator: (base, state) => ({
                  ...base,
                  color: '#000000',
                  opacity: 1,
                }),
                indicatorSeparator: base => ({
                  ...base,
                  display: 'none',
                }),
                option: (base, state) => ({
                  ...base,
                  backgroundColor:
                    state.isFocused || state.isSelected
                      ? '#d3d3d3'
                      : 'transparent',
                  color: '#000',
                  '&:active': {
                    backgroundColor: '#c0c0c0',
                  },
                }),
              }}
            />
            <Select
              classNamePrefix="custom-select"
              options={ingredientOptions}
              value={selectedIngredientOption}
              onChange={handleIngredientChange}
              components={{ DropdownIndicator }}
              isSearchable={false}
              styles={{
                container: base => ({ ...base, width: '179px' }),
                control: (base, state) => ({
                  ...base,
                  minHeight: '33px',
                  cursor: 'pointer',
                  outline: 'none',
                  borderColor: state.isFocused ? '#000' : '#d9d9d9',
                  boxShadow: 'none',
                  transition: 'border-color 0.3s ease-in-out',
                  '&:hover': {
                    borderColor: '#3d2218',
                  },
                }),
                placeholder: base => ({
                  ...base,
                  color: '#595d62',
                  paddingLeft: '8px',
                }),
                singleValue: base => ({
                  ...base,
                  color: '#595d62',
                  paddingLeft: '8px',
                }),

                indicatorContainer: (base, state) => ({
                  ...base,
                  color: '#000000',
                  opacity: 1,
                  ':hover': {
                    color: '#000000',
                  },
                }),
                dropdownIndicator: (base, state) => ({
                  ...base,
                  color: '#000000',
                  opacity: 1,
                }),
                indicatorSeparator: base => ({
                  ...base,
                  display: 'none',
                }),
                option: (base, state) => ({
                  ...base,
                  backgroundColor:
                    state.isFocused || state.isSelected
                      ? '#d3d3d3'
                      : 'transparent',
                  color: '#000',
                  '&:active': {
                    backgroundColor: '#c0c0c0',
                  },
                }),
              }}
            />
          </div>
        </>
      )}
    </div>
  );
}
