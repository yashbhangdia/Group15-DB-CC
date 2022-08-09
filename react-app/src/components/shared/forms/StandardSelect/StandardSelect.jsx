import React, { Component } from "react";
import "./standard-select.scss";
import PropTypes from "prop-types";
import Select from "react-select";
import classNames from "classnames";
import validationUtils from "../../../../utils/validationUtils";
import { colors } from "../../../../config/colors";
import { shadeColor, hexToRgb } from "../../../../utils/generalUtils";

class StandardSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valid: false,
      errorText: "",
      dirty: false,
    };
  }

  componentDidMount() {
    this.checkValidatity(this.props.value);
  }
  renderLabel = () => {
    const { label } = this.props;

    if (label) {
      return <label>{label}</label>;
    }
    return null;
  };

  renderError = () => {
    const { errorText } = this.state;

    if (errorText && (this.state.dirty || this.props.showError)) {
      return <p className="error-text mb-0 mt-2">{errorText}</p>;
    }
    return null;
  };

  checkValidatity = (value) => {
    let isValid = true;
    let errorText = "";
    for (let validation of this.props.validations || []) {
      if (
        !validation.disabled &&
        !validationUtils[validation.type](value, validation.value)
      ) {
        errorText = validation.message;
        isValid = false;
        break;
      }
    }
    this.setState({
      valid: isValid,
      errorText: errorText,
    });
  };

  onChange = (e) => {
    if (e) this.checkValidatity(e.value);
    else {
      this.checkValidatity();
    }
    this.props.onChange(e);
  };

  onBlur = () => {
    this.setState({
      dirty: true,
    });
  };

  getSelectedOption = () => {
    if (this.props.isMultiple) {
      let selectedOptions = [];
      for (let option of this.props.options) {
        if (this.props.value.findIndex((v) => v === option.value) >= 0) {
          selectedOptions.push(option);
        }
      }
      return selectedOptions;
    } else {
      for (let option of this.props.options) {
        if (option.value === this.props.value) {
          return option;
        }
      }
    }
    return null;
  };

  render() {
    const customStyles = {
      control: (base) => ({
        ...base,
        minWidth: "200px",
        height: "3rem",
        padding: "0rem 1rem",
        cursor: "pointer",
        borderColor:
          (this.state.dirty || this.props.showError) && !this.state.valid
            ? colors["danger"]
            : colors["base-border"],
        ":hover": {
          borderColor: colors["primary"],
        },
        ":focus": {
          borderColor: colors["primary"],
        },
      }),
      option: (base, { data, isDisabled, isFocused, isSelected }) => {
        return {
          ...base,
          cursor: "pointer",
          backgroundColor: isSelected
            ? colors["primary"]
            : isFocused
            ? `rgba(${hexToRgb(shadeColor(colors["primary"], 10), true)}, 0.6)`
            : null,

          ":active": {
            ...base[":active"],
            backgroundColor: colors["primary"],
          },
          ":hover": {
            ...base[":hover"],
            backgroundColor: `rgba(${hexToRgb(
              shadeColor(colors["primary"], 10),
              true
            )}, 0.6)`,
            color: "white",
          },
        };
      },
      input: (styles) => ({ ...styles }),
    };
    const { props } = this;
    const style = classNames("standard-select", {
      [props.className]: props.className,
      error: (this.state.dirty || this.props.showError) && !this.state.valid,
    });

    return (
      <div className={style}>
        {this.renderLabel()}
        <Select
          placeholder={props.placeholder}
          isDisabled={props.isDisabled}
          options={props.options}
          onChange={this.onChange}
          value={this.getSelectedOption()}
          defaultValue={props.defaultValue}
          isClearable={props.isClearable}
          isSearchable={props.isSearchable}
          isMulti={props.isMultiple}
          styles={customStyles}
          onBlur={this.onBlur}
          className="select-box"
        />
        {this.state.valid ? null : this.renderError()}
      </div>
    );
  }
}

StandardSelect.propTypes = {
  placeholder: PropTypes.string,
  label: PropTypes.string,
  options: PropTypes.array.isRequired,
  isDisabled: PropTypes.bool,
  defaultValue: PropTypes.string,
  isClearable: PropTypes.bool,
  error: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.object,
  isSearchable: PropTypes.bool,
  isMultiple: PropTypes.bool,
  className: PropTypes.string,
  errorText: PropTypes.string,
};

StandardSelect.defaultProps = {
  isDisabled: false,
  isClearable: false,
  isSearchable: false,
  isMultiple: false,
};

export default StandardSelect;
