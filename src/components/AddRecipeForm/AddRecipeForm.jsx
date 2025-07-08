import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Select from 'react-select';
import css from './AddRecipeForm.module.css';
import { BsCamera } from 'react-icons/bs';
import { useCustomSelectStyles } from '../../styles/customSelectStyles';

const validationSchema = Yup.object({
  title: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
  time: Yup.number().required('Required').positive().integer(),
  calories: Yup.number().nullable().positive(),
  category: Yup.string().required('Required'),
  ingredient: Yup.string().required('Required'),
  ingredientAmount: Yup.string().required('Required'),
  instructions: Yup.string().required('Required'),
});

const initialValues = {
  title: '',
  description: '',
  time: '',
  calories: '',
  category: '',
  ingredient: '',
  ingredientAmount: '',
  instructions: '',
  photo: null,
};

const categoryOptions = [
  { value: 'soup', label: 'Soup' },
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

const ingredientOptions = [
  { value: 'egg', label: 'Egg' },
  { value: 'cheese', label: 'Cheese' },
  { value: 'broccoli', label: 'Broccoli' },
];

const AddRecipeForm = () => {
  const getSelectStylesDefault = useCustomSelectStyles('default');
  const getSelectStylesIngredients = useCustomSelectStyles('ingredients');

  const handleSubmit = (values, { setSubmitting }) => {
    console.log(values);
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue, isSubmitting, values, errors, touched }) => (
        <Form encType="multipart/form-data">
          <div className={css.wrapper}>
            <div className={css.photoColumn}>
              <p className={css.uploadTitle}>Upload Photo</p>
              <label htmlFor="photoInput" className={css.photoLabel}>
                <BsCamera className={css.cameraIcon} />
                <input
                  id="photoInput"
                  className={css.inputFile}
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={e =>
                    setFieldValue('photo', e.currentTarget.files[0])
                  }
                />
              </label>
            </div>

            <div className={css.formColumn}>
              <h2 className={css.sectionTitle}>General Information</h2>

              <label className={css.label}>
                <span className={css.labelTitle}>Recipe Title</span>
                <Field
                  className={`${css.input} ${
                    errors.title && touched.title ? css.inputError : ''
                  }`}
                  type="text"
                  name="title"
                  placeholder="Enter the name of your recipe"
                />
              </label>

              <label className={css.label}>
                <span className={css.labelTitle}>Recipe Description</span>
                <Field
                  as="textarea"
                  className={`${css.textarea} ${
                    errors.description && touched.description
                      ? css.textareaError
                      : ''
                  }`}
                  name="description"
                  placeholder="Enter a brief description of your recipe"
                />
              </label>

              <label className={css.label}>
                <span className={css.labelTitle}>Cooking time in minutes</span>
                <Field
                  className={`${css.input} ${
                    errors.time && touched.time ? css.inputError : ''
                  }`}
                  type="number"
                  name="time"
                  placeholder="10"
                />
              </label>

              <div className={css.rowGroup}>
                <label className={css.label}>
                  <span className={css.labelTitle}>Calories</span>
                  <Field
                    className={`${css.input} ${css.calories} ${
                      errors.calories && touched.calories ? css.inputError : ''
                    }`}
                    type="number"
                    name="calories"
                    placeholder="150"
                  />
                </label>

                <label className={`${css.label} ${css.category}`}>
                  <span className={css.labelTitle}>Category</span>
                  <Select
                    className={css.reactSelect}
                    name="category"
                    options={categoryOptions}
                    placeholder="Soup"
                    value={categoryOptions.find(
                      opt => opt.value === values.category
                    )}
                    onChange={option =>
                      setFieldValue('category', option?.value)
                    }
                    styles={getSelectStylesDefault(
                      errors.category && touched.category
                    )}
                  />
                </label>
              </div>

              <h2 className={css.sectionTitle}>Ingredients</h2>

              <div className={css.rowGroupIngredients}>
                <label className={css.label}>
                  <span className={css.labelTitle}>Name</span>
                  <Select
                    className={css.reactSelect}
                    name="ingredient"
                    options={ingredientOptions}
                    placeholder="Egg"
                    value={ingredientOptions.find(
                      opt => opt.value === values.ingredient
                    )}
                    onChange={option =>
                      setFieldValue('ingredient', option?.value)
                    }
                    styles={getSelectStylesIngredients(
                      errors.ingredient && touched.ingredient
                    )}
                  />
                </label>

                <label className={css.label}>
                  <span className={css.labelTitle}>Amount</span>
                  <Field
                    className={`${css.input} ${css.ingredientAmount} ${
                      errors.ingredientAmount && touched.ingredientAmount
                        ? css.inputError
                        : ''
                    }`}
                    type="text"
                    name="ingredientAmount"
                    placeholder="100g"
                  />
                </label>
              </div>

              <button className={`${css.removeBtn} ${css.btn}`} type="button">
                Remove last Ingredient
              </button>

              <button className={`${css.addBtn} ${css.btn}`} type="button">
                Add new ingredient
              </button>

              <div className={css.ingredientHeader}>
                <span className={css.ingredientSpan}>Name:</span>
                <span className={css.ingredientSpan}>Amount:</span>
              </div>

              <h2 className={css.sectionTitle}>Instructions</h2>
              <Field
                as="textarea"
                className={`${css.textarea} ${css.textareaInstructions} ${
                  errors.instructions && touched.instructions
                    ? css.textareaError
                    : ''
                }`}
                name="instructions"
                placeholder="Enter a text"
              />

              <button
                className={`${css.submitBtn} ${css.btn}`}
                type="submit"
                disabled={isSubmitting}
              >
                Publish Recipe
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AddRecipeForm;
