interface IPerson {
  id: string;
  name: string;
  mails: string[];
  phone: string;
  notice: string;
  photo: string;
  groupsIds: string[];
  isConfirmed: boolean;
  isBlocked: boolean;
  labels: string[];
}

interface IPersonView {
  id: string;
  name: string;
  mail: string;
  preview: string;
  groupsIds: string[];
  isConfirmed: boolean;
  isBlocked: boolean;
}
