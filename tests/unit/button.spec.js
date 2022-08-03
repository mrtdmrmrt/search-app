import { shallowMount } from "@vue/test-utils";
import TdButton from "@/components/TdButton.vue";

describe("TdButton.vue", () => {
  it("renders props.disabled when passed", () => {
    const disabled = true;
    const wrapper = shallowMount(TdButton, {
      propsData: { disabled },
    });
    expect(wrapper.props().disabled).toBe(true);
    expect(wrapper.html()).toMatchSnapshot();
  });
  it("renders slots when passed", () => {
    const wrapper = shallowMount(TdButton, {
      slots: {
        default: "<span>label</span>",
      },
    });
    expect(wrapper.text()).toBe("label");
    expect(wrapper.html()).toMatchSnapshot();
  });
});
