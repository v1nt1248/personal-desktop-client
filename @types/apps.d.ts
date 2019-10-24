type AppSetupSection = 'language' | 'theme';

interface SetupMenuItemValue {
  section: AppSetupSection;
  code: string;
  name: string;
  isSelected: boolean;
}

interface SetupMenuItem {
  id: number;
  section: AppSetupSection;
  text: string;
  icon: string;
  isSelected: boolean;
  value: SetupMenuItemValue[];
}

interface FileDataStructure<T> {
    info: {
        version: string;
    };
    data: T;
}

type SetupFileData = Record<AppSetupSection, string>;
