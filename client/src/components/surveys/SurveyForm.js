import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form'; 
import { Link } from 'react-router-dom'; 
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';

class SurveyForm extends Component {
    renderField() {
        return _.map(formFields, ({label, name}) => {
            return (
                <Field key={name} component={SurveyField} type='text' label={label} name={name} />
            );
        });
    }
    render() {
        return (
            <div>
                <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)} >
                    {this.renderField()}
                    <Link to="/surveys" className="red btn-flat white-text left">
                        Cancel
                    </Link>
                    <button className='teal btn-flat right white-text' type="submit">
                        Next
                        <i className="material-icons right">done</i>
                    </button>
                </form>
            </div>
        )
    }
}

const validate = values => {
    const errors = {};
    _.each(formFields, ({ name }) => {
        if (!values[name]) {
            errors[name] = 'You must provide a value';
        }
    });

    errors.recipients = validateEmails(values.recipients || '');
    
    return errors;
}

export default reduxForm({
    validate,
    form: 'surveyForm',
    destroyOnUnmount: false
})(SurveyForm);