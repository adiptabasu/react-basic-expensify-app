import React from 'react';
import { connect } from 'react-redux';
import { setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate } from '../actions/filters';
import { DateRangePicker } from 'react-dates';

class ExpenseListFilters extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            calendarFocused: null
        }
        this.onDatesChange = this.onDatesChange.bind(this);
        this.onFocusChange = this.onFocusChange.bind(this);
    }
    onDatesChange = ({ startDate, endDate }) => {
        this.props.dispatch(setStartDate({ startDate }));
        this.props.dispatch(setEndDate({ endDate }));
    }
    onFocusChange = (calendarFocused) => {
        this.setState(() => ({ calendarFocused }));
    }
    render() {
        return (
            <div className="content-container">
                <div className="input-group">
                    <div className="input-group__item">
                        <input
                            className="text-input"
                            type="text"
                            value={this.props.filters.text} onChange={(e) => {
                                // console.log(e.target.value);
                                this.props.dispatch(setTextFilter({ text: e.target.value }));
                            }}
                            placeholder="Search Expenses"
                        />
                    </div>
                    <div className="input-group__item">
                        <select className="select" value={this.props.sortBy} onChange={(e) => {
                            let sortVal = e.target.value;
                            if (sortVal == 'date') {
                                this.props.dispatch(sortByDate());
                            }
                            else if (sortVal == 'amount') {
                                this.props.dispatch(sortByAmount());
                            }
                        }}>
                            <option value="date">Date</option>
                            <option value="amount">Amount</option>
                        </select>
                    </div>
                    <div className="input-group__item">
                        <DateRangePicker
                            startDate={this.props.filters.startDate}
                            endDate={this.props.filters.endDate}
                            onDatesChange={this.onDatesChange}
                            focusedInput={this.state.calendarFocused}
                            onFocusChange={this.onFocusChange}
                            numberOfMonths={1}
                            isOutsideRange={() => (false)}
                            showClearDates={true}
                        />
                    </div>
                </div>


            </div>
        );
    }
}

// const ExpenseListFilters = (props) => (
//     <div>
//         <input type="text" value={props.filters.text} onChange={(e) => {
//             // console.log(e.target.value);
//             props.dispatch(setTextFilter({ text: e.target.value }));
//         }} />
//         <select value={props.sortBy} onChange={(e) => {
//             let sortVal = e.target.value;
//             if (sortVal == 'date') {
//                 props.dispatch(sortByDate());
//             }
//             else if (sortVal == 'amount') {
//                 props.dispatch(sortByAmount());
//             }
//         }}>
//             <option value="date">Date</option>
//             <option value="amount">Amount</option>
//         </select>
//     </div>
// );

const mapStateToProps = (state) => {
    // console.log(state.filters);
    return { filters: state.filters }
}

const ConnectedExpenseListFilters = connect(mapStateToProps)(ExpenseListFilters);

export default ConnectedExpenseListFilters;