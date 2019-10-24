import { Component, Prop, Vue } from 'vue-property-decorator';
import { getElementColor } from '@/common/helpers';
import { VIcon } from 'vuetify/lib';

@Component({
  components: {
    'v-icon': VIcon,
  },
})
export default class ContactIcon extends Vue {
  @Prop() public name!: string;
  @Prop() public photo!: string;
  @Prop() public size!: number;
  @Prop() public isSelect!: boolean;
  public innerSize: number;

  constructor() {
    super();
    this.innerSize = this.size ? this.size : 24;
  }

  public get blockStyle(): Record<string, string> {
    let styles: Record<string, string> = {
      width: `${this.innerSize}px`,
      height: `${this.innerSize}px`,
      backgroundColor: getElementColor(this.name || '?'),
    };
    if (this.photo) {
      styles = {
        ...styles,
        backgroundImage: `url(${this.photo})`,
      };
    }
    return styles;
  }

  public getNameStyle(): Record<string, string> {
    return {
      fontSize: `${Math.floor(this.size * 0.5) - 2}px`,
    };
  }

  public getLetters(): string {
    if (this.name && typeof this.name === 'string') {
      return this.name.length === 1 ?
        this.name.toLocaleUpperCase() :
        `${this.name[0].toLocaleUpperCase()}${this.name[1].toLocaleLowerCase()}`;
    }
    return '';
  }
}
