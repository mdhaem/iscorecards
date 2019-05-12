import React from 'react';
import * as moment from 'moment'
import DatePicker from 'react-datepicker';

class MyDatePicker extends React.Component {
    state = {
        startDate: moment()
      };

    handleChange = value => {
      // this is going to call setFieldValue and manually update values.topcis
      this.setState({startDate: value})
      this.props.onChange('scoresDate', value);
    };
  
    //handleBlur = () => {
      // this is going to call setFieldTouched and manually update touched.topcis
      //this.props.onBlur('scaresDate', true);
    //};
  
    render() {
      return (
        <div style={{ margin: '1rem 0' }}>
          <DatePicker
            selected={this.state.startDate}
            onChange={this.handleChange}
            //onBlur={this.handleBlur}
            value={this.props.value}
            placeholder='...click to pick date'
          />
          {!!this.props.error &&
            this.props.touched && (
              <div style={{ color: 'red', marginTop: '.5rem' }}>{this.props.error}</div>
            )}
        </div>
      );
    }
  }

  export default MyDatePicker