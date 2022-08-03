import { shallowMount } from "@vue/test-utils";
import TdInput from "@/components/TdInput.vue";

describe("TdInput.vue", () => {
  it("renders props. isError, errorText, placeholder when passed", () => {
    const wrapper = shallowMount(TdInput, {
      propsData: {
        isError: true,
        errorText: "error text",
        placeholder: "Awesome!",
      },
    });
    const targetInput = wrapper.find("input");

    expect(targetInput.classes()).toContain("error");
    expect(wrapper.text()).toBe("error text");
    expect(targetInput.element.getAttribute("placeholder")).toBe("Awesome!");
    expect(wrapper.html()).toMatchSnapshot();
  });
});
