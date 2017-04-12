import React, { Component } from "react"
import PropTypes from "prop-types"
import DatePicker from "react-datepicker"

class DeadlineButton extends Component {
  static propTypes = {
    onClick: PropTypes.func,
    value:   PropTypes.string,
  }

  render() {
    const { onClick, value } = this.props
    const deadlineExist = value !== ""

    return (
      <button className="btn btn-default btn-xs dropdown-toggle" onClick={onClick}>
        <span className="glyphicon glyphicon-time" />
        { deadlineExist || <span> Set deadline</span> }
        { deadlineExist && <span> Change deadline</span> }
      </button>
    )
  }
}

export default class DeadlinePicker extends Component {
  static propTypes = {
    deadline: PropTypes.object,
    onChange: PropTypes.func.isRequired,
  }

  onRemoveDeadline() {
    this.props.onChange(null)
  }

  onSetDeadline(date) {
    this.props.onChange(date)
  }

  render() {
    const { deadline } = this.props

    return (
      <div className="deadline-dropdown">
        <DatePicker
          selected={deadline}
          customInput={<DeadlineButton />}
          onChange={::this.onSetDeadline} />
        {
          deadline &&
          <span>
            <span> or </span>
            <button
              className="btn btn-default btn-xs"
              type="button"
              onClick={::this.onRemoveDeadline}>
              <span className="glyphicon glyphicon-remove" />
              <span> Cancel</span>
            </button>
          </span>
        }
      </div>
    )
  }
}
