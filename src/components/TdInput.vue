<template>
  <div class="td-input__wrapper">
    <div class="td-input__label" :class="{ error: isError }">{{ label }}</div>
    <input
      class="td-input__input"
      type="text"
      :class="{ error: isError }"
      :value="currentValue"
      :placeholder="placeholder"
      @input="onInput"
    />
    <div class="td-input__errorText" v-if="errorText">
      {{ errorText }}
    </div>
  </div>
</template>

<script>
export default {
  name: "TdInput",
  data() {
    return {
      currentValue: "",
    };
  },
  props: {
    /**
     * input label
     */
    label: {
      type: String,
      default: "",
    },
    /**
     * input error text
     */
    errorText: {
      type: String,
      default: "",
    },
    /**
     * error boolean
     */
    isError: {
      type: Boolean,
      default: false,
    },
    /**
     * input placeholder
     */
    placeholder: {
      type: String,
      default: "",
    },
    /**
     * input value one data binding
     */
    value: {
      type: String,
      default: "",
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
     * input on change one data binding
     * @param {string} value
     */
    setCurrentValue(value) {
      this.currentValue = value;
      this.$emit("on-change", this.currentValue);
    },
  },
  mounted() {
    this.currentValue = this.value;
  },
};
</script>

<style lang="scss">
.td-input {
  &__wrapper {
    display: flex;
    flex-direction: column;
    row-gap: 8px;
  }
  &__label {
    font-weight: 700;
    font-size: 18px;
    line-height: 21px;
    color: #686868;
    &.error {
      color: rgba(255, 0, 0, 0.7);
    }
  }
  &__errorText {
    font-weight: 700;
    font-size: 18px;
    line-height: 21px;
    color: rgba(255, 0, 0, 0.5);
  }
  &__input {
    padding: 10px 16px;
    background: #ffffff;
    border: 1px solid #484848;
    border-radius: 8px;
    box-sizing: border-box;
    outline: none;
    -webkit-transition: all 0.2s ease-in-out;
    -ms-transition: all 0.2s ease-in-out;
    transition: all 0.2s ease-in-out;
    font-weight: 700;
    font-size: 18px;
    line-height: 21px;
    color: rgba(100, 100, 100, 0.5);

    &:hover {
      background: rgba(100, 100, 100, 0.08);
      border: 1px solid rgba(72, 72, 72, 0.6);
    }
    &.error {
      color: rgba(255, 0, 0, 0.5);
      border: 1.5px solid #ff0000;
      &::-webkit-input-placeholder {
        color: rgba(255, 0, 0, 0.5);
      }

      &:-ms-input-placeholder {
        color: rgba(255, 0, 0, 0.5);
      }

      &::placeholder {
        color: rgba(255, 0, 0, 0.5);
      }
    }
  }
}
</style>
