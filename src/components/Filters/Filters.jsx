import { useSelector } from 'react-redux';
import {
  selectCategories,
  selectIngredients,
} from '../../redux/filters/selectors.js';
import { useEffect, useState } from 'react';
import s from './Filters.module.css';
import sprite from '../../assets/icon/sprite.svg';
import Select, { components } from 'react-select';

export default function Filters({
  onApplyFilters,
  currentFilters,
  onResetAndCloseFilters,
  openFiltersModal,
  isMobileModal = false,
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

  const categories = useSelector(selectCategories);
  const ingredients = useSelector(selectIngredients);

  // кастомний дропдаун з бібліотеки react-select

  const DropdownIndicator = props => (
    <components.DropdownIndicator {...props}>
      <svg width={16} height={16}>
        <use
          href={`${sprite}#${
            props.selectProps.menuIsOpen ? 'icon-icon-up' : 'icon-Icon-down'
          }`}
        />
      </svg>
    </components.DropdownIndicator>
  );

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

  const selectedCategoryOption = categoryOptions.find(
    opt => opt.value === selectedCategory
  );
  const selectedIngredientOption = ingredientOptions.find(
    opt => opt.value === selectedIngredient
  );

  const hasActiveFilters = selectedCategory !== '' || selectedIngredient !== '';

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
      {isMobileOrTablet && !isMobileModal ? (
        <button
          type="button"
          className={s.filtersLinkBtn}
          onClick={openFiltersModal}
        >
          <span className={s.filterText}>Filters</span>
          <svg className={s.filterIcon}>
            <use href={`${sprite}#icon-filters`} />
          </svg>
        </button>
      ) : (
        <>
          <button
            type="button"
            className={`${s.resetLinkBtn} ${
              hasActiveFilters ? s.resetLinkBtnUnderlined : ''
            }`}
            onClick={handleReset}
            disabled={!hasActiveFilters}
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
                container: base => ({
                  ...base,
                  width: isMobileOrTablet ? '296px' : '179px',
                }),
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
                }),
                singleValue: base => ({
                  ...base,
                  color: '#595d62',
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
                container: base => ({
                  ...base,
                  width: isMobileOrTablet ? '296px' : '179px',
                }),
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
                }),
                singleValue: base => ({
                  ...base,
                  color: '#595d62',
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
