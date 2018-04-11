import { Button } from 'evergreen-ui';
import { Formik, FormikProps } from 'formik';
import * as React from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';

import { TextInput } from '../../../commons';
import { store } from '../../../models';

const Root = styled.div`
  display: grid;
  grid-row-gap: 30px;
  grid-template-rows: repeat(2, 1fr);
`;

interface FormValues {
  name: string;
}

class NewProjectModal extends React.PureComponent {
  state = {};

  _handleSubmit = (values: FormValues, bag: FormikProps<FormValues>) => {
    console.log('values', values);

    store.modalsManager.close();

    // bag.setSubmitting(false);
  }

  render() {
    return (
      <Formik
        validationSchema={Yup.object().shape({
          name: Yup.string().required(),
        })}
        initialValues={{
          name: '',
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
          <Root>
            <TextInput
              name="name"
              placeholder="Name of the project"
              value={values.name}
              handleChange={setFieldValue}
              handleBlur={setFieldTouched}
              disabled={isSubmitting}
              isInvalid={!!(errors.name && touched.name)}
              fullWidth
            />
            <Button
              disabled={!isValid}
              onClick={handleSubmit}
              isLoading={isSubmitting}
              appearance="green"
            >
              Create Project
            </Button>
          </Root>
        )}
      />
    );
  }
}

export default NewProjectModal;
