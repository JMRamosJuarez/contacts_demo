import React, { useMemo } from 'react';

import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity, View } from 'react-native';

import { eDepartment } from '@contacts/Contacts.types';

const DepartmentSelector: React.FC<{
  readonly selected: eDepartment;
  readonly onDepartmentSelected: (department: eDepartment) => void;
}> = ({ selected, onDepartmentSelected }) => {
  const { t } = useTranslation('departments');
  const departments = useMemo<eDepartment[]>(
    () => [
      eDepartment.SALES,
      eDepartment.DEVELOPMENT,
      eDepartment.MARKETING,
      eDepartment.SUPPORT,
    ],
    [],
  );

  return (
    <View
      style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 4,
        paddingHorizontal: 4,
      }}>
      {departments.map(department => {
        return (
          <TouchableOpacity
            key={department}
            activeOpacity={0.85}
            onPress={() => onDepartmentSelected(department)}
            style={{
              paddingVertical: 4,
              paddingHorizontal: 8,
              borderRadius: 8,
              backgroundColor: selected === department ? 'blue' : 'transparent',
              borderWidth: 1,
              borderColor: 'blue',
            }}>
            <Text
              style={{
                color: selected === department ? 'white' : 'blue',
              }}>
              {t(department)}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default DepartmentSelector;
