<template>
  <div class="list-page__container">
    <div class="header__wrapper">
      <div class="header__left">
        <img :src="companyLogo" alt="logo" @click="$router.push('/')" />
        <TdSearch
          @on-input="onChangeSearch($event)"
          @click="searchBtnClick"
          :value="searchValue"
        />
      </div>
      <div class="header__right">
        <TdButton @click="addNewRecord">Add new record</TdButton>
      </div>
    </div>
    <div class="list-page__body">
      <div class="list-page__body--left">
        <div class="list-search__box">
          <div
            class="list-search__item"
            v-for="(item, key) in paginationData"
            :key="key"
          >
            <div class="list-search__itemWrapper">
              <div class="list-search__left">
                <div class="list-search__left--logo">
                  <img :src="locationLogo" alt="location logo" />
                </div>
                <div class="list-search__left--info">
                  <div class="list-search__left--info-company">
                    {{ item[getList.cols.indexOf("Company")] }}
                  </div>
                  <div class="list-search__left--info-city">
                    {{ item[getList.cols.indexOf("Country")] }} ,
                    {{ item[getList.cols.indexOf("City")] }}
                  </div>
                </div>
              </div>
              <div class="list-search__right">
                <div class="list-search__right--name">
                  {{ item[getList.cols.indexOf("Name Surname")] }}
                </div>
                <div class="list-search__right--date">
                  {{ item[getList.cols.indexOf("Date")] }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="list-page__body--right">
        <select name="cars" id="cars" @change="changeSelectedFilter">
          <option v-for="item in filterList" :key="item.id" :value="item.value">
            {{ item.label }}
          </option>
        </select>
      </div>
    </div>
    <div class="list-page__footer">
      <TdPagination
        :total="totalPage"
        :currentPage="currentPage"
        @on-change-pagination="onChangePagination($event)"
      />
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { ascName, descName, ascDate, descDate } from "../utils/helpers";
import TdButton from "@/components/TdButton.vue";
import TdSearch from "@/components/TdSearch.vue";
import TdPagination from "../components/TdPagination.vue";
export default {
  name: "ListPage",
  data() {
    return {
      searchValue: "",
      searchData: [],
      filterList: [
        {
          id: 0,
          value: 0,
          label: "Name ascending",
        },
        {
          id: 1,
          value: 1,
          label: "Name descending",
        },
        {
          id: 2,
          value: 2,
          label: "Year ascending",
        },
        {
          id: 3,
          value: 3,
          label: "Year descending",
        },
      ],
      currentPage: 1,
      totalPage: 1,
      paginationData: [],
    };
  },
  components: { TdButton, TdSearch, TdPagination },
  computed: {
    ...mapGetters({
      getSearchInputValue: "search/getSearchInputValue",
      getList: "list/getList",
    }),
    companyLogo() {
      return require("../assets/images/header-logo.svg");
    },
    locationLogo() {
      return require("../assets/images/location-logo.svg");
    },
  },
  methods: {
    ...mapActions({
      setSearchInput: "search/setSearchInput",
    }),
    addNewRecord() {
      this.$router.push("/add-link");
    },
    searchBtnClick() {
      this.searchFiltered();
    },
    onChangeSearch(value) {
      this.searchValue = value;
    },
    searchFiltered() {
      this.searchData = this.getList.data.filter((element) => {
        const colsIndex = this.getList.cols.indexOf("Name Surname");
        return element[colsIndex]
          .toLowerCase()
          .match(this.searchValue.toLowerCase());
      });
      this.currentPage = 1;
      this.pagination(this.searchData, this.currentPage, 5);
      this.setSearchInput(this.searchValue);
    },
    changeSelectedFilter(e) {
      this.sortData(e.target.value);
    },
    sortData(value) {
      switch (value) {
        case "0":
          ascName(
            this.paginationData,
            this.getList.cols.indexOf("Name Surname")
          );
          break;
        case "1":
          descName(
            this.paginationData,
            this.getList.cols.indexOf("Name Surname")
          );
          break;
        case "2":
          ascDate(this.paginationData, this.getList.cols.indexOf("Date"));
          break;
        case "3":
          descDate(this.paginationData, this.getList.cols.indexOf("Date"));
          break;
        default:
          break;
      }
    },
    pagination(querySet, page = 1, rows = 5) {
      let trimStart = (page - 1) * rows;
      let trimEnd = trimStart + rows;
      let trimmedData = querySet.slice(trimStart, trimEnd);
      let pages = Math.ceil(querySet.length / rows);
      this.paginationData = trimmedData;
      this.totalPage = pages;
    },
    onChangePagination(pageNumber) {
      this.currentPage = pageNumber;
      this.pagination(this.searchData, pageNumber, 5);
    },
  },
  mounted() {
    this.searchValue = this.getSearchInputValue;
    this.searchFiltered();
  },
};
</script>
<style lang="scss" scoped>
.list-page {
  &__container {
    width: 100%;
    height: 100vh;
    position: relative;
  }
  &__body {
    width: 80%;
    margin: auto;
    display: flex;
    &--left {
      width: 80%;
      margin: 0px 10px;
    }
    &--right {
      width: 20%;
      margin: 0px 10px;
    }
  }
  &__footer {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    bottom: 20px;
  }
}
.header {
  &__wrapper {
    padding: 27px 37px 64px 37px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &__left {
    display: flex;
    align-items: center;
    column-gap: 35px;
    width: 80%;
    & > img {
      cursor: pointer;
    }
  }
  &__right {
    width: 20%;
    display: flex;
    justify-content: flex-end;
  }
}
.list-search {
  &__box {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  &__item {
    border-bottom: 1px solid #7e7e7e;
    padding: 12px 0px;
    &:last-child {
      border-bottom: unset;
    }
  }
  &__itemWrapper {
    background-color: #ffffff;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 12px;
    -webkit-transition: background-color 0.2s ease-in-out;
    -ms-transition: background-color 0.2s ease-in-out;
    transition: background-color 0.2s ease-in-out;
    &:hover {
      background-color: rgba(79, 117, 194, 0.21);
      cursor: pointer;
    }
  }
  &__left {
    display: flex;
    align-items: center;
    column-gap: 15px;
    width: 70%;
    &--info {
      display: flex;
      flex-direction: column;
      row-gap: 4px;
      &-company {
        font-weight: 400;
        font-size: 16px;
        line-height: 20px;
        color: #090a0a;
      }
      &-city {
        font-weight: 400;
        font-size: 14px;
        line-height: 16px;
        color: #72777a;
      }
    }
  }
  &__right {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    row-gap: 4px;
    width: 30%;
    &--name {
      font-weight: 400;
      font-size: 16px;
      line-height: 20px;
      color: #484848;
    }
    &--date {
      font-weight: 500;
      font-size: 16px;
      line-height: 16px;
      color: #484848;
    }
  }
}
</style>
