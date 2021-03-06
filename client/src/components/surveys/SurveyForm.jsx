// SurveyForm renders a form for user to configure surveys to sent to a list of recipients

import _ from 'lodash';
import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';

class SurveyForm extends React.Component {
  renderFields() {
    return _.map(formFields, field => {
      return (
        <Field
          key={field.name}
          label={field.label}
          name={field.name}
          type="text"
          component={SurveyField}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderFields()}
          <Link to="/surveys" className="red lighten-2 btn-flat white-text">
            Cancel
          </Link>
          <button
            type="submit"
            className="teal lighten-2 btn-flat right white-text"
          >
            Next
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}

const validate = values => {
  const errors = {};

  errors.recipients = validateEmails(values.recipients || '');

  _.each(formFields, ({ name, noValueError }) => {
    if (!values[name]) {
      errors[name] = noValueError;
    }
  });

  return errors;
};

// navigating between SurveyForm && SurveyFormReview, inputs are persisted between the two components

// however, navigating from SurveyForm to SurveyNew, inputs are cleared

// also clears inputs when navigating to any other route when the SurveyForm has already inputted values

export default reduxForm({
  validate: validate,
  form: 'surveyForm',
  destroyOnUnmount: false
})(SurveyForm);
