import React from 'react';

import { useTranslation } from 'react-i18next';
import { Modal, Text, View } from 'react-native';

import AppButton from '@components/AppButton/AppButton.component';
import { AppErrorType, tAppError } from '@core/App.error';
import { useDisplayAppModalAction } from 'src/modals/AppModals.actions';
import { useAppModal } from 'src/modals/AppModals.selectors';

const ContactErrorHandler: React.FC<{
  readonly id: string;
}> = ({ id }) => {
  const { t } = useTranslation();

  const errorsTranslation = useTranslation('error');

  const modal = useAppModal<tAppError>(id);

  const display = useDisplayAppModalAction();

  return (
    <Modal
      transparent
      statusBarTranslucent
      animationType="fade"
      visible={modal.visible}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.25)',
          justifyContent: 'center',
        }}>
        <View style={{ backgroundColor: 'white', padding: 8, margin: 32 }}>
          <Text>
            {errorsTranslation.t(
              modal.content?.type || AppErrorType.UNKNOWN_ERROR,
            )}
          </Text>
          <AppButton
            title={{ value: t('accept') }}
            onPress={() =>
              display({
                key: id,
                data: { content: modal.content, visible: false },
              })
            }
          />
        </View>
      </View>
    </Modal>
  );
};

export default ContactErrorHandler;
