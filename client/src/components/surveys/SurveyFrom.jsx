import React from 'react';
import { reduxForm, Field } from 'redux-form';
import SurveyField from './SurveyField';

// SurveyForm renders a form for user to add input
class SurveyForm extends React.Component {
  renderFields() {
    return (
      <div>
        <Field type="text" name="title" component={SurveyField} />
      </div>
    );
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(values => console.log(values))}>
          {this.renderFields()}
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: 'surveyForm'
})(SurveyForm);
