<template>
  <button class="td__button" @click="$emit('click')" :disabled="disabled">
    <slot />
  </button>
</template>

<script>
export default {
  name: "TdButton",
  /**
   * button disabled attribute
   */
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss">
.td__button {
  cursor: pointer;
  background-color: #204080;
  border-radius: 12px;
  font-weight: 700;
  font-size: 18px;
  line-height: 21px;
  color: #ffffff;
  padding: 8px 20px;
  outline: none;
  border: none;
  -webkit-transition: background-color 0.2s ease-in-out;
  -ms-transition: background-color 0.2s ease-in-out;
  transition: background-color 0.2s ease-in-out;
  &:hover {
    background-color: #4f75c2;
  }
  &:disabled {
    background-color: #e5e5e5;
    cursor: not-allowed;
  }
}
</style>
