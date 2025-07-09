import { useEffect, useState } from 'react';

export const useCustomSelectStyles =
  (type = 'default') =>
  (hasError = false) => {
    const [dimensions, setDimensions] = useState(getStyles(type));

    useEffect(() => {
      const handleResize = () => setDimensions(getStyles(type));
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, [type]);

    return {
      control: (base, state) => ({
        ...base,
        minHeight: dimensions.height,
        height: dimensions.height,
        width: dimensions.width,
        border: hasError ? '1px solid red' : '1px solid #d9d9d9',
        borderRadius: '8px',
        boxShadow: 'none',
        backgroundColor: '#fff',
        '&:hover': {
          borderColor: hasError ? 'red' : '#000',
        },
      }),
      menu: base => ({
        ...base,
        width: dimensions.width,
        borderRadius: '12px',
        backgroundColor: '#fff',
        zIndex: 100,
      }),
      menuList: base => ({
        ...base,
        paddingTop: '8px',
        paddingBottom: '8px',
        paddingLeft: '8px',
        paddingRight: '8px',
      }),
      option: (base, state) => ({
        ...base,
        paddingTop: '10px',
        paddingBottom: '10px',
        paddingLeft: '24px',
        paddingRight: '24px',
        fontSize: '16px',
        backgroundColor: state.isSelected
          ? '#e0e0e0'
          : state.isFocused
          ? '#d3d3d3'
          : '#fff',
        color: '#000',
        cursor: 'pointer',
        borderRadius: state.isFocused ? '4px' : '0px',
      }),
      singleValue: base => ({
        ...base,
        color: '#000',
        fontSize: '16px',
        fontWeight: 500,
      }),
      placeholder: base => ({
        ...base,
        color: '#000',
        fontSize: '16px',
        fontWeight: 400,
      }),
      indicatorSeparator: () => ({
        display: 'none',
      }),
      dropdownIndicator: (base, state) => ({
        ...base,
        color: '#000',
        transition: 'opacity 0.2s ease',
        opacity: state.selectProps.menuIsOpen ? 0 : 1,
        pointerEvents: state.selectProps.menuIsOpen ? 'none' : 'auto',
      }),
    };
  };

const getStyles = type => {
  const width = window.innerWidth;

  if (width >= 1158) {
    return type === 'ingredients'
      ? { width: '497px', height: '46px' }
      : { width: '392px', height: '46px' };
  } else if (width >= 768) {
    return type === 'ingredients'
      ? { width: '431px', height: '48px' }
      : { width: '340px', height: '48px' };
  } else {
    return type === 'ingredients'
      ? { width: '361px', height: '48px' }
      : { width: '171px', height: '48px' };
  }
};
