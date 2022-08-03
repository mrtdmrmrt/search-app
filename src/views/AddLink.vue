<template>
  <div class="add-link__container">
    <div class="header__wrapper">
      <img :src="companyLogo" alt="logo" @click="$router.push('/')" />
      <router-link to="/list">
        <span>&lt;--</span> <span>Return to List Page</span>
      </router-link>
    </div>
    <div class="add-link__body">
      <div class="add-link__items">
        <TdInput
          placeholder="Enter name and surname"
          label="Name Surname"
          :value="links.nameSurname"
          @on-change="onChangeName($event)"
          :isError="
            !$v.links.nameSurname.required ||
            !$v.links.nameSurname.minLength ||
            !$v.links.nameSurname.maxLength
          "
          :errorText="
            !$v.links.nameSurname.required
              ? 'Zorunlu alan!'
              : !$v.links.nameSurname.minLength
              ? 'Minumum 4 karakter olmalıdır!'
              : !$v.links.nameSurname.maxLength
              ? 'Maximum 60 karakter olmalıdır!'
              : ''
          "
        />
      </div>
      <div class="add-link__items">
        <TdInput
          placeholder="Enter a company"
          label="Company"
          @on-change="onChangeCompany($event)"
          :value="links.company"
          :isError="
            !$v.links.company.required ||
            !$v.links.company.minLength ||
            !$v.links.company.maxLength
          "
          :errorText="
            !$v.links.company.required
              ? 'Zorunlu alan!'
              : !$v.links.company.minLength
              ? 'Minumum 2 karakter olmalıdır!'
              : !$v.links.company.maxLength
              ? 'Maximum 40 karakter olmalıdır!'
              : ''
          "
        />
      </div>
      <div class="add-link__items">
        <TdInput
          placeholder="Enter a country"
          label="Country"
          @on-change="onChangeCountry($event)"
          :value="links.country"
          :isError="
            !$v.links.country.required ||
            !$v.links.country.minLength ||
            !$v.links.country.maxLength
          "
          :errorText="
            !$v.links.country.required
              ? 'Zorunlu alan!'
              : !$v.links.country.minLength
              ? 'Minumum 2 karakter olmalıdır!'
              : !$v.links.country.maxLength
              ? 'Maximum 40 karakter olmalıdır!'
              : ''
          "
        />
      </div>
      <div class="add-link__items">
        <TdInput
          placeholder="Enter a city"
          label="City"
          @on-change="onChangeCity($event)"
          :value="links.city"
          :isError="
            !$v.links.city.required ||
            !$v.links.city.minLength ||
            !$v.links.city.maxLength
          "
          :errorText="
            !$v.links.city.required
              ? 'Zorunlu alan!'
              : !$v.links.city.minLength
              ? 'Minumum 2 karakter olmalıdır!'
              : !$v.links.city.maxLength
              ? 'Maximum 40 karakter olmalıdır!'
              : ''
          "
        />
      </div>
      <div class="add-link__items">
        <TdInput
          placeholder="Enter a e-mail (abc@xyz.com)"
          label="Email"
          @on-change="onChangeMail($event)"
          :isError="!$v.links.email.required || !$v.links.email.email"
          :value="links.email"
          :errorText="
            !$v.links.email.required
              ? 'Zorunlu alan!'
              : !$v.links.email.email
              ? 'Email formatında olmalıdır!'
              : ''
          "
        />
      </div>
      <div class="add-link__footer">
        <TdButton @click="add" :disabled="$v.$invalid">Add</TdButton>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import {
  required,
  minLength,
  maxLength,
  email,
} from "vuelidate/lib/validators";
import { newDateFormatter } from "../utils/helpers";
import TdInput from "../components/TdInput.vue";
import TdButton from "../components/TdButton.vue";
export default {
  name: "AddLink",
  data() {
    return {
      links: {
        nameSurname: "",
        company: "",
        country: "",
        city: "",
        email: "",
      },
    };
  },
  components: { TdInput, TdButton },
  validations: {
    links: {
      nameSurname: {
        required,
        minLength: minLength(4),
        maxLength: maxLength(60),
      },
      company: { required, minLength: minLength(2), maxLength: maxLength(40) },
      country: { required, minLength: minLength(2), maxLength: maxLength(40) },
      city: { required, minLength: minLength(2), maxLength: maxLength(40) },
      email: { required, email },
    },
  },
  computed: {
    ...mapGetters({
      getList: "list/getList",
    }),
    companyLogo() {
      return require("../assets/images/header-logo.svg");
    },
  },
  methods: {
    ...mapActions({
      setNewLink: "list/setNewLink",
    }),
    add() {
      if (this.$v.$invalid) {
        return;
      }
      let data = [];
      data[this.getList.cols.indexOf("Name Surname")] = this.links.nameSurname;
      data[this.getList.cols.indexOf("Company")] = this.links.company;
      data[this.getList.cols.indexOf("Country")] = this.links.country;
      data[this.getList.cols.indexOf("City")] = this.links.city;
      data[this.getList.cols.indexOf("Email")] = this.links.email;
      data[this.getList.cols.indexOf("Date")] = newDateFormatter(new Date());
      this.setNewLink(data);
      this.$toasted.success("Başarılı bir şekilde eklendi!", {
        position: "top-right",
        duration: 2000,
      });
      this.links.nameSurname = "";
      this.links.company = "";
      this.links.country = "";
      this.links.city = "";
      this.links.email = "";
    },
    onChangeName(value) {
      this.links.nameSurname = value;
    },
    onChangeCompany(value) {
      this.links.company = value;
    },
    onChangeCountry(value) {
      this.links.country = value;
    },
    onChangeCity(value) {
      this.links.city = value;
    },
    onChangeMail(value) {
      this.links.email = value;
    },
  },
};
</script>

<style lang="scss" scoped>
.add-link {
  &__container {
    width: 100%;
    height: 100%;
  }
  &__body {
    width: 60%;
    margin: auto;
    display: flex;
    flex-direction: column;
    row-gap: 37px;
  }
  &__items {
    width: 100%;
  }
  &__footer {
    display: flex;
    justify-content: flex-end;
  }
}
.header {
  &__wrapper {
    display: flex;
    align-items: center;
    column-gap: 40px;
    padding: 27px 37px 64px 37px;
    & > img {
      cursor: pointer;
    }
    & > a {
      font-weight: 700;
      font-size: 24px;
      line-height: 28px;
      color: #484848;
      text-decoration: none;
      & > span {
        margin-right: 10px;
      }
    }
  }
}
</style>
