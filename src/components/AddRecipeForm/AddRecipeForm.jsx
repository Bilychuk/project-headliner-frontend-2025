import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import css from './AddRecipeForm.module.css';
import { BsCamera } from 'react-icons/bs';
import { IoIosArrowDown } from 'react-icons/io';

const validationSchema = Yup.object({
  title: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
  time: Yup.number().required('Required').positive().integer(),
  calories: Yup.number().nullable().positive(),
  category: Yup.string().required('Required'),
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

const AddRecipeForm = () => {
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
      {({ setFieldValue, isSubmitting }) => (
        <Form className={css.form} encType="multipart/form-data">
          <h2 className={css.pageTitle}>Add Recipe</h2>

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
                  className={css.input}
                  type="text"
                  name="title"
                  placeholder="Enter the name of your recipe"
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className={css.error}
                />
              </label>

              <label className={css.label}>
                <span className={css.labelTitle}>Recipe Description</span>
                <Field
                  as="textarea"
                  className={css.textarea}
                  name="description"
                  placeholder="Enter a brief description of your recipe"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className={css.error}
                />
              </label>

              <label className={css.label}>
                <span className={css.labelTitle}>Cooking time in minutes</span>
                <Field
                  className={css.input}
                  type="number"
                  name="time"
                  placeholder="10"
                />
                <ErrorMessage
                  name="time"
                  component="div"
                  className={css.error}
                />
              </label>

              <div className={css.rowGroup}>
                <label className={css.label}>
                  <span className={css.labelTitle}>Calories</span>
                  <Field
                    className={`${css.input} ${css.calories}`}
                    type="number"
                    name="calories"
                    placeholder="150"
                  />
                  <ErrorMessage
                    name="calories"
                    component="div"
                    className={css.error}
                  />
                </label>
                <label className={`${css.label} ${css.category}`}>
                  <span className={css.labelTitle}>Category</span>
                  {/* <IoIosArrowDown /> */}
                  <Field as="select" className={css.select} name="category">
                    <option value="">Soup</option>
                    <option value="chocolate">Chocolate</option>
                    <option value="strawberry">Strawberry</option>
                    <option value="vanilla">Vanilla</option>
                  </Field>
                  <ErrorMessage
                    name="category"
                    component="div"
                    className={css.error}
                  />
                </label>
              </div>

              <h2 className={css.sectionTitle}>Ingredients</h2>

              <div className={css.rowGroupIngredients}>
                <label className={css.label}>
                  {/* <IoIosArrowDown /> */}
                  <span className={css.labelTitle}>Name</span>

                  <Field
                    as="select"
                    className={css.selectIngredients}
                    name="ingredient"
                  >
                    <option value="">Choose ingredient</option>
                    <option value="broccoli">Broccoli</option>
                    <option value="cheese">Cheese</option>
                    <option value="egg">Egg</option>
                  </Field>
                </label>

                <label className={css.label}>
                  <span className={css.labelTitle}>Amount</span>
                  <Field
                    className={`${css.input} ${css.ingredientAmount}`}
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
                className={`${css.textarea} ${css.textareaInstructions}`}
                name="instructions"
                placeholder="Enter a text"
              />
              <ErrorMessage
                name="instructions"
                component="div"
                className={css.error}
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
