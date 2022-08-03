import { shallowMount } from "@vue/test-utils";
import TdPagination from "@/components/TdPagination.vue";

describe("TdPagination.vue", () => {
  it("renders props total, currentPage when passed", () => {
    const wrapper = shallowMount(TdPagination, {
      propsData: {
        total: 3,
        currentPage: 1,
      },
    });
    const target = wrapper.find(".active-pagination");

    expect(target.text()).toBe("1");
    expect(wrapper.html()).toMatchSnapshot();
  });
});
