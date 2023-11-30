// Tested with Jest and Enzyme
// createTransaction, createListTransaction, clearTransaction, and finalizeTransaction functions in our JobPrepContainer component testing
//The job form is rendered.
  //  The show date input field is rendered.
    //The output select field is rendered.
    //The iLearn Auto Caption checkbox is rendered.
    //The comments text field is rendered.
    //The complete request button is rendered.
    //The complete request button is disabled if the form is not enabled.
    //The complete request button is enabled if the form is enabled and the file is present.

import  React, {Component} from 'react';
import {render, screen} from '@testing-library/react';
import NewJobFormContainer from 'src/components/AddCapJobView/NewJobFormContainer';

// Mock the `connect` function from Redux
jest.mock('react-redux', () => ({
    connect: jest.fn((mapStateToProps, mapDispatchToProps) => {
        return (Component) => {
            const props = mapStateToProps({
                requesterId: 'requester_id',
                tempJobsFormReducer: {
                    'transaction_id': {
                        video: {
                            id: 1,
                        },
                    },
                },
            }, {props: {}, requesterId: 'requester_id', transaction_id: 'transaction_id', isLocked: false});

            return <Component {...props} />;
        };
    }),
}));

describe('NewJobFormContainer', () => {
    it('should render the job form', () => {
        render(<NewJobFormContainer />);

        // Expect the job form to be rendered
        expect(screen.getByTestId('job-form')).toBeInTheDocument();
    });

    it('should render the show date input field', () => {
        render(<NewJobFormContainer />);

        // Expect the show date input field to be rendered
        expect(screen.getByLabelText('Show Date')).toBeInTheDocument();
    });

    it('should render the output select field', () => {
        render(<NewJobFormContainer />);

        // Expect the output select field to be rendered
        expect(screen.getByLabelText('Output')).toBeInTheDocument();
    });

    it('should render the iLearn Auto Caption checkbox', () => {
        render(<NewJobFormContainer />);

        // Expect the iLearn Auto Caption checkbox to be rendered
        expect(screen.getByLabelText('iLearn Auto Caption')).toBeInTheDocument();
    });

    it('should render the comments text field', () => {
        render(<NewJobFormContainer />);

        // Expect the comments text field to be rendered
        expect(screen.getByLabelText('comments')).toBeInTheDocument();
    });

    it('should render the complete request button', () => {
        render(<NewJobFormContainer />);

        // Expect the complete request button to be rendered
        expect(screen.getByText('Complete Request')).toBeInTheDocument();
    });

    it('should disable the complete request button if the form is not enabled', () => {
        render(<NewJobFormContainer formEnabled={false} />);

        // Expect the complete request button to be disabled
        expect(screen.getByText('Complete Request')).toBeDisabled();
    });

    it('should enable the complete request button if the form is enabled and the file is present', () => {
        render(<NewJobFormContainer formEnabled={true} filePresent={true} />);

        // Expect the complete request button to be enabled
        expect(screen.getByText('Complete Request')).toBeEnabled();
    });
});
