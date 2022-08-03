<template>
  <div class="home__container">
    <div class="header__wrapper">
      <TdButton @click="addNewRecord">Add new record</TdButton>
    </div>
    <div class="home__body">
      <div class="home__body--logo">
        <img :src="companyLogo" alt="company logo" />
      </div>
      <div class="search__wrapper">
        <div class="search__title">Find in records</div>
        <div class="search__box">
          <div class="search__box--header">
            <TdSearch
              @on-input="onChangeSearch($event)"
              @click="searchBtnClick"
              :value="searchValue"
              :disabledBtn="filteredSearch.length == 0"
            />
          </div>
          <div class="search__box--body">
            <div class="search-list__wrapper" v-if="onlyThreeData.length > 0">
              <div
                class="search-list__item"
                v-for="(item, key) in onlyThreeData"
                :key="key"
              >
                <div class="search-list__item--logo">
                  <img :src="locationLogo" alt="location logo" />
                </div>
                <div class="search-list__item--info">
                  <div class="search-list__item--info-title">
                    {{ item[list.cols.indexOf("Name Surname")] }}
                  </div>
                  <div class="search-list__item--info-subtitle">
                    {{ item[list.cols.indexOf("Company")] }},
                    {{ item[list.cols.indexOf("Country")] }},
                    {{ item[list.cols.indexOf("City")] }}
                  </div>
                </div>
              </div>
              <div
                class="search-list__footer"
                v-if="filteredSearch.length >= 3"
              >
                <div @click="searchBtnClick">Show more...</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import TdButton from "@/components/TdButton.vue";
import TdSearch from "@/components/TdSearch.vue";
import { mockData } from "../utils/constants/mockData";

export default {
  name: "Home",
  data() {
    return {
      list: mockData,
      searchValue: "",
    };
  },
  components: { TdButton, TdSearch },
  watch: {
    searchValue() {
      if (this.searchValue.length < 2) {
        this.filteredSearch = [];
        this.onlyThreeData = [];
      }
    },
  },
  computed: {
    ...mapGetters({
      getSearchInputValue: "search/getSearchInputValue",
      getList: "list/getList",
    }),
    filteredSearch: {
      get() {
        return this.searchValue.length >= 2
          ? this.getList.data.filter((element) => {
              const colsIndex = this.getList.cols.indexOf("Name Surname");
              return element[colsIndex]
                .toLowerCase()
                .match(this.searchValue.toLowerCase());
            })
          : [];
      },
      set(value) {
        return value;
      },
    },
    onlyThreeData: {
      get() {
        return this.filteredSearch.slice(0, 3);
      },
      set(value) {
        return value;
      },
    },
    companyLogo() {
      return require("../assets/images/main-logo.svg");
    },
    locationLogo() {
      return require("../assets/images/location-logo.svg");
    },
  },
  methods: {
    ...mapActions({
      setSearchInput: "search/setSearchInput",
      setList: "list/setList",
    }),
    addNewRecord() {
      this.$router.push("/add-link");
    },
    searchBtnClick() {
      this.setSearchInput(this.searchValue);
      this.$router.push("/list");
    },
    onChangeSearch(value) {
      this.searchValue = value;
    },
  },
  mounted() {
    this.setList(this.list);
    this.searchValue = this.getSearchInputValue;
  },
};
</script>

<style lang="scss" scoped>
.home {
  &__container {
    width: 100%;
    height: 100%;
  }
  &__body {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 80%;
    margin: auto;
  }
}
.search {
  &__wrapper {
    width: 100%;
  }
  &__title {
    font-weight: 700;
    font-size: 32px;
    line-height: 36px;
    color: #090a0a;
    margin-bottom: 25px;
  }
  &__box {
    position: relative;
    display: flex;
    flex-direction: column;
    row-gap: 16px;
    &--header {
      padding: 0px 20px;
    }
  }
}
.search-list {
  &__wrapper {
    position: absolute;
    width: 80%;
    max-height: 300px;
    overflow-y: scroll;
    background: #ffffff;
    border: 1px solid #484848;
    border-radius: 24px;
    padding: 16px 10px;
  }
  &__item {
    position: relative;
    display: flex;
    align-items: center;
    column-gap: 25px;
    padding: 12px 27px;
    &--info {
      display: flex;
      flex-direction: column;
      row-gap: 4px;
      font-weight: 400;
      &-title {
        font-size: 16px;
        line-height: 20px;
        color: #090a0a;
      }
      &-subtitle {
        font-size: 14px;
        line-height: 16px;
        color: #72777a;
      }
    }
    &:after {
      content: "";
      display: block;
      width: 80%;
      height: 2px;
      position: absolute;
      bottom: 0;
      left: 10%;
      background: #f2f4f5;
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
    }
    &:last-child {
      &:after {
        display: none;
      }
    }
  }
  &__footer {
    width: 100%;
    padding: 16px 0px 0px 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    & > div {
      cursor: pointer;
    }
  }
}
.header {
  &__wrapper {
    padding: 64px 62px 73px 62px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
}
</style>
