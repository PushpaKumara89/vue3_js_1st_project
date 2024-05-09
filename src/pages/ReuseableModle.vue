<template>
    <section class="d-flex flex-wrap w-100">
        <div class="m-auto">
            <h1 class="my-5">Re-useable Modal</h1>
            <ModalVue v-if="isRedModalOpen" @close="isRedModalOpen = false">
                <BaseLayout>
                    <template v-slot=title>
                        {{ title }}
                        Red Modal
                    </template>
                </BaseLayout>
            </ModalVue>
            <button @click="isRedModalOpen = true">Red Modal</button>
            <ModalVue v-if="isBlueModalOpen" @close="isBlueModalOpen = false"></ModalVue>
            <button @click="isBlueModalOpen = true">Blue Modal</button>
        </div>
    </section>
</template>

<script>
import { ref } from 'vue'
import ModalVue from "../components/ModalVue.vue"
export default {
    components: { ModalVue },
    setup() {
        const title ="fdf"
        const isRedModalOpen = ref(false)
        const isBlueModalOpen = ref(false)
        return { isRedModalOpen, isBlueModalOpen,title }
    }
}
</script>

<style></style>
