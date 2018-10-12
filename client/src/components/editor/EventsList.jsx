import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { format } from 'date-fns';
import { getEvents, deleteEvent } from '../../actions/eventsActions';
import { selectEvent, openPanel } from '../../actions/calendarActions';
import Modal from './Modal';
import EventBar from './EventBar';
import './EventsList.scss';

class EventsList extends Component {
  componentDidMount() {
    this.props.getEvents();
  }

  render() {
    let { events, panelOpened } = this.props;
    let months = _.uniq(events.map(e => format(e.date, 'MMMM YYYY')));
    months = months.map(month => (
      <div className={`events-list__month ${month}`} key={month}>
        <h3 className="events-list__heading">{month}</h3>
        {events.filter(e => month.includes(format(e.date, 'MMMM'))).map(e => (
          <EventBar key={e._id} event={e} barStyle="list" />
        ))}
      </div>
    ));
    return (
      <div className="events-list">
        <div className="events-list__wrapper">{months}</div>
        {panelOpened && <Modal />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  events: state.events.events,
  panelOpened: state.calendar.panelOpened
});

EventsList.propTypes = {
  events: PropTypes.array,
  panelOpened: PropTypes.bool,
  getEvents: PropTypes.func.isRequired,
  deleteEvent: PropTypes.func.isRequired,
  openPanel: PropTypes.func.isRequired,
  selectEvent: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  { getEvents, deleteEvent, openPanel, selectEvent }
)(EventsList);
