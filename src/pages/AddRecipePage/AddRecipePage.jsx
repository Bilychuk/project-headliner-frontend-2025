import React from 'react';
import AddRecipeForm from '../../components/AddRecipeForm/AddRecipeForm';
import css from './AddRecipePage.module.css';

const AddRecipePage = () => {
  return (
    <div className={css.container}>
      <h2 className={css.pageTitle}>Add Recipe</h2>
      <AddRecipeForm />
    </div>
  );
};

export default AddRecipePage;
