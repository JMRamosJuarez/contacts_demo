import { tContact } from '@contacts/Contacts.types';

export const CONTACT_ITEM_HEIGHT = 56;

export type tContactListItemProps = {
  readonly contact: tContact;
  readonly onPress: (contact: tContact) => void;
};
