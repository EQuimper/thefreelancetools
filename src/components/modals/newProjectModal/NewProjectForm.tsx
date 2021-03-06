import { Button, FormField } from 'evergreen-ui';
import { Formik, FormikProps } from 'formik';
import * as React from 'react';
import * as Yup from 'yup';

import { SegmentedControl, styled, TextInput } from '@freelance-tool/commons';
import { ProjectPriorityEnum } from '@freelance-tool/types';
import { capitalize } from '@freelance-tool/utils';

const PRIORITY = ['HIGH', 'MEDIUM', 'LOW'];

const OPTIONS = PRIORITY.map(el => ({
  label: capitalize(el),
  value: el,
}));

const Form = styled.form`
  display: grid;
  grid-row-gap: 30px;
  grid-template-rows: repeat(2, 1fr);
`;

interface FormValues {
  name: string;
  description: string;
  priority: ProjectPriorityEnum;
}

interface P {
  handleSubmit: (values: FormValues, bag: FormikProps<FormValues>) => void;
}

interface S {}

class NewProjectForm extends React.PureComponent<P, S> {
  render() {
    return (
      <Formik
        validationSchema={Yup.object().shape({
          name: Yup.string().required('Project name is required'),
          description: Yup.string().required('A short description is required'),
          priority: Yup.mixed().oneOf(['HIGH', 'MEDIUM', 'LOW']),
        })}
        initialValues={{
          name: '',
          description: '',
          priority: ProjectPriorityEnum.HIGH,
        }}
        onSubmit={this.props.handleSubmit}
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
            <FormField isRequired label="Project Priority">
              <SegmentedControl
                options={OPTIONS}
                value={values.priority}
                name="priority"
                onSelect={setFieldValue}
              />
            </FormField>
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

export default NewProjectForm;
