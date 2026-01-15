import React, { forwardRef, useMemo } from 'react';

import {
  StyleProp,
  Text,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

import FormTextInputProps from '@components/FormTextInput/FormTextInput.props';

const FormTextInput = forwardRef<TextInput, FormTextInputProps>(
  ({ style, label, input = {}, error, startIcon, endIcon }, inputRef) => {
    const inputContainerStyle = useMemo<ViewStyle>(
      () => ({
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 4,
        paddingHorizontal: 2,
        backgroundColor: '#F8FAFC',
        borderWidth: 1,
        borderColor: error !== undefined ? '#EF4444' : '#E3E8EF',
      }),
      [error],
    );

    const errorStyle = useMemo<StyleProp<TextStyle>>(
      () => [
        { color: '#EF4444', fontSize: 12, lineHeight: 16 },
        error?.style,
        {
          opacity: error?.text !== undefined ? 1 : 0,
        },
      ],
      [error?.style, error?.text],
    );

    return (
      <View style={{ gap: 2 }}>
        <Text style={[{ fontSize: 12, color: 'black' }, label.style]}>
          {label.text}
        </Text>

        <View style={[inputContainerStyle, style]}>
          {startIcon}
          <TextInput
            ref={inputRef}
            {...input}
            placeholderTextColor={error !== undefined ? '#EF4444' : '#677489'}
            style={[
              {
                flex: 1,
                paddingVertical: 0,
                paddingHorizontal: 8,
                height: 40,
                fontSize: 14,
                lineHeight: 20,
                color: 'black',
              },
              input.style,
            ]}
          />
          {endIcon}
        </View>

        <Text style={errorStyle}>{error?.text}</Text>
      </View>
    );
  },
);

FormTextInput.displayName = 'FormTextInput';

export default FormTextInput;
