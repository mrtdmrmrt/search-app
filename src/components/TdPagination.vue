<template>
  <div class="td-pagination__wrapper">
    <ul class="td-pagination__list">
      <li class="td-pagination__list--prev" @click="prevPagination">
        Previous
      </li>
      <li
        class="td-pagination__list--item"
        v-for="(page, key) in total"
        :key="key"
        @click="changePagination(page)"
        :class="{ 'active-pagination': page == activePage }"
      >
        {{ page }}
      </li>
      <li class="td-pagination__list--next" @click="nextPagination">Next</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "TdPagination",
  data() {
    return {
      activePage: 1,
    };
  },
  props: {
    /**
     * data total count
     */
    total: {
      type: Number,
    },
    /**
     * current page
     */
    currentPage: {
      type: Number,
      default: 1,
    },
  },
  watch: {
    currentPage() {
      this.activePage = this.currentPage;
    },
  },
  methods: {
    /**
     * pagination on change
     * @param {number} page
     */
    changePagination(page) {
      this.$emit("on-change-pagination", page);
    },
    prevPagination() {
      if (this.activePage > 1) {
        this.changePagination(--this.activePage);
      }
    },
    nextPagination() {
      if (this.activePage < this.total) {
        this.changePagination(++this.activePage);
      }
    },
  },
  mounted() {
    this.activePage = this.currentPage > this.total ? 1 : this.currentPage;
  },
};
</script>

<style lang="scss">
.td-pagination {
  &__wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__list {
    list-style: none;
    display: flex;
    font-weight: 900;
    color: #000000;
    font-size: 20px;

    &--item {
      margin: 0 6px;
      cursor: pointer;
      padding: 6px 10px;
      &.active-pagination {
        background: #204080;
        border: 1px solid #ffffff;
        color: #ffffff;
      }
    }

    &--prev {
      cursor: pointer;
      margin-right: 10px;
      padding: 6px 10px;
    }

    &--next {
      cursor: pointer;
      margin-left: 10px;
      padding: 6px 10px;
    }
    & li {
      font-weight: 700;
      font-size: 14px;
      line-height: 16px;

      color: #484848;
      background: #ffffff;
      border: 1px solid #484848;
      border-radius: 4px;
    }
  }
}
</style>
