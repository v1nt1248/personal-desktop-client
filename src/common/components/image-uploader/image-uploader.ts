import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { appStore } from '@/common/services/app-store';
import { getElementColor, invertColor, openFileAndConvertToBase64 } from '@/common/helpers';
import { VBtn, VIcon } from 'vuetify/lib';

@Component({
    components: {
        'v-btn': VBtn,
        'v-icon': VIcon,
    },
})
export default class ImageUploader extends Vue {
    @Prop() public url: string = '';
    @Prop() public size: number = 200;
    @Prop() public letters: string = '';
    @Prop() public disabled: boolean = false;

    public urlInner: string = '';
    @Watch('url')
    public onUrlChange(val: string, oldVal: string): void {
        if (val !== oldVal) {
            this.urlInner = val;
        }
    }

    public get wrapperStyle(): Record<string, string> {
        if (this.url) {
            return {
                backgroundImage: `url(${this.url})`,
            };
        }
        return {
            backgroundColor: this.letters
                ? getElementColor(this.letters)
                : appStore.values.themeColors['azure-bg'],
            color: invertColor(getElementColor(this.letters || '?')),
        };
    }

    public get initials(): string {
        if (!this.letters) { return ''; }
        const initials = this.letters.split('@')[0];
        return initials.length === 1
            ? initials.toLocaleUpperCase()
            : `${initials[0].toLocaleUpperCase()}${initials[1].toLocaleLowerCase()}`;
    }

    public async setImage(): Promise<void> {
        if (this.urlInner) {
            this.urlInner = '';
            this.$emit('change', '');
        } else {
            this.urlInner = await openFileAndConvertToBase64(this.size);
            this.$emit('change', this.urlInner);
        }
    }
}
