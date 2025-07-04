import React from 'react';
import AddRecipeForm from '../../components/AddRecipeForm/AddRecipeForm';
import css from './AddRecipePage.module.css';

const AddRecipePage = () => {
  return (
    <div className={css.container}>
      <h1 className={css.pageTitle}>Add Recipe</h1>
      <AddRecipeForm />
    </div>
  );
};

export default AddRecipePage;
