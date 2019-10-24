import { Component, Emit, Prop, Vue } from 'vue-property-decorator';
import ContactIcon from '@/common/components/ContactIcon.vue';

@Component({
    components: {
        'contact-icon': ContactIcon,
    },
})
export default class ContactListItem extends Vue {

}
