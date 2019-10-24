import { Component, Vue } from 'vue-property-decorator';
import SERVICE_IDENTIFIER from '@/common/di/identifiers';
import container from '@/common/di/diConfig';

import App from '@/common/components/app/App.vue';

@Component<PersonalClientDesktop>({
    components: {
        app: App,
    },
    provide: {
        [SERVICE_IDENTIFIER.CONTAINER]: container,
    },
})
export default class PersonalClientDesktop extends Vue {}
