import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Payments extends React.Component {
  render() {
    return (
      <StripeCheckout
        name="teamster-io"
        description="$5 for 5 Survey Credits"
        amount={500}
        token={token => this.props.handleToken(token)}
        stripeKey={process.env.STRIPE_PUBLISHABLE_KEY}
      >
        <button className="btn green darken-3">Add Credits</button>
      </StripeCheckout>
    );
  }
}

export default connect(
  null,
  actions
)(Payments);
