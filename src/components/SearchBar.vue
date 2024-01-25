<template>
    <v-text-field v-model="search" label="Search" @input="updateSearch" />
</template>

<script>
//import moment from 'moment';
export default {
    name: 'SearchBar',
    data() {
        return {
            search: ''
        };
    },
    methods: {
        updateSearch() {
            this.$emit('updateSearch', this.search);
        }
    }
}
</script>