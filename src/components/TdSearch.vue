<template>
  <div class="td-search__wrapper">
    <div class="td-search__logoInput">
      <img
        class="td-search__logoInput--logo"
        :src="searchLogo"
        alt="search logo"
      />
      <input
        class="td-search__logoInput--input"
        type="text"
        :value="value"
        @input="onInput"
      />
    </div>
    <TdButton
      class="td-search__button"
      @click="$emit('click')"
      :disabled="disabledBtn"
      >Search</TdButton
    >
  </div>
</template>

<script>
import TdButton from "./TdButton.vue";
export default {
  name: "TdSearch",
  data() {
    return {
      search: "",
    };
  },
  computed: {
    searchLogo() {
      return require("../assets/images/search-logo.svg");
    },
  },
  components: { TdButton },
  props: {
    /**
     * input value one data binding
     */
    value: {
      type: String,
      default: "",
    },
    /**
     * button disabled attribute
     */
    disabledBtn: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    value() {
      this.setCurrentValue(this.value);
    },
  },
  methods: {
    onInput(e) {
      this.setCurrentValue(e.target.value);
    },
    /**
     * input on change - one data binding
     * @param {string} value
     */
    setCurrentValue(value) {
      this.search = value;
      this.$emit("on-input", this.search);
    },
  },
  mounted() {
    this.search = this.value;
  },
};
</script>

<style lang="scss">
.td-search {
  &__wrapper {
    width: 100%;
    display: flex;
    align-items: center;
    column-gap: 12px;
  }
  &__logoInput {
    position: relative;
    width: 100%;
    &--logo {
      position: absolute;
      top: 30%;
      left: 10px;
    }
    &--input {
      width: 100%;
      box-sizing: border-box;
      padding: 16px 16px 16px 40px;
      background: #ffffff;
      border: 1px solid #000000;
      border-radius: 8px;
      font-weight: 400;
      font-size: 16px;
      line-height: 16px;
      color: #090a0a;
      &:focus {
        border: 1px solid #204080;
      }
    }
  }
}
</style>
