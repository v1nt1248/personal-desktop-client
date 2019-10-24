interface IMailFolder {
  id: string;
  orderNum: number;
  nameKey: string;
  isSystem: boolean;
  icon?: string;
  messageKeys: string[];
  noReadQt: number;
}

interface InboxMessageInfo extends web3n.asmail.MsgInfo {
  msgKey: string;
}

interface MessageBase {
  msgId: string;
  msgKey: string;
  sender: string;
  mailAddresses: string[];
  subject: string;
  timestamp: number;
}

interface MessageListItem extends MessageBase {
  folderId: string;
  senderAlias: string;
  body: string;
  attachedFilesNames?: string[];
  isDraft?: boolean;
  isRead: boolean;
  isSendError?: boolean;
}

interface Message extends MessageBase {
  bodyTxt?: string;
  bodyHTML?: string;
  attached?: AttachFileInfo[];
  errorsWhenSend?: ErrorWhenSend[];
}

interface MessageEdited extends Message {
  senderAlias: string;
  alias: string[];
}

interface AttachFileInfo {
  name: string;
  size: number;
  status: string;
}

interface ErrorWhenSend {
  mailAddress: string;
  errorText: string;
}

interface SendingStatus {
  msgId: string;
  totalDataSize: number;
  sentDataSize: number;
  isComplete: boolean;
}
