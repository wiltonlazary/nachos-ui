import React from "react";
import PropTypes from "prop-types";
import Button from "../Button";
import { withTheme } from "../Theme";
import { StyleSheet } from "react-native";

const SegmentedControlButton = props => {
  const {
    value,
    text,
    style,
    textStyle,
    // NOTE: injected by a Switcher
    direction,
    first,
    last,
    selected,
    onChange,
    iconSize,
    iconPosition,
    iconColor,
    theme
  } = props;

  // NOTE: function onChange is injected by the Switcher component
  const switcherProp = onChange && {
    onPress: () => {},
    onPressOut: onChange.bind(null, value)
  };

  // NOTE: Clone props and then delete Component specific props so we can
  // spread the rest
  const { ...rest } = props;
  delete rest.direction;
  delete rest.first;
  delete rest.last;
  delete rest.value;
  delete rest.text;
  delete rest.onChange;
  delete rest.style;
  delete rest.textStyle;
  delete rest.theme;
  delete rest.kind;

  return (
    <Button
      iconColor={iconColor}
      iconActiveColor={
        iconColor || StyleSheet.flatten(theme.selectedText).color || undefined
      }
      iconSize={iconSize}
      iconPosition={iconPosition}
      kind="squared"
      {...rest}
      {...switcherProp}
      style={[
        theme.base,
        first ? theme[`first_${direction}`] : {},
        last ? theme[`last_${direction}`] : {},
        selected ? theme.selected : {},
        style
      ]}
      textStyle={[
        theme.baseText,
        selected ? theme.selectedText : {},
        textStyle
      ]}
    >
      {text}
    </Button>
  );
};

SegmentedControlButton.themeConfig = {
  props: {},
  style: {
    base: {
      height: 50,
      padding: 0,
      paddingHorizontal: 0,
      borderWidth: 1,
      borderColor: "#f4f4f5",
      backgroundColor: "#fff"
    },
    baseText: {
      fontSize: 12,
      fontWeight: "500",
      color: "@primaryColor"
    },
    selected: {
      backgroundColor: "#f5f5f6"
    },
    selectedText: {},
    first_row: {
      borderBottomLeftRadius: 5,
      borderTopLeftRadius: 5,
      borderRightWidth: 0
    },
    first_column: {
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      borderBottomWidth: 0
    },
    last_row: {
      borderBottomRightRadius: 5,
      borderTopRightRadius: 5,
      borderLeftWidth: 0
    },
    last_column: {
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      borderTopWidth: 0
    }
  }
};

SegmentedControlButton.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  text: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  textStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  uppercase: PropTypes.bool,
  theme: PropTypes.object,
  // NOTE: injected by a Switcher
  direction: PropTypes.oneOf(["row", "column"]),
  onChange: PropTypes.func,
  first: PropTypes.bool,
  last: PropTypes.bool,
  selected: PropTypes.bool
};

SegmentedControlButton.defaultProps = {
  uppercase: false,
  iconSize: 20,
  iconColor: "@primaryColor",
  iconPosition: "left"
};

export default withTheme("SegmentedControlButton", SegmentedControlButton);
