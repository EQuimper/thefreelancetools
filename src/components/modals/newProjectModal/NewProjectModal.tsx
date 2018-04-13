import { Button } from 'evergreen-ui';
import { Formik, FormikProps } from 'formik';
import * as React from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';

import { TextInput } from '@freelance-tool/commons';
import { Project, store } from '@freelance-tool/models';

const Form = styled.form`
  display: grid;
  grid-row-gap: 30px;
  grid-template-rows: repeat(2, 1fr);
`;

interface FormValues {
  name: string;
  description: string;
}

class NewProjectModal extends React.PureComponent {
  state = {};

  _handleSubmit = (values: FormValues, bag: FormikProps<FormValues>) => {
    const project = Project.create({
      ...values,
    });

    store.projects.addProject(project);

    store.modalsManager.close();
  }

  render() {
    return (
      <Formik
        validationSchema={Yup.object().shape({
          name: Yup.string().required('Project name is required'),
          description: Yup.string().required('A short description is required'),
        })}
        initialValues={{
          name: '',
          description: '',
        }}
        onSubmit={this._handleSubmit}
        render={({
          values,
          setFieldValue,
          setFieldTouched,
          isSubmitting,
          touched,
          errors,
          handleSubmit,
          isValid,
        }: FormikProps<FormValues>) => (
          <Form onSubmit={handleSubmit}>
            <TextInput
              name="name"
              label="Name of the project"
              placeholder="Name of the project"
              value={values.name}
              handleChange={setFieldValue}
              handleBlur={setFieldTouched}
              disabled={isSubmitting}
              isInvalid={!!(errors.name && touched.name)}
              fullWidth
              isRequired
              errorMessage={errors.name}
            />
            <TextInput
              name="description"
              label="Short description"
              placeholder="Short description"
              value={values.description}
              handleChange={setFieldValue}
              handleBlur={setFieldTouched}
              disabled={isSubmitting}
              isInvalid={!!(errors.description && touched.description)}
              fullWidth
              isRequired
              errorMessage={errors.description}
            />
            <Button
              disabled={!isValid}
              isLoading={isSubmitting}
              appearance="green"
            >
              Create Project
            </Button>
          </Form>
        )}
      />
    );
  }
}

export default NewProjectModal;
