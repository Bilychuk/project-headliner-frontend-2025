import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import Select from 'react-select';
import css from './AddRecipeForm.module.css';
import { createRecipe } from '../../api/api.js';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCustomSelectStyles } from '../../styles/customSelectStyles';
import { useEffect, useState } from 'react';
import {
  selectAuthToken,
  selectIsAuthenticated,
} from '../../redux/auth/selectors.js';
import { useDispatch, useSelector } from 'react-redux';
import ModalErrorSaving from '../ModalErrorSaving/ModalErrorSaving.jsx';
import sprite from '../../assets/icon/sprite.svg';
import { fetchOwnRecipes } from '../../redux/recipes/operations.js';
import {
  selectCategories,
  selectIngredients,
} from '../../redux/filters/selectors.js';

const validationSchema = Yup.object({
  title: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
  time: Yup.number().required('Required').positive().integer(),
  calories: Yup.number().nullable().positive(),
  category: Yup.string().required('Required'),
  newIngredient: Yup.object()
    .nullable()
    .shape({
      value: Yup.string().required(),
      label: Yup.string().required(),
    })
    .required('Required'),
  newIngredientMeasure: Yup.string().required('Required'),
  ingredients: Yup.array()
    .of(
      Yup.object({
        id: Yup.string().required('Required'),
        measure: Yup.string().required('Required'),
      })
    )
    .min(1, 'Add at least one ingredient'),
  instructions: Yup.string().required('Required'),
});

const initialValues = {
  title: '',
  description: '',
  time: '',
  calories: '',
  category: '',
  ingredients: [],
  newIngredient: null,
  newIngredientMeasure: '',
  instructions: '',
  photo: null,
};

const AddRecipeForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isAuthenticated = useSelector(selectIsAuthenticated);
  const token = useSelector(selectAuthToken);

  const dispatch = useDispatch();

  const categoriesFromRedux = useSelector(selectCategories);
  const ingredientsFromRedux = useSelector(selectIngredients);

  const categoryOptions = categoriesFromRedux.map(cat => ({
    value: cat._id,
    label: cat.name,
  }));
  const ingredientOptions = ingredientsFromRedux.map(ing => ({
    value: ing._id,
    label: ing.name,
  }));

  const selectStylesDefault = useCustomSelectStyles('default');
  const selectStylesIngredients = useCustomSelectStyles('ingredients');

  const navigate = useNavigate();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {}, [isModalOpen]);
  useEffect(() => {}, [isAuthenticated]);
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    if (!isAuthenticated) {
      handleOpenModal();
      setSubmitting(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('description', values.description);
      formData.append('time', values.time);
      if (values.calories) {
        formData.append('calories', values.calories);
      }
      // formData.append('category', values.category);

      const selectedCategory = categoryOptions.find(
        opt => opt.value === values.category
      );
      formData.append('category', selectedCategory.label);

      formData.append('instructions', values.instructions);
      if (values.photo) {
        formData.append('thumb', values.photo);
      }

      values.ingredients.forEach((ingredient, index) => {
        formData.append(`ingredients[${index}][id]`, ingredient.id);
        formData.append(`ingredients[${index}][measure]`, ingredient.measure);
      });

      const response = await createRecipe(formData, token);
      dispatch(fetchOwnRecipes({ page: 1, limit: 12 }));
      const createdRecipeId = response.data._id;

      toast.success('Recipe created successfully!');
      navigate(`/recipes/${createdRecipeId}`, { state: { updated: true } });
      resetForm();
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');

        handleOpenModal();
      } else {
        toast.error(error.response?.data?.message || 'Something went wrong');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          setFieldValue,
          isSubmitting,
          values,
          errors,
          touched,
          submitForm,
        }) => (
          <Form encType="multipart/form-data">
            <div className={css.wrapper}>
              <div className={css.photoColumn}>
                <p className={css.uploadTitle}>Upload Photo</p>
                <label htmlFor="photoInput" className={css.photoLabel}>
                  {values.photo && (
                    <img
                      src={URL.createObjectURL(values.photo)}
                      alt="Preview"
                      className={css.previewImage}
                    />
                  )}
                  {!values.photo && (
                    <svg className={css.cameraIcon}>
                      <use href={`${sprite}#icon-photo`} />
                    </svg>
                  )}
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
                <h3 className={css.sectionTitle}>General Information</h3>

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
                  <span className={css.labelTitle}>
                    Cooking time in minutes
                  </span>
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
                  <label className={`${css.label} ${css.caloriesLabel}`}>
                    <span className={css.labelTitle}>Calories</span>
                    <Field
                      className={`${css.input} ${css.calories} ${
                        errors.calories && touched.calories
                          ? css.inputError
                          : ''
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
                      styles={selectStylesDefault(
                        Boolean(errors.category && touched.category)
                      )}
                    />
                    {errors.category && touched.category && (
                      <div className={css.errorMessage}>{errors.category}</div>
                    )}
                  </label>
                </div>

                <h3 className={css.sectionIngredients}>Ingredients</h3>
                <div className={css.rowGroupIngredients}>
                  <label className={css.ingredientsName}>
                    <span className={css.labelTitle}>Name</span>
                    <Select
                      className={css.reactSelect}
                      name="newIngredient"
                      options={ingredientOptions}
                      placeholder="Egg"
                      value={values.newIngredient}
                      onChange={option =>
                        setFieldValue('newIngredient', option)
                      }
                      styles={selectStylesIngredients(
                        Boolean(errors.ingredient && touched.ingredient)
                      )}
                    />
                  </label>

                  <div className={css.addWrapper}>
                    <label className={css.ingredientsAmount}>
                      <span className={css.labelTitle}>Amount</span>
                      <Field
                        className={`${css.input} ${css.ingredientAmount} ${
                          errors.newIngredientMeasure &&
                          touched.newIngredientMeasure
                            ? css.inputError
                            : ''
                        }`}
                        type="text"
                        name="newIngredientMeasure"
                        placeholder="100g"
                      />
                    </label>

                    <FieldArray name="ingredients">
                      {({ push }) => (
                        <button
                          type="button"
                          className={`${css.addBtn} ${css.btn}`}
                          onClick={() => {
                            if (
                              values.newIngredient &&
                              values.newIngredientMeasure
                            ) {
                              push({
                                id: values.newIngredient.value,
                                measure: values.newIngredientMeasure,
                              });

                              setFieldValue('newIngredient', null);
                              setFieldValue('newIngredientMeasure', '');
                            } else {
                              toast.error('Select ingredient and amount');
                            }
                          }}
                        >
                          Add new Ingredient
                        </button>
                      )}
                    </FieldArray>
                  </div>
                </div>

                <FieldArray name="ingredients">
                  {({ remove }) => (
                    <>
                      <table className={css.ingredientTable}>
                        <thead className={css.ingredientTabTitle}>
                          <tr>
                            <th className={css.ingredientTbName}>Name</th>
                            <th>Amount</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {values.ingredients.map((ing, index) => {
                            if (!ing.id && !ing.measure) return null;
                            return (
                              <tr key={index} className={css.ingredientItem}>
                                <td className={css.chooseIngName}>
                                  {
                                    ingredientOptions.find(
                                      opt => opt.value === ing.id
                                    )?.label
                                  }
                                </td>
                                <td className={css.chooseIngMeasure}>
                                  {ing.measure}
                                </td>
                                <td>
                                  <button
                                    className={css.removeBtn}
                                    type="button"
                                    onClick={() => remove(index)}
                                  >
                                    <svg width={24} height={24}>
                                      <use
                                        href={`${sprite}#icon-recycle-black`}
                                      />
                                    </svg>
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </>
                  )}
                </FieldArray>

                <h3 className={css.sectionTitle}>Instructions</h3>
                <label className={`${css.label} ${css.instructionsWrapper}`}>
                  <Field
                    as="textarea"
                    className={`${css.textarea} ${css.textareaInstructions} ${
                      errors.instructions && touched.instructions
                        ? css.textareaError
                        : ''
                    }`}
                    name="instructions"
                    placeholder="Enter the step by step instructions for your recipe"
                  />
                </label>

                <button
                  className={`${css.submitBtn} ${css.btn}`}
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => {
                    if (!isAuthenticated) {
                      handleOpenModal();
                      return;
                    }
                    submitForm();
                  }}
                >
                  Publish Recipe
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
      <ModalErrorSaving
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
      />
    </>
  );
};

export default AddRecipeForm;
