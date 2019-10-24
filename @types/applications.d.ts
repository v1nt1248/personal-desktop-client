interface IAppInfo {
  id: string;
  nameKey: string;
  icon: string;
  stateName: string;
  fsName: string;
  disabled: boolean;
}

interface UserStatus {
  code: number;
  description: string;
}

interface MenuNavItem {
  appId: string;
  link: string;
  icon: string;
  badgeInfo: string;
  isActive: boolean;
}
