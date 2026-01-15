import React, { useMemo } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { randomUUID } from 'expo-crypto';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { KeyboardAvoidingView, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import AppButton from '@components/AppButton/AppButton.component';
import ContactErrorHandler from '@components/ContactErrorHandler/ContactErrorHandler.modal';
import DepartmentSelector from '@components/DepartmentSelector/DepartmentSelector.component';
import FormTextInput from '@components/FormTextInput/FormTextInput.component';
import { useCreateContactAction } from '@contacts/Contacts.actions';
import { CreateContactFormSchema } from '@contacts/Contacts.schemas';
import { useContactState } from '@contacts/selectors/Contact.selectors';

const CreateContact: React.FC = () => {
  const mainTranslation = useTranslation();
  const createContactTranslation = useTranslation('create_contact');
  const errorsTranslation = useTranslation('errors');

  const safeInsets = useSafeAreaInsets();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(CreateContactFormSchema),
  });

  const id = useMemo(() => randomUUID(), []);

  const createContact = useCreateContactAction();

  const nameError = useMemo(() => {
    if (errors.name?.message) {
      return { text: errorsTranslation.t(errors.name.message) };
    }
  }, [errorsTranslation, errors.name?.message]);

  const emailError = useMemo(() => {
    if (errors.email?.message) {
      return { text: errorsTranslation.t(errors.email.message) };
    }
  }, [errorsTranslation, errors.email?.message]);

  const phoneError = useMemo(() => {
    if (errors.phone?.message) {
      return { text: errorsTranslation.t(errors.phone.message) };
    }
  }, [errorsTranslation, errors.phone?.message]);

  const departmentError = useMemo(() => {
    if (errors.department?.message) {
      return { text: errorsTranslation.t(errors.department.message) };
    }
  }, [errorsTranslation, errors.department?.message]);

  const state = useContactState(id);

  return (
    <>
      <KeyboardAvoidingView behavior={'padding'} style={{ flex: 1 }}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{
            paddingHorizontal: 8,
            gap: 8,
          }}
          bounces={false}
          showsVerticalScrollIndicator={false}>
          <Controller
            name="name"
            control={control}
            render={({ field: { value, onChange, onBlur } }) => {
              return (
                <FormTextInput
                  label={{
                    text: createContactTranslation.t('name_input.label'),
                  }}
                  error={nameError}
                  input={{
                    value,
                    textContentType: 'username',
                    onChangeText: onChange,
                    onBlur,
                    placeholder: createContactTranslation.t(
                      'name_input.placeholder',
                    ),
                  }}
                />
              );
            }}
          />
          <Controller
            name="email"
            control={control}
            render={({ field: { value, onChange, onBlur } }) => {
              return (
                <FormTextInput
                  label={{
                    text: createContactTranslation.t('email_input.label'),
                  }}
                  error={emailError}
                  input={{
                    value,
                    keyboardType: 'email-address',
                    textContentType: 'emailAddress',
                    autoCapitalize: 'none',
                    autoCorrect: false,
                    onChangeText: onChange,
                    onBlur,
                    placeholder: createContactTranslation.t(
                      'email_input.placeholder',
                    ),
                  }}
                />
              );
            }}
          />
          <Controller
            name="phone"
            control={control}
            render={({ field: { value, onChange, onBlur } }) => {
              return (
                <FormTextInput
                  label={{
                    text: createContactTranslation.t('phone_input.label'),
                  }}
                  error={phoneError}
                  input={{
                    value,
                    keyboardType: 'number-pad',
                    autoCapitalize: 'none',
                    autoCorrect: false,
                    onChangeText: onChange,
                    onBlur,
                    placeholder: createContactTranslation.t(
                      'phone_input.placeholder',
                    ),
                  }}
                />
              );
            }}
          />
          <Controller
            name="department"
            control={control}
            render={({ field: { value, onChange } }) => {
              return (
                <View style={{ gap: 4 }}>
                  <Text style={[{ fontSize: 12, color: 'black' }]}>
                    {createContactTranslation.t('department_input.label')}
                  </Text>
                  <DepartmentSelector
                    selected={value}
                    onDepartmentSelected={deparment => onChange(deparment)}
                  />
                  {departmentError && (
                    <Text
                      style={{
                        color: '#EF4444',
                        fontSize: 12,
                        lineHeight: 16,
                      }}>
                      {departmentError.text}
                    </Text>
                  )}
                </View>
              );
            }}
          />
        </ScrollView>
        <AppButton
          style={{ marginBottom: safeInsets.bottom + 8, marginHorizontal: 16 }}
          title={{ value: mainTranslation.t('confirm') }}
          isLoading={state === 'loading'}
          onPress={handleSubmit(values => createContact({ id, ...values }))}
        />
      </KeyboardAvoidingView>
      <ContactErrorHandler id={id} />
    </>
  );
};

export default CreateContact;
