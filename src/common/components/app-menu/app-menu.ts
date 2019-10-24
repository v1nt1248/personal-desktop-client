import { Component, Vue, Prop } from 'vue-property-decorator';
import { appStore, appContactsStore } from '@/common/di';
import {
  VIcon,
  VBtn,
} from 'vuetify/lib';
import ContactIcon from '@/common/components/contact-icon/ContactIcon.vue';
import AppMenuItem from './app-menu-item/AppMenuItem.vue';

@Component({
  components: {
    'contact-icon': ContactIcon,
    'app-menu-item': AppMenuItem,
    'v-icon': VIcon,
    'v-btn': VBtn,
  },
})
export default class AppMenu extends Vue {
  @Prop() public menuItems!: MenuNavItem[];
  public user: {name: string; status: string} = {name: '', status: ''};
  public tab: number = 0;

  public async created(): Promise<void> {
    this.user = {
      name: appStore.values.user.split('@')[0],
      status: appStore.values.userStatus.description,
    };
  }

  public toggleLeftMenu(): void {
    appStore.values.isLeftSidebarOpen = !appStore.values.isLeftSidebarOpen;
  }

  public toggleRightMenu(): void {
    appStore.values.isRightSidebarOpen = !appStore.values.isRightSidebarOpen;
  }

}
